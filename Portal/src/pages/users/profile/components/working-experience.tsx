import { apiWorkingExperienceAdd, apiWorkingExperienceDelete, apiWorkingExperienceList, apiWorkingExperienceUpdate, apiWorkingExperienceUploadEvidence } from "@/services/user";
import { CloseOutlined, DeleteOutlined, EditOutlined, PictureOutlined, PlusOutlined, InboxOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProForm, ProFormDatePicker, ProFormInstance, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, Col, message, Modal, Popconfirm, Row, Space, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const { Dragger } = Upload;

const WorkingExperienceTab: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [workingExperience, setWorkingExperience] = useState<any>();
    const { initialState } = useModel('@@initialState');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            formRef.current?.setFields([
                { name: 'id', value: workingExperience?.id },
                { name: 'companyName', value: workingExperience?.companyName },
                { name: 'startDate', value: workingExperience?.startDate ? dayjs(workingExperience?.startDate) : null },
                { name: 'endDate', value: workingExperience?.endDate ? dayjs(workingExperience?.endDate) : null },
                { name: 'position', value: workingExperience?.position },
                { name: 'description', value: workingExperience?.description },
                {
                    name: 'evidence',
                    value: workingExperience?.evidenceUrl
                        ? [{
                            uid: '-1',
                            name: workingExperience?.evidenceUrl.split('/').pop(),
                            status: 'done',
                            url: workingExperience?.evidenceUrl,
                        }]
                        : [],
                },
            ]);
        }
    }, [open, workingExperience]);

    const onFinish = async (values: any) => {
        let expId = values.id;
        if (values.id) {
            await apiWorkingExperienceUpdate(values);
        } else {
            const newExp = await apiWorkingExperienceAdd(values);
            expId = newExp?.id;
        }

        // upload minh chứng
        if (values?.evidence && values.evidence.length > 0) {
            const formData = new FormData();
            formData.append("WorkingExperienceId", expId);
            values.evidence.forEach((file: any) => {
                if (file.originFileObj) {
                    formData.append("File", file.originFileObj);
                }
            });
            await apiWorkingExperienceUploadEvidence(formData);
        }

        message.success('Thành công');
        setOpen(false);
        formRef.current?.resetFields();
        setWorkingExperience(null);
        actionRef.current?.reload();
        return true;
    };

    const onDelete = async (id: string) => {
        await apiWorkingExperienceDelete(id);
        actionRef.current?.reload();
        message.success('Thành công');
    };

    return (
        <>
            <ProTable
                columns={[
                    { title: '#', valueType: 'indexBorder', width: 30 },
                    { title: "Đơn vị công tác", dataIndex: "companyName" },
                    { title: 'Thời gian bắt đầu', dataIndex: 'startDate', valueType: 'date' },
                    { title: 'Thời gian kết thúc', dataIndex: 'endDate', valueType: 'date' },
                    { title: 'Chức danh', dataIndex: 'position' },
                    {
                        title: 'Minh chứng',
                        dataIndex: 'evidence',
                        render: (_, entity) => (
                            <Space>
                                {entity.evidenceUrl ? (
                                    <Button type="dashed" icon={<PictureOutlined />} size="small"
                                        onClick={() => { setPreviewUrl(entity.evidenceUrl); }}>
                                        Xem minh chứng
                                    </Button>
                                ) : (<span style={{ color: "#aaa" }}>Chưa có</span>)}
                            </Space>
                        ),
                        search: false,
                        width: 200,
                    },
                    { title: 'Mô tả', dataIndex: 'description' },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                size="small"
                                onClick={() => { setWorkingExperience(record); setOpen(true); }}
                                key="edit"
                            />,
                            <Popconfirm key="delete" title="Bạn có chắc chắn muốn xóa?" onConfirm={() => onDelete(record.id)}>
                                <Button danger type="primary" icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                request={(params) => apiWorkingExperienceList({
                    ...params,
                    userName: initialState?.currentUser?.userName
                })}
                actionRef={actionRef}
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Thêm mới</Button>}
                search={false}
                rowKey="id"
                ghost
            />

            <ModalForm
                title="Cài đặt kinh nghiệm làm việc"
                open={open}
                onOpenChange={setOpen}
                formRef={formRef}
                onFinish={onFinish}
            >
                <ProFormText name="id" hidden />
                <ProFormText name="companyName" label="Đơn vị công tác" rules={[{ required: true }]} />
                <div className="md:flex gap-4">
                    <div className="flex-1">
                        <ProFormText name="position" label="Chức danh" />
                    </div>
                    <ProFormDatePicker name="startDate" label="Thời gian bắt đầu" />
                    <ProFormDatePicker name="endDate" label="Thời gian kết thúc" />
                </div>
                <ProFormTextArea name="description" label="Mô tả" />

                {/* Minh chứng */}
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
                                file.type === 'image/png' ||
                                file.type === 'image/jpeg' ||
                                file.type === 'image/gif' ||
                                file.type === 'application/pdf';
                            if (!isAllowed) {
                                message.error('Chỉ hỗ trợ ảnh (.png, .jpg, .gif) và PDF!');
                                return Upload.LIST_IGNORE;
                            }
                            return false;
                        }}
                    >
                        <p><InboxOutlined className="text-[20px] text-blue-500" /></p>
                        <p className="text-gray-400 text-sm">Hỗ trợ 1 file ảnh / PDF</p>
                    </Dragger>
                </ProForm.Item>
            </ModalForm>

            {/* Preview modal */}
            <Modal
                open={!!previewUrl}
                onCancel={() => setPreviewUrl(null)}
                footer={null}
                width="60%"
                closeIcon={
                    <CloseOutlined
                        style={{
                            color: "black", fontWeight: "bold", border: "1px solid black",
                            borderRadius: "50%", padding: "2px", backgroundColor: "white", cursor: "pointer"
                        }}
                    />
                }
            >
                {previewUrl?.toLowerCase().endsWith(".pdf") ? (
                    <iframe src={previewUrl} style={{ width: "100%", height: "70vh", border: "none" }} />
                ) : (
                    <img src={previewUrl!} alt="evidence" style={{ width: "100%", height: "70vh" }} />
                )}
            </Modal>
        </>
    );
};

export default WorkingExperienceTab;
