import { apiQaAdd, apiQaDelete, apiQaList, apiQaUpdate } from "@/services/qa";
import { DeleteOutlined, EditOutlined, FolderOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, PageContainer, ProColumnType, ProFormDigit, ProFormInstance, ProFormText, ProTable } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, Popconfirm, message } from "antd";
import { useEffect, useRef, useState } from "react";

const QaPage : React.FC = () => {

    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [qaGroup, setQaGroup] = useState<any>();

    useEffect(() => {
        if (qaGroup) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: qaGroup.id
                },
                {
                    name: 'title',
                    value: qaGroup.title
                },
                {
                    name: 'sortOrder',
                    value: qaGroup.sortOrder
                }
            ]);
        }
    }, [qaGroup]);

    const onFinish = async (values: any) => {
        if (values.id) {
            await apiQaUpdate(values);
            message.success('Cập nhật thành công!');
            actionRef.current?.reload();
            setOpen(false);
            formRef.current?.resetFields();
            return;
        }
        await apiQaAdd(values);
        message.success('Thêm thành công!');
        actionRef.current?.reload();
        formRef.current?.resetFields();
        setOpen(false);
    }

    const columns : ProColumnType<any>[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 50,
            align: 'center'
        },
        {
            title: 'Nhóm câu hỏi',
            dataIndex: 'title'
        },
        {
            title: 'Thứ tự',
            dataIndex: 'sortOrder',
            width: 100,
            align: 'center',
            search: false
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            valueType: 'dateTime',
            width: 180,
            search: false
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'modifiedDate',
            valueType: 'dateTime',
            width: 180,
            search: false
        },
        {
            title: 'Tác vụ',
            valueType: 'option',
            render: (dom, entity) => [
                <Button type="primary" size="small" icon={<FolderOutlined />} key="detail" onClick={() => history.push(`/post/qa/item/${entity.id}`)} />,
                <Button size="small" icon={<EditOutlined />} key="edit" onClick={() => {
                    setQaGroup(entity);
                    setOpen(true);
                }} />,
                <Popconfirm  key="delete" title="Xác nhận xóa?" onConfirm={async () => {
                    await apiQaDelete(entity.id);
                    message.success('Xóa thành công!');
                    actionRef.current?.reload();
                }}>
                    <Button type="primary" danger size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
            ],
            width: 120
        }
    ]

    return (
        <PageContainer extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => {
            setQaGroup(null);
            formRef.current?.resetFields();
            setOpen(true);
        }}>Tạo nhóm câu hỏi</Button>}>
            <ProTable
                request={apiQaList}
                columns={columns}
                actionRef={actionRef}
                search={{
                    layout: 'vertical'
                }}
            />
            <ModalForm open={open} onOpenChange={setOpen} title="Câu hỏi thường gặp" formRef={formRef} onFinish={onFinish}>
                <ProFormText name="id" hidden />
                <ProFormText name="title" label="Tiêu đề" rules={[
                    {
                        required: true
                    }
                ]} />
                <ProFormDigit name="sortOrder" label="Thứ tự hiển thị" />
            </ModalForm>
        </PageContainer>
    )
}

export default QaPage;