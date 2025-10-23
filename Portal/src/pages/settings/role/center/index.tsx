import { apiUsersInRole } from "@/services/identity/role"
import { apiRemoveUserFromRole } from "@/services/identity/user"
import { apiAddUserToRole, apiStaffIdOptions } from "@/services/user"
import { DeleteOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons"
import { ActionType, ModalForm, PageContainer, ProColumns, ProFormSelect, ProTable } from "@ant-design/pro-components"
import { useParams } from "@umijs/max"
import { Button, message, Popconfirm } from "antd"
import { useRef, useState } from "react"

const RoleCenter: React.FC = () => {

    const { id } = useParams();
    const actionRef = useRef<ActionType>();
    const [open, setOpen] = useState<boolean>(false);

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
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            valueType: 'date',
            search: false
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
            title: 'Đơn vị',
            dataIndex: 'departmentName',
            search: false
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
    ];

    const onAddUserToRole = async (values: any) => {
        await apiAddUserToRole({ ...values, roleName: id });
        message.success("Thêm người dùng vào vai trò thành công");
        setOpen(false);
        actionRef.current?.reload();
    }

    return (
        <PageContainer extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProTable
                headerTitle={(
                    <ModalForm
                        onFinish={onAddUserToRole}
                        open={open} onOpenChange={setOpen} title="Thêm tài khoản vào vai trò" trigger={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Thêm tài khoản</Button>}>
                        <ProFormSelect name="userId" label="Tài khoản" rules={[
                            {
                                required: true
                            }
                        ]} request={apiStaffIdOptions} showSearch />
                    </ModalForm>
                )}
                actionRef={actionRef}
                request={(params) => apiUsersInRole({ ...params, roleName: id })}
                columns={columns} rowKey="id" search={{
                    layout: 'vertical'
                }} />
        </PageContainer>
    )
}

export default RoleCenter