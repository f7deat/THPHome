import { Button, Drawer, message, Popconfirm } from "antd";
import React, { useRef, useState } from "react";
import {
    FolderOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Link, request } from "@umijs/max";
import { ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components";
import { apiRoleList } from "@/services/identity/role";

const RolePage = () => {

    const [drawVisible, setDrawVisible] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();

    const deleteRole = (roleId: string) => {
        request(`role/delete/${roleId}`, {
            method: 'POST'
        }).then(() => {
            message.success('Succeeded!');
            actionRef.current?.reload();
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
            title: 'Mô tả',
            dataIndex: 'displayName',
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
        <PageContainer>
            <ProTable
                actionRef={actionRef}
                request={apiRoleList} columns={columns} rowKey="id" search={{
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
        </PageContainer>
    )
}

export default RolePage