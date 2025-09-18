import { apiJournalAdd, apiJournalDelete, apiJournalList, apiJournalUpdate, apiJournalUploadEvidence } from "@/services/user";
import { CloseOutlined, DeleteOutlined, EditOutlined, PictureOutlined, PlusOutlined, InboxOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormDatePicker, ProFormInstance, ProFormText, ProFormTextArea, ProForm, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Modal, Popconfirm, Upload, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const { Dragger } = Upload;

const JournalTab: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [journal, setJournal] = useState<any>();
    const { initialState } = useModel('@@initialState');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        formRef.current?.setFields([
            { name: 'id', value: journal?.id },
            { name: 'name', value: journal?.name },
            { name: 'publishYear', value: journal?.publishYear ? dayjs(`${journal?.publishYear}-01-01`) : null },
            { name: 'volume', value: journal?.volume },
            { name: 'issue', value: journal?.issue },
            { name: 'page', value: journal?.page },
            { name: 'issn', value: journal?.issn },
            { name: 'authors', value: journal?.authors },
            {
                name: 'evidence',
                value: journal?.evidenceUrl
                    ? [{
                        uid: '-1',
                        name: journal?.evidenceUrl.split('/').pop(),
                        status: 'done',
                        url: journal?.evidenceUrl,
                    }]
                    : [],
            },
        ]);
    }, [journal, open]);

    const onFinish = async (values: any) => {
        let journalId = values.id;
        if (values.id) {
            await apiJournalUpdate(values);
        } else {
            const newJournal = await apiJournalAdd(values);
            journalId = newJournal?.id;
        }

        if (values?.evidence && values.evidence.length > 0) {
            const formData = new FormData();
            formData.append("JournalId", journalId);
            values.evidence.forEach((file: any) => {
                if (file.originFileObj) {
                    formData.append("File", file.originFileObj);
                }
            });
            await apiJournalUploadEvidence(formData);
        }

        message.success("Thành công!");
        formRef.current?.resetFields();
        setJournal(null);
        actionRef.current?.reload();
        return true;
    };

    const onDelete = async (id: string) => {
        await apiJournalDelete(id);
        actionRef.current?.reload();
        message.success("Thành công");
    };

    return (
        <>
            <ProTable
                columns={[
                    { title: '#', valueType: 'indexBorder', width: 30 },
                    { title: "Tên bài báo", dataIndex: "name" },
                    { title: 'Tên tạp chí/ ISSN', dataIndex: 'issn' },
                    { title: 'Tác giả', dataIndex: 'authors' },
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
                    { title: 'Tập', dataIndex: 'volume', width: 80 },
                    { title: 'Số', dataIndex: 'issue', width: 80 },
                    { title: 'Trang', dataIndex: 'page', width: 80 },
                    { title: 'Năm công bố', dataIndex: 'publishYear', width: 120 },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button key="edit" type="primary" icon={<EditOutlined />} size="small"
                                onClick={() => { setJournal(record); setOpen(true); }} />,
                            <Popconfirm key="delete" title="Bạn có chắc chắn muốn xóa?" onConfirm={() => onDelete(record.id)}>
                                <Button danger type="primary" icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                request={(params) => apiJournalList({
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
                title="Cài đặt bài báo"
                open={open}
                onOpenChange={setOpen}
                formRef={formRef}
                onFinish={onFinish}
            >
                <ProFormText name="id" hidden />
                <ProFormTextArea name="name" label="Tên bài báo" rules={[{ required: true }]} />
                <div className="md:flex gap-4">
                    <ProFormText name="issn" label="Tên tạp chí / ISSN" />
                    <ProFormText name="volume" label="Tập" />
                    <ProFormText name="issue" label="Số" />
                    <ProFormText name="page" label="Trang" />
                    <ProFormDatePicker.Year name="publishYear" label="Năm công bố" />
                </div>
                <ProFormText name="authors" label="Tác giả" />

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
                        <p>
                            <InboxOutlined className="text-[20px] text-blue-500" />
                        </p>
                        <p className="text-gray-400 text-sm">Hỗ trợ 1 file ảnh / PDF</p>
                    </Dragger>
                </ProForm.Item>
            </ModalForm>

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
                ) : (<img src={previewUrl!} alt="evidence" style={{ width: "100%", height: "70vh" }} />)}
            </Modal>
        </>
    );
};

export default JournalTab;
