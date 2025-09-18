import { apiEducationHistoryAdd, apiEducationHistoryDelete, apiEducationHistoryList, apiEducationHistoryUpdate, apiEducationHistoryUploadEvidence } from "@/services/user";
import { CloseOutlined, DeleteOutlined, EditOutlined, PictureOutlined, PlusOutlined, InboxOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProForm, ProFormDatePicker, ProFormInstance, ProFormText, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Modal, Popconfirm, Space, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const { Dragger } = Upload;

const EducationHistoryTab: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const [educationHistory, setEducationHistory] = useState<any>();
    const { initialState } = useModel('@@initialState');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Khi mở modal chỉnh sửa/ thêm: set giá trị, bao gồm cả evidence (nếu có)
    useEffect(() => {
        if (open) {
            formRef.current?.setFields([
                { name: 'id', value: educationHistory?.id },
                { name: 'degree', value: educationHistory?.degree },
                { name: 'institution', value: educationHistory?.institution },
                { name: 'major', value: educationHistory?.major },
                { name: 'graduationYear', value: educationHistory?.graduationYear ? dayjs(`${educationHistory.graduationYear}-01-01`) : null },
                {
                    name: 'evidence',
                    value: educationHistory?.evidenceUrl
                        ? [{
                            uid: '-1',
                            name: educationHistory?.evidenceUrl.split('/').pop(),
                            status: 'done',
                            url: educationHistory?.evidenceUrl,
                        }]
                        : []
                }
            ]);
        }
    }, [educationHistory, open]);

    const onFinish = async (values: any) => {
        let eduId = values.id;
        if (values.id) {
            await apiEducationHistoryUpdate(values);
        } else {
            const newEdu = await apiEducationHistoryAdd(values);
            eduId = newEdu?.id;
        }

        // Nếu có file mới (originFileObj tồn tại) thì upload
        if (values?.evidence && values.evidence.length > 0) {
            const filesToUpload = values.evidence.filter((f: any) => !!f.originFileObj);
            if (filesToUpload.length > 0) {
                const formData = new FormData();
                formData.append("EducationHistoryId", eduId);
                filesToUpload.forEach((file: any) => formData.append("File", file.originFileObj));
                await apiEducationHistoryUploadEvidence(formData);
            }
        }

        message.success('Thành công!');
        formRef.current?.resetFields();
        setEducationHistory(null);
        actionRef.current?.reload();
        setOpen(false);
        return true;
    }

    const onDelete = async (id: string) => {
        await apiEducationHistoryDelete(id);
        message.success('Thành công!');
        actionRef.current?.reload();
    }

    return (
        <>
            <ProTable
                request={(params) => apiEducationHistoryList({
                    ...params,
                    userName: initialState?.currentUser?.userName
                })}
                actionRef={actionRef}
                headerTitle={<Button icon={<PlusOutlined />} type="primary" onClick={() => { setEducationHistory(null); setOpen(true); }}>Thêm mới</Button>}
                search={false}
                ghost
                columns={[
                    { title: '#', valueType: 'indexBorder', width: 30 },
                    { title: 'Bậc đào tạo', dataIndex: 'degree' },
                    { title: 'Nơi đào tạo', dataIndex: 'institution' },
                    { title: 'Chuyên ngành', dataIndex: 'major' },
                    { title: 'Năm tốt nghiệp', dataIndex: 'graduationYear' },
                    {
                        title: 'Minh chứng',
                        dataIndex: 'evidence',
                        render: (_, entity) => (
                            <Space>
                                {entity.evidenceUrl ? (
                                    <Button type="dashed" icon={<PictureOutlined />} size="small" onClick={() => { setPreviewUrl(entity.evidenceUrl); }}>
                                        Xem minh chứng
                                    </Button>
                                ) : (<span style={{ color: "#aaa" }}>Chưa có</span>)}
                            </Space>
                        ),
                        search: false,
                        width: 250,
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button key="edit" size="small" type="primary" icon={<EditOutlined />} onClick={() => { setEducationHistory(record); setOpen(true); }} />,
                            <Popconfirm key="delete" title="Xác nhận xóa?" onConfirm={() => onDelete(record.id)} okText="Xóa" cancelText="Hủy">
                                <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
            />

            {/* ModalForm chính: thêm / sửa + minh chứng */}
            <ModalForm
                open={open}
                onOpenChange={(val) => {
                    setOpen(val);
                    if (!val) {
                        // khi đóng modal: reset form + clear state
                        formRef.current?.resetFields();
                        setEducationHistory(null);
                    }
                }}
                title="Cài đặt"
                onFinish={onFinish}
                formRef={formRef}
            >
                <ProFormText name="id" hidden />
                <ProFormText name="degree" label="Bậc đào tạo" />
                <ProFormText name="institution" label="Nơi đào tạo" />
                <div className="flex gap-4">
                    <div className="flex-1">
                        <ProFormText name="major" label="Chuyên ngành" />
                    </div>
                    <ProFormDatePicker.Year name="graduationYear" label="Năm tốt nghiệp" />
                </div>

                {/* Minh chứng - giống pattern ForeignLanguageProficiency */}
                <ProForm.Item
                    name="evidence"
                    label="Minh chứng"
                    valuePropName="fileList"
                    getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
                >
                    <Dragger
                        multiple={false}
                        maxCount={1}
                        accept=".jpg,.jpeg,.png,.gif,.pdf"
                        showUploadList={{ showRemoveIcon: false }}
                        beforeUpload={(file) => {
                            const isAllowed =
                                file.type === "image/png" ||
                                file.type === "image/jpeg" ||
                                file.type === "image/gif" ||
                                file.type === "application/pdf";
                            if (!isAllowed) {
                                message.error("Chỉ hỗ trợ ảnh (.png, .jpg, .gif) và PDF!");
                                return Upload.LIST_IGNORE;
                            }
                            // trả về false để antd không auto upload (chúng ta handle upload sau khi submit form)
                            return false;
                        }}
                        style={{ padding: 12 }}
                    >
                        <p>
                            <InboxOutlined className="text-[20px] text-blue-500" />
                        </p>
                        <p className="text-gray-400 text-sm">Hỗ trợ 1 file ảnh / PDF</p>
                    </Dragger>
                </ProForm.Item>
            </ModalForm>

            {/* Preview modal giữ nguyên */}
            <Modal open={!!previewUrl} onCancel={() => setPreviewUrl(null)} footer={null} width="60%" closeIcon={
                <CloseOutlined
                    style={{
                        color: "black", fontWeight: "bold", border: "1px solid black",
                        borderRadius: "50%", padding: "2px", backgroundColor: "white", cursor: "pointer"
                    }}
                />
            }>
                {previewUrl?.toLowerCase().endsWith(".pdf") ? (
                    <iframe src={previewUrl} style={{ width: "100%", height: "70vh", border: "none" }} />
                ) : (<img src={previewUrl!} alt="evidence" style={{ width: "100%", height: "70vh", objectFit: "contain" }} />)}
            </Modal>
        </>
    )
}

export default EducationHistoryTab;
