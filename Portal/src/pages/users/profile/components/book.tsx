import { apiBookAdd, apiBookDelete, apiBookUpdate, apiMyBooks } from "@/services/user";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormDatePicker, ProFormInstance, ProFormText, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const BookTab: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const [book, setBook] = useState<any>();
    const { initialState } = useModel('@@initialState');

    useEffect(() => {
        formRef.current?.setFields([
            {
                name: 'id',
                value: book?.id
            },
            {
                name: 'name',
                value: book?.name
            },
            {
                name: 'authors',
                value: book?.authors
            },
            {
                name: 'publisher',
                value: book?.publisher
            },
            {
                name: 'publishYear',
                value: book?.publishYear ? dayjs(`${book.publishYear}-01-01`) : null
            },
            {
                name: 'isbn',
                value: book?.isbn
            }
        ])
    }, [book, open])

    const onFinish = async (values: any) => {
        if (values.id) {
            await apiBookUpdate(values);
        } else {
            await apiBookAdd(values);
        }
        message.success('Thành công!');
        formRef.current?.resetFields();
        setBook(null);
        actionRef.current?.reload();
        setOpen(false);
    }

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
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: 'Tên sách',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Loại sách / ISBN',
                        dataIndex: 'isbn'
                    },
                    {
                        title: 'Nhà xuất bản',
                        dataIndex: 'publisher'
                    },
                    {
                        title: 'Năm xuất bản',
                        dataIndex: 'publishYear'
                    },
                    {
                        title: 'Tác giả',
                        dataIndex: 'authors'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button key="edit" size="small" type="primary" icon={<EditOutlined />} onClick={() => {
                                setBook(record);
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
                <ProFormText name="name" label="Tên sách" />
                <ProFormText name="isbn" label="Loại sách / ISBN" />
                <div className="flex gap-4">
                    <div className="flex-1">
                        <ProFormText name="publisher" label="Nhà xuất bản" />
                    </div>
                    <ProFormDatePicker.Year name="publishYear" label="Năm xuất bản" />
                </div>
                <ProFormText name="authors" label="Tác giả" />
            </ModalForm>
        </>
    )
}

export default BookTab;