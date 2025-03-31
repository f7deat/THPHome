import { apiUsersInRole } from "@/services/identity/role"
import { apiRemoveUserFromRole } from "@/services/identity/user"
import { DeleteOutlined, LeftOutlined } from "@ant-design/icons"
import { ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components"
import { useParams } from "@umijs/max"
import { Button, message, Popconfirm } from "antd"
import { useRef } from "react"

const RoleCenter: React.FC = () => {

    const { id } = useParams();
    const actionRef = useRef<ActionType>();

    const onRemoveFromRole = async (userId: string) => {
        await apiRemoveUserFromRole({ userId, roleName: id });
        message.success("Xóa người dùng khỏi vai trò thành công");
        actionRef.current?.reload();
    }

    const columns: ProColumns[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 30
        },
        {
            title: 'Tài khoản',
            dataIndex: 'userName',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
        },
        {
            title: 'Tác vụ',
            valueType: 'option',
            render: (_, entity) => [
                <Popconfirm
                    key="delete"
                    title="Are you sure delete from role?"
                    onConfirm={() => onRemoveFromRole(entity.id)}
                >
                    <Button type="primary" danger icon={<DeleteOutlined />} size="small"></Button>
                </Popconfirm>
            ],
            width: 60
        }
    ]

    return (
        <PageContainer extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProTable
                actionRef={actionRef}
                request={(params) => apiUsersInRole({ ...params, roleName: id })}
                columns={columns} rowKey="id" search={{
                    layout: 'vertical'
                }} />
        </PageContainer>
    )
}

export default RoleCenter