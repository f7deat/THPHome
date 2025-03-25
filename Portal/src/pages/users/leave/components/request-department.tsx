import { apiLeaveRequestCountByDepartment } from "@/services/leave"
import { ProTable } from "@ant-design/pro-components"

const RequestDepartment: React.FC = () => {
    return (
        <div>
            <ProTable
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: 'Đơn vị',
                        dataIndex: 'department',
                    },
                    {
                        title: 'Số đơn xin nghỉ',
                        dataIndex: 'count',
                        valueType: 'digit'
                    },
                    {
                        title: 'Số đơn đã duyệt',
                        dataIndex: 'approved',
                        valueType: 'digit'
                    },
                    {
                        title: 'Số đơn đã từ chối',
                        dataIndex: 'rejected',
                        valueType: 'digit'
                    },
                    {
                        title: 'Số đơn chờ duyệt',
                        dataIndex: 'pending',
                        valueType: 'digit'
                    }
                ]}
                request={apiLeaveRequestCountByDepartment}
                rowKey="id"
                search={false}
                pagination={{
                    pageSize: 10
                }}
                dateFormatter="string"
                headerTitle="Thống kê số lượt nghỉ theo đơn vị"
            />
        </div>
    )
}

export default RequestDepartment