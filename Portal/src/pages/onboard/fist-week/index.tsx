import { apiGetListAttendance } from "@/services/onboard/report";
import { PageContainer, ProTable } from "@ant-design/pro-components"

const FistWeekPage: React.FC = () => {
    return (
        <PageContainer>
            <ProTable
                request={apiGetListAttendance}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 40
                    },
                    {
                        title: 'Lớp',
                        dataIndex: 'className',
                        valueType: 'select',
                        fieldProps: {
                            options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
                        }
                    },
                    {
                        title: 'Mã sinh viên',
                        dataIndex: 'userName'
                    },
                    {
                        title: 'Họ và tên',
                        dataIndex: 'name',
                        search: false
                    },
                    {
                        title: 'Ngày học',
                        dataIndex: 'joiningDate',
                        valueType: 'date'
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'isTakeAttendance',
                        valueEnum: {
                            true: 'Đã điểm danh',
                            false: 'Chưa điểm danh'
                        }
                    },
                    {
                        title: 'Điểm danh lúc',
                        dataIndex: 'checkedDate',
                        valueType: 'dateTime',
                        search: false
                    },
                    {
                        title: 'Ca học',
                        dataIndex: 'timeMarker',
                        render: (dom) => dom === 'pm' ? 'Chiều' : 'Sáng',
                        search: false
                    }
                ]}
                search={{
                    layout: 'vertical'
                }}
            />
        </PageContainer>
    )
}

export default FistWeekPage;