import { apiDepartmentUsers } from "@/services/department"
import { apiMyDepartment } from "@/services/user";
import { MailOutlined, ManOutlined, PhoneOutlined, WomanOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components"
import { useModel, useRequest } from "@umijs/max";

const DepartmentUsers: React.FC = () => {

    const { initialState } = useModel('@@initialState');
    const { data } = useRequest(apiMyDepartment);

    return (
        <ProTable
            headerTitle={data?.name}
            search={false}
            columns={[
                {
                    title: '#',
                    dataIndex: 'avatar',
                    valueType: 'avatar',
                    width: 30,
                    align: 'center'
                },
                {
                    title: 'Tài khoản',
                    dataIndex: 'userName',
                    render: (dom, entity) => (
                        <div>
                            <div className="text-blue-500">
                                {entity.gender === 1 ? <ManOutlined className="text-blue-500 mr-1" /> : <WomanOutlined className="text-red-500 mr-1" />}
                                {entity.name}
                            </div>
                            <div className="text-gray-500">{entity.userName}</div>
                        </div>
                    )

                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                    valueType: 'text',
                    render: (dom, entity) => (
                        <div>
                            <div className="text-slate-900"><MailOutlined /> {entity.email}</div>
                            <div className="text-slate-900"><PhoneOutlined /> {entity.phoneNumber}</div>
                        </div>
                    )
                }
            ]}
            request={(params) => apiDepartmentUsers({
                ...params,
                code: initialState?.currentUser?.departmentId
            })}
            pagination={{
                pageSize: 5
            }}
        />
    )
}

export default DepartmentUsers