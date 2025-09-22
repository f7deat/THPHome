import { apiAwardAdd, apiAwardDelete, apiAwardList, apiAwardUpdate, apiAwardUploadEvidence } from "@/services/user";
import { CloseOutlined, DeleteOutlined, EditOutlined, PictureOutlined, PlusOutlined, UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProForm, ProFormDatePicker, ProFormInstance, ProFormText, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Modal, Popconfirm, Space, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const { Dragger } = Upload;

const AwardTab: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [award, setAward] = useState<any>();
    const { initialState } = useModel('@@initialState');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Khi mở modal: set field (bao gồm evidence nếu có)
    useEffect(() => {
        if (open) {
            formRef.current?.setFields([
                { name: 'id', value: award?.id ?? undefined },
                { name: 'name', value: award?.name ?? undefined },
                { name: 'year', value: award?.year ? dayjs(`${award.year}-01-01`) : null },
                {
                    name: 'evidence',
                    value: award?.evidenceUrl
                        ? [{
                            uid: '-1',
                            name: award.evidenceUrl.split('/').pop(),
                            status: 'done',
                            url: award.evidenceUrl,
                        }]
                        : [],
                },
            ]);
        }
    }, [open, award]);

    const onFinish = async (values: any) => {
        values.year = values.year ? Number(values.year) : null;
        let awardId = values.id;
        if (values.id) {
            await apiAwardUpdate(values);
        } else {
            const newAward = await apiAwardAdd(values);
            awardId = newAward?.id;
        }

        // upload minh chứng nếu có file mới (originFileObj tồn tại)
        if (values?.evidence && values.evidence.length > 0) {
            const newFiles = values.evidence.filter((f: any) => !!f.originFileObj);
            if (newFiles.length > 0) {
                const formData = new FormData();
                formData.append("Id", awardId);
                newFiles.forEach((file: any) => formData.append("File", file.originFileObj));
                await apiAwardUploadEvidence(formData);
            }
        }

        message.success('Thành công');
        formRef.current?.resetFields();
        setAward(null);
        actionRef.current?.reload();
        setOpen(false);
        return true;
    };

    const onDelete = async (id: string) => {
        await apiAwardDelete(id);
        message.success('Thành công');
        actionRef.current?.reload();
    };

    return (
        <>
            <ProTable
                columns={[
                    { title: '#', valueType: 'indexBorder', width: 30 },
                    { title: "Hình thức và nội dung giải thưởng", dataIndex: "name" },
                    { title: 'Năm', dataIndex: 'year', width: 100 },
                    {
                        title: 'Minh chứng',
                        dataIndex: 'evidence',
                        render: (_, entity) => (
                            <Space>
                                {entity.evidenceUrl ? (
                                    <Button type="dashed" icon={<PictureOutlined />} size="small" onClick={() => setPreviewUrl(entity.evidenceUrl)}>
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
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                size="small"
                                onClick={() => { setAward(record); setOpen(true); }}
                                key="edit"
                            />,
                            <Popconfirm key="delete" title="Bạn có chắc chắn muốn xóa?" onConfirm={() => onDelete(record.id)}>
                                <Button danger type="primary" icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                request={(params) => apiAwardList({
                    ...params,
                    userName: initialState?.currentUser?.userName
                })}
                actionRef={actionRef}
                headerTitle={
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => { setAward(null); setOpen(true); setTimeout(() => formRef.current?.setFieldValue('evidence', []), 0); }}>
                        Thêm mới
                    </Button>
                }
                search={false}
                rowKey="id"
                ghost
            />

            {/* Modal thêm/sửa (gộp cả upload minh chứng) */}
            <ModalForm
                title="Cài đặt"
                open={open}
                onOpenChange={(val) => {
                    setOpen(val);
                    if (!val) {
                        // khi đóng modal: reset form + clear state
                        formRef.current?.resetFields();
                        setAward(null);
                    }
                }}
                formRef={formRef}
                onFinish={onFinish}
            >
                <ProFormText name="id" hidden />
                <div className="flex gap-4">
                    <div className="flex-1">
                        <ProFormText name="name" label="Hình thức và nội dung giải thưởng" rules={[{ required: true }]} />
                    </div>
                    <ProFormDatePicker.Year name="year" label="Năm" />
                </div>

                {/* Minh chứng (1 file) */}
                <div style={{ marginTop: 8 }}>
                    <label style={{ display: 'block', marginBottom: 6, color: 'rgba(0,0,0,0.85)' }}>Minh chứng</label>
                    <div>
                        <ProForm.Item
                            name="evidence"
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
                                    return false; // để antd không tự upload
                                }}
                                style={{ padding: 12 }}
                            >
                                <p><InboxOutlined className="text-[20px] text-blue-500" /></p>
                                <p className="text-gray-400 text-sm">Hỗ trợ 1 file ảnh / PDF</p>
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
                            color: "black", fontWeight: "bold", border: "1px solid black",
                            borderRadius: "50%", padding: "2px", backgroundColor: "white", cursor: "pointer"
                        }}
                    />
                }
            >
                {previewUrl?.toLowerCase().endsWith(".pdf") ? (
                    <iframe src={previewUrl} style={{ width: "100%", height: "70vh", border: "none" }} />
                ) : (
                    <img src={previewUrl!} alt="evidence" style={{ width: "100%", height: "70vh", objectFit: "contain" }} />
                )}
            </Modal>
        </>
    );
};

export default AwardTab;
