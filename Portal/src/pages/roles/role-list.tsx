import { Button, Drawer, message, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    FolderOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { request } from "@umijs/max";

const RoleList = () => {

    const [listRole, setListRole] = useState<any>([])
    const [drawVisible, setDrawVisible] = useState<boolean>(false)
    const [listUser, setListUser] = useState<any>([])

    useEffect(() => {
        request('role/get-list').then(response => {
            setListRole(response);
        })
    }, [])

    const deleteRole = (roleId: string) => {
        request(`role/delete/${roleId}`, {
            method: 'POST'
        }).then(response => {
            if (response.succeeded) {
                setListRole(listRole.filter((x: any) => x.id !== roleId))
                message.success('Succeeded!')
            }
        })
    }

    function drawListUserInRole(roleName: string) {
        request(`user/get-users-in-role/${roleName}`).then(response => {
            setListUser(response)
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