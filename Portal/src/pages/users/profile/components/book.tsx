import { apiBookAdd, apiBookDelete, apiBookUpdate, apiBookUploadEvidence, apiMyBooks } from "@/services/user";
import { CloseOutlined, DeleteOutlined, EditOutlined, PictureOutlined, PlusOutlined, UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProForm, ProFormDatePicker, ProFormInstance, ProFormText, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Modal, Popconfirm, Space, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const { Dragger } = Upload;

const BookTab: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const [book, setBook] = useState<any>();
    const { initialState } = useModel('@@initialState');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        formRef.current?.setFields([
            { name: 'id', value: book?.id },
            { name: 'name', value: book?.name },
            { name: 'authors', value: book?.authors },
            { name: 'publisher', value: book?.publisher },
            { name: 'publishYear', value: book?.publishYear ? dayjs(`${book.publishYear}-01-01`) : null },
            { name: 'isbn', value: book?.isbn },
            {
                name: 'evidence',
                value: book?.evidenceUrl
                    ? [
                        {
                            uid: '-1',
                            name: book?.evidenceUrl.split('/').pop(),
                            status: 'done',
                            url: book?.evidenceUrl,
                        },
                    ]
                    : [],
            },
        ])
    }, [book, open])

    const onDelete = async (id: string) => {
        await apiBookDelete(id);
        message.success('Thành công!');
        actionRef.current?.reload();
    }

    return (
        <>
            <ProTable
                request={(params) => apiMyBooks({
                    ...params,
                    userName: initialState?.currentUser?.userName
                })}
                actionRef={actionRef}
                headerTitle={<Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>Thêm mới</Button>}
                search={false}
                ghost
                columns={[
                    { title: '#', valueType: 'indexBorder', width: 30 },
                    { title: 'Tên sách', dataIndex: 'name' },
                    { title: 'Loại sách / ISBN', dataIndex: 'isbn' },
                    { title: 'Nhà xuất bản', dataIndex: 'publisher' },
                    { title: 'Năm xuất bản', dataIndex: 'publishYear', width: 120 },
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
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button key="edit" size="small" type="primary" icon={<EditOutlined />}
                                onClick={() => { setBook(record); setOpen(true); }} />,
                            <Popconfirm key="delete" title="Xác nhận xóa?" onConfirm={() => onDelete(record.id)} okText="Xóa" cancelText="Hủy">
                                <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
            />

            <ModalForm open={open} onOpenChange={setOpen} title="Cài đặt sách" formRef={formRef}
                onFinish={async (values) => {
                    let bookId = values.id;
                    if (values.id) {
                        await apiBookUpdate(values);
                    } else {
                        const newBook = await apiBookAdd(values);
                        bookId = newBook?.id;
                    }

                    if (values?.evidence && values.evidence.length > 0) {
                        const formData = new FormData();
                        formData.append("BookId", bookId);
                        values.evidence.forEach((file: any) => {
                            formData.append("File", file.originFileObj);
                        });
                        await apiBookUploadEvidence(formData);
                    }

                    message.success("Thành công!");
                    formRef.current?.resetFields();
                    setBook(null);
                    actionRef.current?.reload();
                    return true;
                }}
            >
                <ProFormText name="id" hidden />
                <ProFormText name="name" label="Tên sách" />
                <div className="flex gap-4">
                    <div className="flex-1">
                        <ProFormText name="isbn" label="Loại sách / ISBN" />
                    </div>
                    <ProFormText name="publisher" label="Nhà xuất bản" />
                </div>
                <div className="flex gap-4">
                    <ProFormDatePicker.Year name="publishYear" label="Năm xuất bản" />
                    <div className="flex-1">
                        <ProFormText name="authors" label="Tác giả" />
                    </div>
                </div>

                <ProForm.Item
                    name="evidence"
                    label="Minh chứng"
                    valuePropName="fileList"
                    destroyOnClose
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

export default BookTab;
