import { apiListExam } from "@/services/exam/exam";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { PageContainer, ProTable } from "@ant-design/pro-components"
import { Button, Popconfirm } from "antd";

const ExamPage: React.FC = () => {
    return (
        <PageContainer>
            <ProTable
                request={apiListExam}
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
                        title: 'Kỳ thi',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Ngày tạo',
                        dataIndex: 'createdDate',
                        valueType: 'dateTime',
                        width: 150
                    },
                    {
                        title: 'Ngày bắt đầu',
                        dataIndex: 'startDate',
                        valueType: 'dateTime',
                        width: 150
                    },
                    {
                        title: 'Ngày kết thúc',
                        dataIndex: 'endDate',
                        valueType: 'dateTime',
                        width: 150
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'active',
                        valueEnum: {
                            true: {
                                text: 'Active',
                                status: 'Processing'
                            },
                            false: {
                                text: 'Draft',
                                status: 'Default'
                            }
                        },
                        width: 100
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: () => [
                            <Button type="primary" size="small" icon={<CheckOutlined />} key="active" />,
                            <Popconfirm key="delete" title="Xác nhận xóa?">
                                <Button type="primary" size="small" icon={<DeleteOutlined />} danger />
                            </Popconfirm>
                        ],
                        width: 80
                    }
                ]}
            />
        </PageContainer>
    )
}

export default ExamPage;