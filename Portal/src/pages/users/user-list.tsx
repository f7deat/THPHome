import { Button, Checkbox, Drawer, Input, message, Modal, Popconfirm, Space, Table, Form } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"
import {
    EditOutlined,
    DeleteOutlined,
    UsergroupAddOutlined,
    PlusCircleOutlined,
    CheckCircleTwoTone,
    SearchOutlined
} from "@ant-design/icons";
import { Link } from "@umijs/max";
import { request } from "@umijs/max";

const UserList = () => {

    const [listUser, setListUser] = useState<any>([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [listRole, setListRole] = useState<any>([])
    const [user, setUser] = useState<any>()
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const fetchUsers = () => {
        request('user/list', {
            params: {
                searchTerm
            }
        }).then(response => {
            if (response.status === 401) {
                setListUser([])
            } else {
                setListUser(response);
            }
        })
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    function openRolePanel(record: any) {
        setUser(record)
        fetchRole()
    }

    function fetchRole() {
        request('role/get-list').then(response => {
            if (!user) {
                return;
            }
            request(`user/roles/${user.id}`).then(responseRoleInUser => {
                response.map((value: any) => {
                    let isInRole = responseRoleInUser.find((x: any) => x === value.name)
                    if (isInRole) {
                        value.isInRole = true
                    } else {
                        value.isInRole = false
                    }
                })
                setListRole(response)
                setIsModalVisible(true)
            })
        })
    }

    function addToRole(roleName: string) {
        if (!user) {
            return message.warning('User not found!');
        }
        axios.post(`/api/user/add-to-role`, {
            userId: user.id,
            roleName: roleName
        }).then(response => {
            if (response.data.succeeded) {
                message.success('Succeeded!');
                fetchRole()
            } else {
                response.data.errors.forEach((value: any) => {
                    message.error(value.description);
                })
            }
        })
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'User name',
            dataIndex: 'userName'
        },
        {
            title: 'Email',
            render: (record: any) => (
                <Space>
                    {
                        record.emailConfirmed ? <CheckCircleTwoTone twoToneColor="#008000" /> : <CheckCircleTwoTone twoToneColor="#ff0000" />
                    }
                    <div>{record.email}</div>
                </Space>
            )
        },
        {
            title: '',
            render: (record: any) => (
                <Space>
                    <Link to={`/user/edit/${record.id}`}><Button icon={<EditOutlined />}></Button></Link>
                    <Button icon={<UsergroupAddOutlined />} onClick={() => openRolePanel(record)}></Button>
                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={async () => {
                            const response = await request(`user/delete/${record.id}`, {
                                method: 'POST'
                            });
                            if (response.data) {
                                message.success('Xóa thành công!');
                                fetchUsers();
                            }
                        }}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleAdd = () => {
        setDrawerVisible(true)
    }

    const handleSetRole = (role: any) => {
        if (role.isInRole) {
            axios.delete(`/api/user/remove-from-role/${role.name}/${user.id}`).then(response => {
                if (response.data.succeeded) {
                    message.success('succeeded')
                    fetchRole()
                } else {
                    response.data.errors.forEach((value: any) => {
                        message.error(value.description)
                    })
                }
            })
        } else {
            addToRole(role.name)
        }
    }

    const roleColumns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Normalized Name',
            dataIndex: 'normalizedName'
        },
        {
            title: 'Is In Role',
            render: (record: any) => <Checkbox checked={record.isInRole} onClick={() => handleSetRole(record)} />
        }
    ];

    const onAddUser = async (values: any) => {
        const response = await axios.post(`/api/user/create`, values);
        if (response.data.succeeded) {
            setDrawerVisible(false);
            fetchUsers();
            message.success('Thêm thành công!');
        }
    }

    return (
        <div>
            <div className="bg-white p-4">
                <div className="flex justify-between mb-3">
                    <Space>
                        <Input onChange={(e) => setSearchTerm(e.currentTarget.value)} />
                        <Button icon={<SearchOutlined />} type="primary" onClick={() => fetchUsers()}>Tìm kiếm</Button>
                    </Space>
                    <Button type="primary" icon={<PlusCircleOutlined />} onClick={handleAdd}>Thêm thành viên</Button>
                </div>
                <Table dataSource={listUser} columns={columns} rowKey="id" />
            </div>
            <Modal title="Assign Role" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} bodyStyle={{ padding: 0 }}>
                <div className="p-2 flex justify-between">
                    <Space>
                        <Input />
                        <Button type="primary" icon={<SearchOutlined />}></Button>
                    </Space>
                    <Button icon={<PlusCircleOutlined />} type="primary">New role</Button>
                </div>
                <Table columns={roleColumns} rowKey="id" dataSource={listRole} />
            </Modal>
            <Drawer visible={drawerVisible} width={700} onClose={() => setDrawerVisible(false)} title="Người dùng">
                <Form onFinish={onAddUser} layout="vertical">
                    <Form.Item name="name" label="Họ và tên" rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập họ và tên'
                        }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="userName" label="Tên đăng nhập" rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên đăng nhập'
                        }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Tạo thành viên</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
}

export default UserList