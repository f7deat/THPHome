import { apiForeignLanguageProficiencyCreate, apiForeignLanguageProficiencyDelete, apiForeignLanguageProficiencyList, apiForeignLanguageProficiencyUpdate, apiForeignLanguageProficiencyUploadEvidence } from "@/services/user";
import { CloseOutlined, DeleteOutlined, EditOutlined, PictureOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { ProTable, ModalForm, ProFormText, ProFormInstance, ActionType, ProFormUploadDragger } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Modal, Popconfirm, Space, Upload } from "antd";
import { useEffect, useRef, useState } from "react";

const ForeignLanguageProficiency: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [language, setLanguage] = useState<any>();
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const { initialState } = useModel('@@initialState');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [openEvidence, setOpenEvidence] = useState<boolean>(false);
    const evidenceFormRef = useRef<ProFormInstance>();
    useEffect(() => {
        if (open) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: language?.id
                },
                {
                    name: 'language',
                    value: language?.language
                },
                {
                    name: 'level',
                    value: language?.level
                },
                {
                    name: 'certificate',
                    value: language?.certificate
                }
            ])
        }
    }, [open]);

    const onFinish = async (values: any) => {
        if (values.id) {
            await apiForeignLanguageProficiencyUpdate(values);
        } else {
            await apiForeignLanguageProficiencyCreate(values);
        }
        message.success('Thành công');
        actionRef.current?.reload();
        setOpen(false);
        setLanguage(null);
        formRef.current?.resetFields();
    }

    const onConfirm = async (id: string) => {
        await apiForeignLanguageProficiencyDelete(id);
        message.success('Thành công');
        actionRef.current?.reload();
    }
    console.log("Language",language);
    return (
        <>
            <ProTable
                actionRef={actionRef}
                ghost
                request={(params) => apiForeignLanguageProficiencyList({
                    ...params,
                    userName: initialState?.currentUser.userName
                })}
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Thêm mới</Button>}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30,
                        align: 'center'
                    },
                    {
                        title: 'Ngoại ngữ',
                        dataIndex: 'language'
                    },
                    {
                        title: 'Trình độ',
                        dataIndex: 'level'
                    },
                    {
                        title: 'Chứng chỉ',
                        dataIndex: 'certificate'
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
                                        setLanguage(entity);
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
                        render: (_, entity) => [
                            <Button type="primary" key="edit" onClick={() => {
                                setLanguage(entity);
                                setOpen(true);
                            }} icon={<EditOutlined />} size="small" />,
                            <Popconfirm title="Bạn có chắc chắn muốn xóa?" okText="Có" cancelText="Không" key="delete" onConfirm={() => onConfirm(entity.id)}>
                                <Button danger size="small" type="primary" icon={<DeleteOutlined />}></Button>
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                search={false}
            />
            <ModalForm title="Cài đặt" open={open} onOpenChange={setOpen} formRef={formRef} onFinish={onFinish}>
                <ProFormText name="id" label="ID" hidden />
                <ProFormText name="language" label="Ngoại ngữ" />
                <ProFormText name="level" label="Trình độ" />
                <ProFormText name="certificate" label="Chứng chỉ" />
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
                    formData.append("ForeignLanguageId", language?.id);
                    values.evidence.forEach((file: any) => {
                        formData.append("File", file.originFileObj);
                    });
                    await apiForeignLanguageProficiencyUploadEvidence(formData);
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

export default ForeignLanguageProficiency;