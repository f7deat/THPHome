import { Button, Modal, Table, Card, Form, Input, message, TableColumnType, Space, Popconfirm, Tabs, Empty } from "antd"
import { useEffect, useState } from "react"
import {
    FolderOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import { history, request } from "@umijs/max";
import { PageContainer } from "@ant-design/pro-components";

const Department: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<any>([]);
    const [form] = Form.useForm();

    const fetchData = () => {
        request(`department/list`).then(response => {
            setDataSource(response.data);
        });
    }

    useEffect(() => {
        fetchData();
    }, [])

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
                fetchData();
            }
        }
    }

    const onConfirm = async (id: string) => {
        const response = await request(`department/remove/${id}`, {
            method: 'POST'
        });
        if (response.data) {
            message.success('Xóa thành công!');
            fetchData();
        }
    }

    const columns: TableColumnType<any>[] = [
        {
            title: '#',
            render: (value, record, index) => index + 1
        },
        {
            title: 'Tên Khoa - Viện',
            dataIndex: 'name'
        },
        {
            title: 'Mô tả',
            dataIndex: 'description'
        },
        {
            title: 'Tác vụ',
            render: (value, record) => (
                <Space>
                    <Button type="primary" icon={<FolderOutlined />} onClick={() => history.push(`/department/detail/${record.id}`)}></Button>
                    <Popconfirm title="Xóa bản ghi?" onConfirm={() => onConfirm(record.id)}>
                        <Button type="primary" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <PageContainer>
            <Card>
                <Tabs
                    items={[
                        {
                            key: 'faculty',
                            label: 'Khoa - Viện',
                            children: (
                                <Card title="Phòng ban" extra={<Button type="primary" onClick={() => {
                                    form.resetFields();
                                    setOpen(true);
                                }}>Thêm mới</Button>}>
                                    <Table dataSource={dataSource} rowKey="id" columns={columns} />
                                </Card>
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
            </Card>
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