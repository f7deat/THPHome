import { Button, Modal, Tabs, Card, Form, Input, message, TableColumnType, Space, InputNumber, Popconfirm, Row, Col, Select, Divider, Table } from "antd"
import React, { useEffect, useState } from "react"
import {
    DeleteOutlined, EditOutlined
} from "@ant-design/icons";
import MyEditor from '../../../../src/components/my-editor';
import { TabContentDepartment } from "./tab-content";
import { useParams } from "@umijs/max";
import { request } from "@umijs/max";

const DepartmentDetail: React.FC = () => {

    const { id } = useParams<any>();
    const [open, setOpen] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<any>([]);
    const [department, setDepartment] = useState<any>();
    const [form] = Form.useForm();
    const [users, setUsers] = useState<any>([]);
    const [usersInDepartment, setUserInDepartment] = useState<any>([]);
    const [activeTab, setActiveTab] = useState<string>();
    const [formUser] = Form.useForm();

    const fetchData = () => {
        request(`department/detail/${id}`).then(response => {
            setDataSource(response);
            if (response && response.length > 0) {
                setActiveTab(response[0].id)
            }
        });
    }

    const fetchUsersInDepartment = () => {
        request(`department/users-in-department/${id}`).then(response => {
            setUserInDepartment(response);
        })
    }

    useEffect(() => {
        request(`department/${id}`).then(response => {
            setDepartment(response);
        })
        fetchData();
        request(`user/select`).then(ressponse => {
            setUsers(ressponse);
        })
        fetchUsersInDepartment();
    }, [])

    const onFinish = async (values: any) => {
        values.departmentId = id;
        if (values.id) {

        } else {
            const response = await request(`department/add-detail`, {
                method: 'POST',
                data: values
            });
            if (response.succeeded) {
                message.success('Thành công!');
                setOpen(false);
                fetchData();
            }
        }
    }

    const addUser = async (values: any) => {
        try {
            values.departmentId = id;
            if (values.id) {
                const response = await request(`department/update-user`, {
                    method: 'POST',
                    data: values
                });
                if (response.data) {
                    message.success('Thành công!');
                    fetchUsersInDepartment();
                }
                formUser.resetFields();
                return;
            }
            const response = await request(`department/add-user`, {
                method: 'POST',
                data: values
            });
            if (response) {
                message.success('Thành công!');
                fetchUsersInDepartment();
            }
            formUser.resetFields();
        } catch (e) {
            console.log(e);
            message.error('Có lỗi xảy ra!');
        }
    }

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const removeUserFromDepartment = async (id: string) => {
        const response = await request(`department/remove-user/${id}`, {
            method: 'POST'
        });
        if (response.succeeded) {
            message.success('Thành công!');
            fetchUsersInDepartment();
        }
    }

    const onEdit = (record: any) => {
        formUser.setFields([
            {
                name: 'id',
                value: record.id
            },
            {
                name: 'userId',
                value: record.userId
            },
            {
                name: 'rank',
                value: record.rank
            },
            {
                name: 'type',
                value: record.type
            },
            {
                name: 'jobTitle',
                value: record.jobTitle
            }
        ])
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
                    <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
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
                        <Form layout="vertical" onFinish={addUser} form={formUser}>
                            <Form.Item name="id" hidden><Input /></Form.Item>
                            <Form.Item name="userId" label="Thành viên" rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn thành viên'
                                }
                            ]}>
                                <Select options={users} showSearch filterOption={filterOption} />
                            </Form.Item>
                            <Row gutter={8}>
                                <Col span={6}>
                                    <Form.Item name="rank" label="Rank">
                                        <InputNumber className="w-full" />
                                    </Form.Item>
                                </Col>
                                <Col span={9}>
                                    <Form.Item name="type" required label="Nhóm">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={9}>
                                    <Form.Item name="jobTitle" label="Chức danh">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="w-full">Lưu lại</Button>
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
                    <Form.Item label="Nhóm" name="type" rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên nhóm'
                        }
                    ]}>
                        <Input />
                    </Form.Item>
                    <MyEditor name='content' label="Nội dung" />
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