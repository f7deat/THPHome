import { apiDepartmentUsers } from "@/services/department"
import { apiMyDepartment } from "@/services/user";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import { ProCard, ProTable } from "@ant-design/pro-components"
import { useModel, useRequest } from "@umijs/max";

const Department: React.FC = () => {

    const { initialState } = useModel('@@initialState');
    const { data } = useRequest(apiMyDepartment);

    return (
        <ProCard headerBordered title="Cùng đơn vị">
            <ProTable
                headerTitle={data?.name}
                ghost
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
                        title: 'Họ và tên',
                        dataIndex: 'name',
                        render: (dom, entity) => {
                            if (entity.gender === 0) {
                                return <><ManOutlined className="text-blue-500" /> {dom}</>
                            }
                            if (entity.gender === 1) {
                                return <><WomanOutlined className="text-red-500" /> {dom}</>
                            }
                            return dom;
                        }
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        valueType: 'text',
                    },
                    {
                        title: 'Số điện thoại',
                        dataIndex: 'phoneNumber',
                        valueType: 'text',
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
        </ProCard>
    )
}

export default Department