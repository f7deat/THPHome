import { Button, Drawer, message, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    FolderOutlined,
    DeleteOutlined
} from '@ant-design/icons';

const RoleList = () => {

    const [listRole, setListRole] = useState<any>([])
    const [drawVisible, setDrawVisible] = useState<boolean>(false)
    const [listUser, setListUser] = useState<any>([])

    useEffect(() => {
        axios.get('/api/role/get-list').then(response => {
            setListRole(response.data);
        })
    }, [])

    const runSeed = () => {
        axios.post('/api/role/run-seed').then(response => {
            if (response.data.succeeded) {
                message.success('Succeeded!');
            } else {
                response.data.errors.forEach((value: any) => {
                    message.error(value.description);
                })
            }
        })
    }

    const deleteRole = (roleId: string) => {
        axios.post(`/api/role/delete/${roleId}`).then(response => {
            if (response.data.succeeded) {
                setListRole(listRole.filter((x: any) => x.id !== roleId))
                message.success('Succeeded!')
            }
        })
    }

    function drawListUserInRole(roleName: string) {
        axios.get(`/api/user/get-users-in-role/${roleName}`).then(response => {
            setListUser(response.data)
            setDrawVisible(true)
        })
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Normalized Name',
            dataIndex: 'normalizedName'
        },
        {
            title: '',
            render: (record: any) => (
                <Space>
                    <Button type="primary" icon={<FolderOutlined />} onClick={() => drawListUserInRole(record.name)}></Button>
                    <Popconfirm
                        title="Are you sure to delete?"
                        onConfirm={() => deleteRole(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    const userColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
        },
        {
            title: '',
            render: (record: any) => (
                <Popconfirm
                    title="Are you sure delete from role?"
                    onConfirm={() => deleteRole(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                </Popconfirm>
            )
        }
    ]

    return (
        <div>
            <div className="flex justify-end mb-3"><Button type="primary" onClick={runSeed}>Run Seed</Button></div>
            <div className="bg-white p-4">
                <Table dataSource={listRole} columns={columns} rowKey="id" />
            </div>
            <Drawer
                title="User In Role"
                placement="right"
                closable={false}
                onClose={() => setDrawVisible(false)}
                visible={drawVisible}
                width={800}
            >
                <Table dataSource={listUser} columns={userColumns} rowKey="id" />
            </Drawer>
        </div>
    )
}

export default RoleList