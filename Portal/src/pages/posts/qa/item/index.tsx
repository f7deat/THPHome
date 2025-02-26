import MyEditor from "@/components/my-editor";
import { apiQaItemAdd, apiQaItemDelete, apiQaItemList, apiQaItemUpdate } from "@/services/qa";
import { DeleteOutlined, EditOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, PageContainer, ProColumnType, ProFormDigit, ProFormInstance, ProFormText, ProTable } from "@ant-design/pro-components";
import { useParams } from "@umijs/max";
import { Button, Popconfirm, message } from "antd";
import { useEffect, useRef, useState } from "react";

const QaItemPage: React.FC = () => {

    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [qaItem, setqaItem] = useState<any>();
    const { id } = useParams();

    useEffect(() => {
        if (qaItem) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: qaItem.id
                },
                {
                    name: 'question',
                    value: qaItem.question
                },
                {
                    name: 'sortOrder',
                    value: qaItem.sortOrder
                },
                {
                    name: 'answer',
                    value: qaItem.answer
                }
            ]);
        }
    }, [qaItem]);

    const onFinish = async (values: any) => {
        values.qaGroupId = id;
        if (values.id) {
            await apiQaItemUpdate(values);
            message.success('Cập nhật thành công!');
            actionRef.current?.reload();
            setOpen(false);
            formRef.current?.resetFields();
            return;
        }
        await apiQaItemAdd(values);
        message.success('Thêm thành công!');
        actionRef.current?.reload();
        formRef.current?.resetFields();
        setOpen(false);
    }

    const columns: ProColumnType<any>[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 50,
            align: 'center'
        },
        {
            title: 'Câu hỏi',
            dataIndex: 'question'
        },
        {
            title: 'TT',
            dataIndex: 'sortOrder',
            width: 50,
            align: 'center',
            search: false
        },
        {
            title: 'Người tạo',
            dataIndex: 'createdBy',
            search: false
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            valueType: 'fromNow',
            width: 150,
            search: false
        },
        {
            title: 'Người cập nhật',
            dataIndex: 'modifiedBy',
            search: false
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'modifiedDate',
            valueType: 'fromNow',
            width: 150,
            search: false
        },
        {
            title: 'Tác vụ',
            valueType: 'option',
            render: (_, entity) => [
                <Button size="small" icon={<EditOutlined />} type="primary" key="edit" onClick={() => {
                    setqaItem(entity);
                    setOpen(true);
                }} />,
                <Popconfirm key="delete" title="Xác nhận xóa?" onConfirm={async () => {
                    await apiQaItemDelete(entity.id);
                    message.success('Xóa thành công!');
                    actionRef.current?.reload();
                }}>
                    <Button type="primary" danger size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
            ],
            width: 60
        }
    ]

    return (
        <PageContainer extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProTable
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => {
                    setqaItem(null);
                    formRef.current?.resetFields();
                    setOpen(true);
                }}>Tạo câu hỏi</Button>}
                request={(params) => apiQaItemList(params, id)}
                columns={columns}
                actionRef={actionRef}
                search={{
                    layout: 'vertical'
                }}
            />
            <ModalForm open={open} onOpenChange={setOpen} title="Câu hỏi thường gặp" formRef={formRef} onFinish={onFinish}>
                <ProFormText name="id" hidden />
                <ProFormText name="question" label="Nội dung câu hỏi" rules={[
                    {
                        required: true
                    }
                ]} />
                <MyEditor label="Nội dung câu trả lời" name="answer" required initialValue={qaItem?.answer} />
                <ProFormDigit name="sortOrder" label="Thứ tự hiển thị" />
            </ModalForm>
        </PageContainer>
    )
}

export default QaItemPage;