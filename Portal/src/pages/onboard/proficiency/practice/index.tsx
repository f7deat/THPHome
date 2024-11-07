import { apiProficiencyBatchList } from "@/services/onboard/proficiency";
import { FolderOutlined } from "@ant-design/icons";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Link } from "@umijs/max";
import { Button, Tooltip } from "antd";

const Index: React.FC = () => {
    return (
        <PageContainer>
            <ProTable
                request={apiProficiencyBatchList}
                search={{
                    layout: 'vertical'
                }}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30,
                        align: 'center'
                    },
                    {
                        title: 'Đợt ôn luyện',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Ngày bắt đầu',
                        dataIndex: 'startDate',
                        valueType: 'date',
                        width: 120
                    },
                    {
                        title: 'Ngày kết thúc',
                        dataIndex: 'endDate',
                        valueType: 'date',
                        width: 120
                    },
                    {
                        title: 'Người tạo',
                        dataIndex: 'createdBy',
                        width: 120
                    },
                    {
                        title: 'Ngày tạo',
                        dataIndex: 'createdDate',
                        valueType: 'fromNow',
                        width: 120
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (dom, entity) => [
                            <Tooltip key="view" title="Xem chi tiết">
                                <Link to={`/onboard/proficiency/practice/batch/${entity.id}`}>
                                <Button type="primary" size="small" icon={<FolderOutlined />} />
                                </Link>
                            </Tooltip>
                        ],
                        width: 100
                    }
                ]}
            />
        </PageContainer>
    )
}

export default Index;