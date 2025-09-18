import { apiEducationHistoryAdd, apiEducationHistoryDelete, apiEducationHistoryList, apiEducationHistoryUpdate, apiEducationHistoryUploadEvidence } from "@/services/user";
import { CloseOutlined, DeleteOutlined, EditOutlined, PictureOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormDatePicker, ProFormInstance, ProFormText, ProFormUploadDragger, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Modal, Popconfirm, Space, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const EducationHistoryTab: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const [educationHistory, setEducationHistory] = useState<any>();
    const { initialState } = useModel('@@initialState');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [openEvidence, setOpenEvidence] = useState<boolean>(false);
    const evidenceFormRef = useRef<ProFormInstance>();
    useEffect(() => {
        formRef.current?.setFields([
            {
                name: 'id',
                value: educationHistory?.id
            },
            {
                name: 'degree',
                value: educationHistory?.degree
            },
            {
                name: 'institution',
                value: educationHistory?.institution
            },
            {
                name: 'major',
                value: educationHistory?.major
            },
            {
                name: 'graduationYear',
                value: educationHistory?.graduationYear ? dayjs(`${educationHistory.graduationYear}-01-01`) : null
            }
        ])
    }, [educationHistory, open])

    const onFinish = async (values: any) => {
        if (values.id) {
            await apiEducationHistoryUpdate(values);
        } else {
            await apiEducationHistoryAdd(values);
        }
        message.success('Thành công!');
        formRef.current?.resetFields();
        setEducationHistory(null);
        actionRef.current?.reload();
        setOpen(false);
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
                headerTitle={<Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>Thêm mới</Button>}
                search={false}
                ghost
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: 'Bậc đào tạo',
                        dataIndex: 'degree'
                    },
                    {
                        title: 'Nơi đào tạo',
                        dataIndex: 'institution'
                    },
                    {
                        title: 'Chuyên ngành',
                        dataIndex: 'major'
                    },
                    {
                        title: 'Năm tốt nghiệp',
                        dataIndex: 'graduationYear'
                    },
                    {
                        title: 'Minh chứng',
                        dataIndex: 'evidence',
                        render: (_, entity) => (
                            <Space> {entity.evidenceUrl ? (
                                <Button type="dashed" icon={<PictureOutlined />} size="small"
                                    onClick={() => { setPreviewUrl(entity.evidenceUrl); }}>
                                    Xem minh chứng
                                </Button>
                            ) : (<span style={{ color: "#aaa" }}>Chưa có</span>)}
                                <Button
                                    size="small"
                                    type="dashed"
                                    icon={<UploadOutlined />}
                                    onClick={() => {
                                        setEducationHistory(entity);
                                        setOpenEvidence(true);
                                        // reset danh sách file trước khi mở
                                        setTimeout(() => {
                                            evidenceFormRef.current?.setFieldValue("evidence", []);
                                        }, 0);
                                    }}
                                >
                                </Button>
                            </Space>
                        ),
                        search: false,
                        width: 250,
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button key="edit" size="small" type="primary" icon={<EditOutlined />} onClick={() => {
                                setEducationHistory(record);
                                setOpen(true);
                            }} />,
                            <Popconfirm key="delete" title="Xác nhận xóa?" onConfirm={() => onDelete(record.id)} okText="Xóa" cancelText="Hủy">
                                <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
            />
            <ModalForm open={open} onOpenChange={setOpen} title="Cài đặt" onFinish={onFinish} formRef={formRef}>
                <ProFormText name="id" hidden />
                <ProFormText name="degree" label="Bậc đào tạo" />
                <ProFormText name="institution" label="Nơi đào tạo" />
                <div className="flex gap-4">
                    <div className="flex-1">
                        <ProFormText name="major" label="Chuyên ngành" />
                    </div>
                    <ProFormDatePicker.Year name="graduationYear" label="Năm tốt nghiệp" />
                </div>
            </ModalForm>
            <ModalForm
                formRef={evidenceFormRef}
                open={openEvidence}
                onOpenChange={setOpenEvidence}
                title="Minh chứng"
                onFinish={async (values) => {
                    if (!values?.evidence || values.evidence.length === 0) {
                        message.error("Vui lòng chọn file");
                        return false;
                    }
                    const formData = new FormData();
                    formData.append("EducationHistoryId", educationHistory?.id);
                    values.evidence.forEach((file: any) => {
                        formData.append("File", file.originFileObj);
                    });
                    await apiEducationHistoryUploadEvidence(formData);
                    message.success("Tải minh chứng thành công");
                    actionRef.current?.reload();
                    return true;
                }}
            >
                <ProFormUploadDragger
                    name="evidence"
                    title="Tải lên minh chứng"
                    description="Chỉ hỗ trợ ảnh và PDF"
                    fieldProps={{
                        multiple: true,
                        accept: ".jpg,.jpeg,.png,.gif,.pdf",
                        beforeUpload: (file) => {
                            const isAllowed =
                                file.type === "image/png" ||
                                file.type === "image/jpeg" ||
                                file.type === "image/gif" ||
                                file.type === "application/pdf";

                            if (!isAllowed) {
                                message.error("Chỉ hỗ trợ ảnh (.png, .jpg, .gif) và PDF!");
                                return Upload.LIST_IGNORE;
                            }
                            return false;
                        },
                    }}
                />
            </ModalForm>
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
                ) : (<img src={previewUrl!} alt="evidence" style={{ width: "100%", height: "70vh" }} />)}
            </Modal>
        </>
    )
}

export default EducationHistoryTab;