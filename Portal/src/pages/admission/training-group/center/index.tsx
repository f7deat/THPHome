import { apiGetListMajor } from "@/services/admission/major";
import { LeftOutlined } from "@ant-design/icons";
import { PageContainer, ProTable } from "@ant-design/pro-components"
import { useParams } from "@umijs/max"
import { Button } from "antd";

const TrainingGroupCenter: React.FC = () => {

    const { id } = useParams<{ id: string }>();

    return (
        <PageContainer extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProTable
                request={(params) => apiGetListMajor({
                    ...params,
                    trainingGroupId: id
                })}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: 'Tên chuyên ngành',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Mô tả',
                        dataIndex: 'description',
                        search: false
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'active',
                        render: (_, record) => record.active ? 'Đang hoạt động' : 'Ngưng hoạt động',
                        width: 100,
                        search: false,
                        align: 'center'
                    },
                    {
                        title: 'SL nghành',
                        dataIndex: 'studentCount',
                        align: 'center',
                        width: 100,
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

export default TrainingGroupCenter