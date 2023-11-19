import { Button, Modal, Tabs, Card, Form, Input, message, TableColumnType, Space, InputNumber, Popconfirm, Row, Col, Select, Divider, List, Table } from "antd"
import axios from "axios";
import { useEffect, useState } from "react"
import {
    EditOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';

const DepartmentDetail: React.FC = () => {

    const { id } = useParams<any>();
    const [open, setOpen] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<any>([]);
    const [department, setDepartment] = useState<any>();
    const [form] = Form.useForm();
    const [formType] = Form.useForm();
    const [users, setUsers] = useState<any>([]);
    const [usersInDepartment, setUserInDepartment] = useState<any>([]);

    const fetchData = () => {
        axios.get(`/api/department/detail/${id}`).then(response => {
            setDataSource(response.data);
            if (response.data && response.data.length > 0) {
                formType.setFields([
                    {
                        name: 'id',
                        value: response.data[0].id
                    },
                    {
                        name: 'type',
                        value: response.data[0].type
                    },
                    {
                        name: 'content',
                        value: response.data[0].content
                    }
                ])
            }
        });
    }

    const fetchUsersInDepartment = () => {
        axios.get(`/api/department/users-in-department/${id}`).then(response => {
            setUserInDepartment(response.data);
        })
    }

    useEffect(() => {
        axios.get(`/api/department/${id}`).then(response => {
            setDepartment(response.data);
        })
        fetchData();
        axios.get(`/api/user/select`).then(ressponse => {
            setUsers(ressponse.data);
        })
        fetchUsersInDepartment();
    }, [])

    const onFinish = async (values: any) => {
        values.departmentId = id;
        if (values.id) {

        } else {
            const response = await axios.post(`/api/department/add-detail`, values);
            if (response.data.succeeded) {
                message.success('Thành công!');
                setOpen(false);
                fetchData();
            }
        }
    }

    const removeContent = async (id: string) => {
        const response = await axios.post(`/api/department/detail/delete/${id}`);
        if (response.data) {
            message.success('Thành công!');
            fetchData();
        }
    }

    const addUser = async (values: any) => {
        values.departmentId = id;
        const response = await axios.post(`/api/department/add-user`, values);
        if (response.data) {
            message.success('Thành công!');
            fetchUsersInDepartment();
        }
    }

    const columns: TableColumnType<any>[] = [
        {
            title: 'Rank',
            dataIndex: 'rank'
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name'
        },
        {
            title: 'Chức danh',
            dataIndex: 'jobTitle'
        },
        {
            title: 'Tác vụ',
            render: (_, record) => (
                <Space>
                    <Button type="primary" danger icon={<DeleteOutlined /> } />
                </Space>
            )
        }
    ]

    const onFinishType = async (values: any) => {
        const response = await axios.post(`/api/department/update-detail`, values);
        if (response.data.succeeded) {
            message.success('Thành công!');
        }
    }

    return (
        <>
            <Row gutter={16}>
                <Col span={16}>
                    <Card title={department?.name} extra={<Button type="primary" onClick={() => {
                        form.resetFields();
                        setOpen(true);
                    }}>Thêm mới</Button>}>
                        <Tabs
                            type="card"
                            onChange={(activeKey) => {
                                const data = dataSource.find((x: any) => x.id === activeKey);
                                if (data) {
                                    formType.setFields([
                                        {
                                            name: 'id',
                                            value: data.id
                                        },
                                        {
                                            name: 'type',
                                            value: data.type
                                        },
                                        {
                                            name: 'content',
                                            value: data.content
                                        }
                                    ])
                                }
                            }}
                            items={dataSource?.map((record: any) => {
                                return {
                                    label: record.type,
                                    key: record.id,
                                    children: (
                                        <>
                                            <Form form={formType} layout="vertical" onFinish={onFinishType}>
                                                <Form.Item name="id" hidden>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item name="type" label="Tiêu đề" required>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item name="content" label="Nội dung" required>
                                                    <ReactQuill />
                                                </Form.Item>
                                                <div className="flex justify-end gap-4">
                                                    <Button type="primary" htmlType="submit">Lưu lại</Button>
                                                    <Popconfirm title="Xác nhận xóa?" onConfirm={() => removeContent(record.id)}>
                                                        <Button type="primary" danger>Xóa</Button>
                                                    </Popconfirm>
                                                </div>
                                            </Form>
                                        </>
                                    ),
                                };
                            })}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Cơ cấu tổ chức">
                        <Form layout="vertical" onFinish={addUser}>
                            <Form.Item name="userId" required label="Thành viên">
                                <Select options={users} showSearch />
                            </Form.Item>
                            <Space>
                                <Form.Item name="rank" required label="Rank">
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item name="type" required label="Nhóm">
                                    <Input />
                                </Form.Item>
                            </Space>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="w-full">Thêm</Button>
                            </Form.Item>
                        </Form>
                        <Divider>Thành viên trong Viện - Khoa</Divider>
                        <Table dataSource={usersInDepartment} rowKey="id" columns={columns} />
                    </Card>
                </Col>
            </Row>
            <Modal title="Khoa - Viện" open={open} onCancel={() => {
                setOpen(false)
            }} footer={false}>
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nhóm" name="type" required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="content" required>
                        <ReactQuill
                            className="border"
                            theme="snow"
                        />
                    </Form.Item>
                    <Form.Item label="Thứ tự" name="sortOrder" required>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Lưu lại</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default DepartmentDetail