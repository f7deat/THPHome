import { Button, message, Modal, Popconfirm, Space, Table } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"
import {
    EditOutlined,
    DeleteOutlined,
    UsergroupAddOutlined,
    PlusCircleOutlined,
    CheckCircleTwoTone
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const UserList = () => {

    const [listUser, setListUser] = useState<any>([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [listRole, setListRole] = useState<any>([])
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        axios.get('/api/user/get-list').then(response => {
            setListUser(response.data);
        })
    }, [])

    function openRolePanel(user: any) {
        setUser(user);
        if (listRole) {
            axios.get('/api/role/get-list').then(response => {
                setListRole(response.data);
                setIsModalVisible(true);
            })
        } else {
            setIsModalVisible(true);
        }
    }

    function addToRole(roleName: string) {
        if (!user) {
            return message.warning('User not found!');
        }
        axios.post(`/api/user/add-to-role`, {
            id: user.id,
            roleName: roleName
        }).then(response => {
            if (response.data.succeeded) {
                message.success('Succeeded!');
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

    return (
        <div>
            <div className="flex justify-end mb-3"><Button type="primary">Add</Button></div>
            <div className="bg-white p-4">
                <Table dataSource={listUser} columns={columns} rowKey="id" />
            </div>
            <Modal title="Assign Role" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
                {
                    listRole && listRole.map((value: any) => (
                        <div className="p-2 flex justify-between" key={value.id}>
                            <div>{value.name}</div>
                            <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => addToRole(value.name)}>Add</Button>
                        </div>
                    ))
                }
            </Modal>
        </div>    
    )
}

export default UserList