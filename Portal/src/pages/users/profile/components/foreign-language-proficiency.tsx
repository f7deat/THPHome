import {
    apiForeignLanguageProficiencyCreate,
    apiForeignLanguageProficiencyDelete,
    apiForeignLanguageProficiencyList,
    apiForeignLanguageProficiencyUpdate,
    apiForeignLanguageProficiencyUploadEvidence
} from "@/services/user";
import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    PictureOutlined,
    PlusOutlined,
    InboxOutlined
} from "@ant-design/icons";
import {
    ProTable,
    ModalForm,
    ProFormText,
    ProFormInstance,
    ActionType,
    ProForm
} from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Modal, Popconfirm, Space, Upload } from "antd";
import { useEffect, useRef, useState } from "react";

const { Dragger } = Upload;

const ForeignLanguageProficiency: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [language, setLanguage] = useState<any>();
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const { initialState } = useModel("@@initialState");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            formRef.current?.setFields([
                { name: "id", value: language?.id },
                { name: "language", value: language?.language },
                { name: "level", value: language?.level },
                { name: "certificate", value: language?.certificate },
                {
                    name: "evidence",
                    value: language?.evidenceUrl
                        ? [
                            {
                                uid: "-1",
                                name: language?.evidenceUrl.split("/").pop(),
                                status: "done",
                                url: language?.evidenceUrl
                            }
                        ]
                        : []
                }
            ]);
        }
    }, [open, language]);

    const onFinish = async (values: any) => {
        let langId = values.id;
        if (values.id) {
            await apiForeignLanguageProficiencyUpdate(values);
        } else {
            const newLang = await apiForeignLanguageProficiencyCreate(values);
            langId = newLang?.id;
        }

        // Upload minh chứng
        if (values?.evidence && values.evidence.length > 0) {
            const formData = new FormData();
            formData.append("ForeignLanguageId", langId);
            values.evidence.forEach((file: any) => {
                if (file.originFileObj) {
                    formData.append("File", file.originFileObj);
                }
            });
            await apiForeignLanguageProficiencyUploadEvidence(formData);
        }

        message.success("Thành công");
        actionRef.current?.reload();
        setOpen(false);
        setLanguage(null);
        formRef.current?.resetFields();
    };

    const onConfirm = async (id: string) => {
        await apiForeignLanguageProficiencyDelete(id);
        message.success("Thành công");
        actionRef.current?.reload();
    };

    return (
        <>
            <ProTable
                actionRef={actionRef}
                ghost
                request={(params) =>
                    apiForeignLanguageProficiencyList({
                        ...params,
                        userName: initialState?.currentUser.userName
                    })
                }
                headerTitle={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setOpen(true)}
                    >
                        Thêm mới
                    </Button>
                }
                columns={[
                    {
                        title: "#",
                        valueType: "indexBorder",
                        width: 30,
                        align: "center"
                    },
                    { title: "Ngoại ngữ", dataIndex: "language" },
                    { title: "Trình độ", dataIndex: "level" },
                    { title: "Chứng chỉ", dataIndex: "certificate" },
                    {
                        title: "Minh chứng",
                        dataIndex: "evidence",
                        render: (_, entity) => (
                            <Space>
                                {entity.evidenceUrl ? (
                                    <Button
                                        type="dashed"
                                        icon={<PictureOutlined />}
                                        size="small"
                                        onClick={() =>
                                            setPreviewUrl(entity.evidenceUrl)
                                        }
                                    >
                                        Xem minh chứng
                                    </Button>
                                ) : (
                                    <span style={{ color: "#aaa" }}>
                                        Chưa có
                                    </span>
                                )}
                            </Space>
                        ),
                        search: false,
                        width: 200
                    },
                    {
                        title: "Tác vụ",
                        valueType: "option",
                        render: (_, entity) => [
                            <Button
                                type="primary"
                                key="edit"
                                onClick={() => {
                                    setLanguage(entity);
                                    setOpen(true);
                                }}
                                icon={<EditOutlined />}
                                size="small"
                            />,
                            <Popconfirm
                                title="Bạn có chắc chắn muốn xóa?"
                                okText="Có"
                                cancelText="Không"
                                key="delete"
                                onConfirm={() => onConfirm(entity.id)}
                            >
                                <Button
                                    danger
                                    size="small"
                                    type="primary"
                                    icon={<DeleteOutlined />}
                                />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                search={false}
            />

            {/* Form thêm/sửa + minh chứng */}
            <ModalForm
                title="Cài đặt"
                open={open}
                onOpenChange={setOpen}
                formRef={formRef}
                onFinish={onFinish}
            >
                <ProFormText name="id" hidden />
                <ProFormText name="language" label="Ngoại ngữ" />
                <ProFormText name="level" label="Trình độ" />
                <ProFormText name="certificate" label="Chứng chỉ" />

                <ProForm.Item
                    name="evidence"
                    label="Minh chứng"
                    valuePropName="fileList"
                    getValueFromEvent={(e: any) =>
                        Array.isArray(e) ? e : e?.fileList
                    }
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
                                message.error(
                                    "Chỉ hỗ trợ ảnh (.png, .jpg, .gif) và PDF!"
                                );
                                return Upload.LIST_IGNORE;
                            }
                            return false;
                        }}
                    >
                        <p>
                            <InboxOutlined className="text-[20px] text-blue-500" />
                        </p>
                        <p className="text-gray-400 text-sm">
                            Hỗ trợ 1 file ảnh / PDF
                        </p>
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
                            color: "black",
                            fontWeight: "bold",
                            border: "1px solid black",
                            borderRadius: "50%",
                            padding: "2px",
                            backgroundColor: "white",
                            cursor: "pointer"
                        }}
                    />
                }
            >
                {previewUrl?.toLowerCase().endsWith(".pdf") ? (
                    <iframe
                        src={previewUrl}
                        style={{ width: "100%", height: "70vh", border: "none" }}
                    />
                ) : (
                    <img
                        src={previewUrl!}
                        alt="evidence"
                        style={{ width: "100%", height: "70vh" }}
                    />
                )}
            </Modal>
        </>
    );
};

export default ForeignLanguageProficiency;
