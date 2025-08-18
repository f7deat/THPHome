import { apiAchievementAdd, apiAchievementDelete, apiAchievementList, apiAchievementUpdate, apiAchievementUploadEvidence } from "@/services/user";
import { CloseOutlined, DeleteOutlined, EditOutlined, PictureOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormDatePicker, ProFormInstance, ProFormText, ProFormTextArea, ProFormUploadDragger, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Modal, Popconfirm, Space, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const AchievementTab: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [achievement, setAchievement] = useState<any>();
    const { initialState } = useModel('@@initialState');
    const [openEvidence, setOpenEvidence] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const evidenceFormRef = useRef<ProFormInstance>();
    useEffect(() => {
        if (open) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: achievement?.id
                },
                {
                    name: 'name',
                    value: achievement?.name
                },
                {
                    name: 'year',
                    value: achievement?.year ? dayjs(`${achievement?.year}-01-01`) : null
                }
            ]);
        }
    }, [open, achievement]);

    const onFinish = async (values: any) => {
        values.year = values.year ? Number(values.year) : null;
        if (values.id) {
            await apiAchievementUpdate(values);
        } else {
            await apiAchievementAdd(values);
        }
        setOpen(false);
        formRef.current?.resetFields();
        actionRef.current?.reload();
        setAchievement(null);
        message.success('Thành công');
    }

    const onDelete = async (id: string) => {
        await apiAchievementDelete(id);
        actionRef.current?.reload();
        message.success('Thành công');
    }
    console.log(previewUrl);
    return (
        <>
            <ProTable
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: "Nội dung",
                        dataIndex: "name"
                    },
                    {
                        title: 'Năm đạt',
                        dataIndex: 'year',
                        width: 100,
                        search: false
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
                                        setAchievement(entity);
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
                            <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => {
                                setAchievement(record);
                                setOpen(true);
                            }} key="edit" />,
                            <Popconfirm key="delete" title="Bạn có chắc chắn muốn xóa?" onConfirm={() => onDelete(record.id)}>
                                <Button danger type="primary" icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                request={(params) => apiAchievementList({
                    ...params,
                    userName: initialState?.currentUser?.userName
                })}
                actionRef={actionRef}
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Thêm mới</Button>}
                search={{
                    layout: 'vertical'
                }}
                rowKey="id"
            />
            <ModalForm title="Cài đặt" open={open} onOpenChange={setOpen} formRef={formRef} onFinish={onFinish} width={500}>
                <ProFormText name="id" hidden />
                <ProFormTextArea name="name" label="Nội dung" rules={[
                    {
                        required: true
                    }
                ]} />
                <ProFormDatePicker.Year name="year" label="Thời gian đạt" width="xl" />
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
                    formData.append("AchievementId", achievement?.id);
                    values.evidence.forEach((file: any) => {
                        formData.append("File", file.originFileObj);
                    });
                    await apiAchievementUploadEvidence(formData);
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

export default AchievementTab;