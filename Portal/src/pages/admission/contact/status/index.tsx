import { apiAddContactStatus, apiDeleteContactStatus, apiListContactStatus, apiUpdateContactStatus, apiUpdateContactStatusName } from "@/services/contact"
import { DeleteOutlined, EditOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons"
import { ActionType, ModalForm, PageContainer, ProFormInstance, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components"
import { history } from "@umijs/max"
import { Button, message, Popconfirm } from "antd"
import { useEffect, useRef, useState } from "react"

const ContactStatusPage: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<any>();

    useEffect(() => {
        formRef.current?.setFields([
            {
                name: 'id',
                value: status?.id
            },
            {
                name: 'name',
                value: status?.name
            },
            {
                name: 'description',
                value: status?.description
            }
        ])
    }, [status]);

    const onFinish = async (values: any) => {
        if (values.id) {
            await apiUpdateContactStatusName(values);
        } else {
            await apiAddContactStatus(values);
        }
        message.success('Thành công!');
        formRef.current?.resetFields();
        actionRef.current?.reload();
        setOpen(false);
    }

    const onDelete = async (id: number) => {
        await apiDeleteContactStatus(id);
        message.success('Thành công!');
        actionRef.current?.reload();
    }

    return (
        <PageContainer extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProTable
                actionRef={actionRef}
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Thêm mới</Button>}
                search={{
                    layout: 'vertical'
                }}
                request={apiListContactStatus}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Mô tả',
                        dataIndex: 'description',
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
                        search: false,
                        valueType: 'fromNow'
                    },
                    {
                        title: 'Người cập nhật',
                        dataIndex: 'modifiedBy',
                        search: false
                    },
                    {
                        title: 'Ngày cập nhật',
                        dataIndex: 'modifiedDate',
                        search: false,
                        valueType: 'fromNow'
                    },
                    {
                        title: 'Liên hệ',
                        dataIndex: 'contactCount',
                        search: false,
                        valueType: 'digit'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, entity) => [
                            <Button key="edit" icon={<EditOutlined />} size="small" type="primary" onClick={() => {
                                setStatus(entity);
                                setOpen(true)
                            }} />,
                            <Popconfirm key="delete" title="Xác nhận xóa?" onConfirm={() => onDelete(entity.id)}>
                                <Button type="primary" danger size="small" icon={<DeleteOutlined />} />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
            />
            <ModalForm title="Cài đặt" open={open} onOpenChange={setOpen} formRef={formRef} onFinish={onFinish}>
                <ProFormText name="id" hidden />
                <ProFormText label="Trạng thái" name="name" rules={[
                    {
                        required: true
                    }
                ]} />
                <ProFormTextArea label="Mô tả" name="description" />
            </ModalForm>
        </PageContainer>
    )
}

export default ContactStatusPage;