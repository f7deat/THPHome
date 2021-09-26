import { Button, Checkbox, Drawer, Input, message, Modal, Popconfirm, Space, Table } from "antd"
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
import { Link } from "react-router-dom";

const UserList = () => {

    const [listUser, setListUser] = useState<any>([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [listRole, setListRole] = useState<any>([])
    const [user, setUser] = useState<any>({})
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false)

    useEffect(() => {
        axios.get('/api/user/list').then(response => {
            if (response.status === 401) {
                setListUser([])
            } else {
                setListUser(response.data);
            }
        })
    }, [])

    function openRolePanel(user: any) {
        setUser(user)
        fetchRole()
    }

    function fetchRole() {
        axios.get('/api/role/get-list').then(response => {
            axios.get(`/api/user/roles/${user.id}`).then(responseRoleInUser => {
                response.data.map((value: any) => {
                    let isInRole = responseRoleInUser.data.find((x: any) => x === value.name)
                    if (isInRole) {
                        value.isInRole = true
                    } else {
                        value.isInRole = false
                    }
                })
                setListRole(response.data)
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
            title: 'User Name',
            dataIndex: 'userName',
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
                    <Link to={`/admin/user/edit/${record.id}`}><Button icon={<EditOutlined />}></Button></Link>
                    <Button icon={<UsergroupAddOutlined />} onClick={() => openRolePanel(record)}></Button>
                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
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
    ]

    return (
        <div>
            <div className="bg-white p-4">
                <div className="flex justify-between mb-3">
                    <Space>
                        <Input />
                        <Button icon={<SearchOutlined />} type="primary"></Button>
                    </Space>
                    <Button type="primary" icon={<PlusCircleOutlined />} onClick={handleAdd}>Add</Button>
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
            <Drawer visible={drawerVisible} width={700} onClose={() => setDrawerVisible(false)}></Drawer>
        </div>
    )
}

export default UserList