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
                    dataIndex: 'userName'
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
                        </div>
                    )

                },
                {
                    title: 'Email',
                    dataIndex: 'email'
                },
                {
                    title: 'Số điện thoại',
                    dataIndex: 'phoneNumber',
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