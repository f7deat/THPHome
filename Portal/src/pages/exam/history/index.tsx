import { apiListExamLog } from "@/services/exam/user";
import { PageContainer, ProTable } from "@ant-design/pro-components"

const ExamHistoryPage : React.FC = () => {
    return (
        <PageContainer>
            <ProTable 
                request={apiListExamLog}
                search={{
                    layout: 'vertical'
                }}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 40
                    },
                    {
                        title: 'Mã sinh viên',
                        dataIndex: 'userName',
                        width: 120,
                        search: false
                    },
                    {
                        title: 'Họ và tên',
                        dataIndex: 'name',
                        search: false
                    },
                    {
                        title: 'Thời gian',
                        dataIndex: 'createdDate',
                        valueType: 'dateTime',
                        width: 150,
                        search: false
                    },
                    {
                        title: 'Nội dung',
                        dataIndex: 'message'
                    }
                ]}
            />
        </PageContainer>
    )
}

export default ExamHistoryPage;