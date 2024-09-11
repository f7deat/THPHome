import { apiHistoryList } from "@/services/onboard/history";
import { FileExcelOutlined } from "@ant-design/icons";
import { PageContainer, ProTable } from "@ant-design/pro-components"
import { Button } from "antd";

const OnboardHistoryPage: React.FC = () => {
    return (
        <PageContainer extra={(
            <Button type="primary" icon={<FileExcelOutlined />}>Xuất Excel</Button>
        )}>
            <ProTable
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
                        dataIndex: 'userName'
                    },
                    {
                        title: 'Họ và tên',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Thời gian',
                        dataIndex: 'createdDate',
                        valueType: 'dateTime',
                        search: false
                    },
                    {
                        title: 'Nội dung',
                        dataIndex: 'message'
                    }
                ]}
                request={apiHistoryList}
            />
        </PageContainer>
    )
}

export default OnboardHistoryPage;