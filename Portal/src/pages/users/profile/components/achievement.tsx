import {
    apiAchievementAdd,
    apiAchievementDelete,
    apiAchievementList,
    apiAchievementUpdate,
    apiAchievementUploadEvidence,
} from "@/services/user";
import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    PictureOutlined,
    PlusOutlined,
    UploadOutlined,
    InboxOutlined,
} from "@ant-design/icons";
import {
    ActionType,
    ModalForm,
    ProForm,
    ProFormDatePicker,
    ProFormInstance,
    ProFormText,
    ProFormTextArea,
    ProTable,
} from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Modal, Popconfirm, Space, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const { Dragger } = Upload;

const AchievementTab: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [achievement, setAchievement] = useState<any>();
    const { initialState } = useModel("@@initialState");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            formRef.current?.setFields([
                { name: "id", value: achievement?.id ?? undefined },
                { name: "name", value: achievement?.name ?? undefined },
                {
                    name: "year",
                    value: achievement?.year ? dayjs(`${achievement.year}-01-01`) : null,
                },
                {
                    name: "evidence",
                    value: achievement?.evidenceUrl
                        ? [
                            {
                                uid: "-1",
                                name: achievement.evidenceUrl.split("/").pop(),
                                status: "done",
                                url: achievement.evidenceUrl,
                            },
                        ]
                        : [],
                },
            ]);
        }
    }, [open, achievement]);

    const onFinish = async (values: any) => {
        values.year = values.year ? Number(values.year) : null;
        let achievementId = values.id;
        if (values.id) {
            await apiAchievementUpdate(values);
        } else {
            const newAchievement = await apiAchievementAdd(values);
            achievementId = newAchievement?.id;
        }

        // upload minh chứng nếu có file mới
        if (values?.evidence && values.evidence.length > 0) {
            const newFiles = values.evidence.filter((f: any) => !!f.originFileObj);
            if (newFiles.length > 0) {
                const formData = new FormData();
                formData.append("AchievementId", achievementId);
                newFiles.forEach((file: any) =>
                    formData.append("File", file.originFileObj)
                );
                await apiAchievementUploadEvidence(formData);
            }
        }

        message.success("Thành công");
        formRef.current?.resetFields();
        setAchievement(null);
        actionRef.current?.reload();
        setOpen(false);
        return true;
    };

    const onDelete = async (id: string) => {
        await apiAchievementDelete(id);
        message.success("Thành công");
        actionRef.current?.reload();
    };

    return (
        <>
            <ProTable
                columns={[
                    { title: "#", valueType: "indexBorder", width: 30 },
                    { title: "Nội dung", dataIndex: "name" },
                    {
                        title: "Năm đạt",
                        dataIndex: "year",
                        width: 100,
                        search: false,
                    },
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
                                        onClick={() => setPreviewUrl(entity.evidenceUrl)}
                                    >
                                        Xem minh chứng
                                    </Button>
                                ) : (
                                    <span style={{ color: "#aaa" }}>Chưa có</span>
                                )}
                            </Space>
                        ),
                        search: false,
                        width: 250,
                    },
                    {
                        title: "Tác vụ",
                        valueType: "option",
                        render: (_, record) => [
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                size="small"
                                onClick={() => {
                                    setAchievement(record);
                                    setOpen(true);
                                }}
                                key="edit"
                            />,
                            <Popconfirm
                                key="delete"
                                title="Bạn có chắc chắn muốn xóa?"
                                onConfirm={() => onDelete(record.id)}
                            >
                                <Button
                                    danger
                                    type="primary"
                                    icon={<DeleteOutlined />}
                                    size="small"
                                />
                            </Popconfirm>,
                        ],
                        width: 60,
                    },
                ]}
                request={(params) =>
                    apiAchievementList({
                        ...params,
                        userName: initialState?.currentUser?.userName,
                    })
                }
                actionRef={actionRef}
                headerTitle={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setAchievement(null);
                            setOpen(true);
                            setTimeout(
                                () => formRef.current?.setFieldValue("evidence", []),
                                0
                            );
                        }}
                    >
                        Thêm mới
                    </Button>
                }
                search={{ layout: "vertical" }}
                rowKey="id"
            />

            {/* Modal thêm/sửa achievement */}
            <ModalForm
                title="Cài đặt"
                open={open}
                onOpenChange={(val) => {
                    setOpen(val);
                    if (!val) {
                        formRef.current?.resetFields();
                        setAchievement(null);
                    }
                }}
                formRef={formRef}
                onFinish={onFinish}
                width={500}
            >
                <ProFormText name="id" hidden />
                <ProFormTextArea
                    name="name"
                    label="Nội dung"
                    rules={[{ required: true }]}
                />
                <ProFormDatePicker.Year name="year" label="Thời gian đạt" width="xl" />

                {/* Minh chứng */}
                <div style={{ marginTop: 8 }}>
                    <label
                        style={{
                            display: "block",
                            marginBottom: 6,
                            color: "rgba(0,0,0,0.85)",
                        }}
                    >
                        Minh chứng
                    </label>
                    <div>
                        <ProForm.Item
                            name="evidence"
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
                                style={{ padding: 12 }}
                            >
                                <p>
                                    <InboxOutlined className="text-[20px] text-blue-500" />
                                </p>
                                <p className="text-gray-400 text-sm">
                                    Hỗ trợ 1 file ảnh / PDF
                                </p>
                            </Dragger>
                        </ProForm.Item>
                    </div>
                </div>
            </ModalForm>

            {/* Modal preview */}
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
                            cursor: "pointer",
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
                        style={{ width: "100%", height: "70vh", objectFit: "contain" }}
                    />
                )}
            </Modal>
        </>
    );
};

export default AchievementTab;
