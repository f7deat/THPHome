import { Button, Modal, Tabs, Card, Form, Input, message, TableColumnType, Space, InputNumber, Popconfirm, Row, Col, Select, Divider, List } from "antd"
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
    const [users, setUsers] = useState<any>([]);
    const [usersInDepartment, setUserInDepartment] = useState<any>([]);

    const fetchData = () => {
        axios.get(`/api/department/detail/${id}`).then(response => {
            setDataSource(response.data);
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

    return (
        <>
            <Row gutter={16}>
                <Col span={18}>
                    <Card title={department?.name} extra={<Button type="primary" onClick={() => {
                        form.resetFields();
                        setOpen(true);
                    }}>Thêm mới</Button>}>
                        <Tabs
                            type="card"
                            items={dataSource?.map((record: any) => {
                                return {
                                    label: record.type,
                                    key: record.id,
                                    children: (
                                        <>
                                            <div className="mb-4">
                                                <ReactQuill value={record.content} />
                                            </div>
                                            <div className="flex justify-end gap-4">
                                                <Button type="primary">Lưu lại</Button>
                                                <Popconfirm title="Xác nhận xóa?" onConfirm={() => removeContent(record.id)}>
                                                    <Button type="primary" danger>Xóa</Button>
                                                </Popconfirm>
                                            </div>
                                        </>
                                    ),
                                };
                            })}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Cơ cấu tổ chức">
                        <Form layout="vertical" onFinish={addUser}>
                            <Form.Item name="userId" required label="Thành viên">
                                <Select options={users} />
                            </Form.Item>
                            <Space>
                                <Form.Item name="rank" required label="Thứ tự">
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
                        <List
                            dataSource={usersInDepartment}
                            renderItem={(item: any) => (
                                <List.Item actions={[
                                    <Button type="primary" danger key="delete" size="small">
                                        <DeleteOutlined />
                                    </Button>
                                ]}>
                                    {item.name} - {item.email}
                                </List.Item>
                            )}
                        />
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