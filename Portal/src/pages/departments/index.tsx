import { Button, Modal, Form, Input, message, Popconfirm, Tabs, Empty } from "antd"
import { useRef, useState } from "react"
import {
    FolderOutlined,
    DeleteOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { history, request } from "@umijs/max";
import { ActionType, PageContainer, ProColumnType, ProTable } from "@ant-design/pro-components";
import { apiGetDepartmentList } from "@/services/department";

const Department: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [form] = Form.useForm();
    const actionRef = useRef<ActionType>()

    const onFinish = async (values: any) => {
        if (values.id) {

        } else {
            const response = await request(`department/add`, {
                data: values,
                method: 'POST'
            });
            if (response.data.succeeded) {
                message.success('Đã lưu!');
                setOpen(false);
                actionRef.current?.reload();
            }
        }
    }

    const onConfirm = async (id: string) => {
        const response = await request(`department/remove/${id}`, {
            method: 'POST'
        });
        if (response.succeeded) {
            message.success('Xóa thành công!');
            actionRef.current?.reload();
        }
    }

    const columns: ProColumnType<any>[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 50
        },
        {
            title: 'Tên Khoa - Viện',
            dataIndex: 'name'
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            search: false
        },
        {
            title: 'Tác vụ',
            valueType: 'option',
            render: (value, record) => [
                <Button size="small" type="primary" key="detail" icon={<FolderOutlined />} onClick={() => history.push(`/department/detail/${record.id}`)}></Button>,
                <Popconfirm title="Xóa bản ghi?" key="delete" onConfirm={() => onConfirm(record.id)}>
                    <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                </Popconfirm>
            ],
            width: 100
        }
    ]

    return (
        <PageContainer>
            <Tabs
                items={[
                    {
                        key: 'faculty',
                        label: 'Khoa - Viện',
                        children: (
                            <>
                                <div className="flex justify-end mb-4">
                                    <Button type="primary" onClick={() => {
                                        form.resetFields();
                                        setOpen(true);
                                    }} icon={<PlusOutlined />}>Thêm mới</Button>
                                </div>
                                <ProTable
                                    actionRef={actionRef}
                                    search={{
                                        layout: 'vertical'
                                    }}
                                    request={apiGetDepartmentList}
                                    rowKey="id" columns={columns} />
                            </>
                        )
                    },
                    {
                        key: 'function',
                        label: 'Ban chức năng',
                        children: <Empty description="Sắp có" />
                    },
                    {
                        key: 'center',
                        label: 'Trung tâm',
                        children: <Empty description="Sắp có" />
                    }
                ]}
            />
            <Modal title="Khoa - Viện" open={open} onCancel={() => {
                setOpen(false)
            }} footer={false}>
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tên phòng ban" name="name" rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên phòng ban'
                        }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Lưu lại</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </PageContainer>
    )
}

export default Department