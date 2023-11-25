import { Button, Modal, Table, Card, Form, Input, message, TableColumnType, Space, Popconfirm, Tabs, Empty } from "antd"
import axios from "axios";
import { useEffect, useState } from "react"
import {
    FolderOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const Department: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<any>([]);
    const [form] = Form.useForm();
    const history = useHistory();

    const fetchData = () => {
        axios.get(`/api/department/list`).then(response => {
            setDataSource(response.data.data);
        });
    }

    useEffect(() => {
        fetchData();
    }, [])

    const onFinish = async (values: any) => {
        if (values.id) {

        } else {
            const response = await axios.post(`/api/department/add`, values);
            if (response.data.succeeded) {
                message.success('Đã lưu!');
                setOpen(false);
                fetchData();
            }
        }
    }

    const onConfirm = async (id: string) => {
        const response = await axios.post(`/api/department/remove/${id}`);
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
                    <Button type="primary" icon={<FolderOutlined />} onClick={() => history.push(`/admin/department/detail/${record.id}`)}></Button>
                    <Popconfirm title="Xóa bản ghi?" onConfirm={() => onConfirm(record.id)}>
                        <Button type="primary" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <>
            <Card title="Phòng ban">
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
        </>
    )
}

export default Department