import { Button, Drawer, message, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import {
    FolderOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Link, request } from "@umijs/max";
import { ProColumns, ProTable } from "@ant-design/pro-components";

const RoleList = () => {

    const [listRole, setListRole] = useState<any>([])
    const [drawVisible, setDrawVisible] = useState<boolean>(false)

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

    const columns: ProColumns[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 30,
            align: 'center'
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Normalized Name',
            dataIndex: 'normalizedName',
            search: false
        },
        {
            title: 'Tác vụ',
            valueType: 'option',
            render: (_, record: any) => [
                <Link key="edit" to={`/settings/roles/center/${record.name}`}>
                    <Button type="primary" icon={<FolderOutlined />} size="small"></Button>
                </Link>,
                <Popconfirm
                    key="delete"
                    title="Are you sure to delete?"
                    onConfirm={() => deleteRole(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger icon={<DeleteOutlined />} size="small"></Button>
                </Popconfirm>
            ],
            width: 60
        }
    ];

    return (
        <div>
            <ProTable dataSource={listRole} columns={columns} rowKey="id" search={{
                layout: 'vertical'
            }} />
            <Drawer
                title="User In Role"
                placement="right"
                closable={false}
                onClose={() => setDrawVisible(false)}
                open={drawVisible}
                width={800}
            >
            </Drawer>
        </div>
    )
}

export default RoleList