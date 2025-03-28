import { apiLeaveRequestCountByDepartment } from "@/services/leave"
import { EyeOutlined } from "@ant-design/icons"
import { ActionType, ProTable } from "@ant-design/pro-components"
import { Button } from "antd"
import { useEffect, useRef, useState } from "react"
import DetailByDepartment from "./detail-by-department"

type Props = {
    dateRange: string[];
}

const RequestDepartment: React.FC<Props> = ({ dateRange }) => {

    const [department, setDepartment] = useState<any>([])
    const [open, setOpen] = useState(false);
    const actionRef = useRef<ActionType>();

    useEffect(() => {
        actionRef.current?.reload();
    }, [dateRange]);

    return (
        <div>
            <ProTable
                actionRef={actionRef}
                scroll={{
                    x: true
                }}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: 'Đơn vị',
                        dataIndex: 'departmentName',
                        minWidth: 200,
                    },
                    {
                        title: 'Xin nghỉ',
                        dataIndex: 'count',
                        valueType: 'digit'
                    },
                    {
                        title: 'Đã duyệt',
                        dataIndex: 'approved',
                        valueType: 'digit'
                    },
                    {
                        title: 'Từ chối',
                        dataIndex: 'rejected',
                        valueType: 'digit'
                    },
                    {
                        title: 'Chờ duyệt',
                        dataIndex: 'pending',
                        valueType: 'digit'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button type="primary" key="view" icon={<EyeOutlined />} size="small" onClick={() => {
                                setDepartment(record);
                                setOpen(true)
                            }} />
                        ],
                        width: 60
                    }
                ]}
                request={(params) => apiLeaveRequestCountByDepartment({
                    ...params,
                    fromDate: dateRange[0],
                    toDate: dateRange[1]
                })}
                rowKey="id"
                search={false}
                dateFormatter="string"
                headerTitle="Thống kê số lượt nghỉ theo đơn vị"
            />
            <DetailByDepartment open={open} onClose={() => setOpen(false)} deparment={department} dateRange={dateRange} />
        </div>
    )
}

export default RequestDepartment