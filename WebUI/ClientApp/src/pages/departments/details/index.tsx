import { Button, Modal, Tabs, Card, Form, Input, message, TableColumnType, Space, InputNumber, Popconfirm, Row, Col, Select, Divider, List, Table } from "antd"
import axios from "axios";
import React, { useEffect, useState } from "react"
import {
    DeleteOutlined
} from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import MyEditor from '../../../../src/components/my-editor';
import { TabContentDepartment } from "./tab-content";

const DepartmentDetail: React.FC = () => {

    const { id } = useParams<any>();
    const [open, setOpen] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<any>([]);
    const [department, setDepartment] = useState<any>();
    const [form] = Form.useForm();
    const [users, setUsers] = useState<any>([]);
    const [usersInDepartment, setUserInDepartment] = useState<any>([]);
    const [activeTab, setActiveTab] = useState<string>();

    const fetchData = () => {
        axios.get(`/api/department/detail/${id}`).then(response => {
            setDataSource(response.data);
            if (response.data && response.data.length > 0) {
                setActiveTab(response.data[0].id)
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

    const addUser = async (values: any) => {
        try {
            values.departmentId = id;
            const response = await axios.post(`/api/department/add-user`, values);
            if (response.data) {
                message.success('Thành công!');
                fetchUsersInDepartment();
            }
        } catch (e) {
            console.log(e);
            message.error('Có lỗi xảy ra!');
        }
    }

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const removeUserFromDepartment = async (id: string) => {
        try {
            const response = await axios.post(`/api/department/detail/delete/${id}`);
            if (response.data.succeeded) {
                message.success('Thành công!');
                fetchUsersInDepartment();
            }
        } catch (e) {
            console.log(e);
            message.error(e.response.data);
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
                    <Popconfirm title="Xác nhận xóa?" onConfirm={() => removeUserFromDepartment(record.id)}>
                        <Button type="primary" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ]

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
                                setActiveTab(activeKey);
                            }}
                            items={dataSource?.map((record: any) => {
                                return {
                                    label: record.type,
                                    key: record.id,
                                    children: <TabContentDepartment activeTab={activeTab} fetchData={fetchData} />,
                                };
                            })}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Cơ cấu tổ chức">
                        <Form layout="vertical" onFinish={addUser}>
                            <Form.Item name="userId" required label="Thành viên">
                                <Select options={users} showSearch filterOption={filterOption} />
                            </Form.Item>
                            <Space>
                                <Form.Item name="rank" required label="Rank">
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item name="type" required label="Nhóm">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="jobTitle" label="Chức danh">
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
                        <MyEditor name='content' />
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