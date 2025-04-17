import { PageContainer, ProCard } from "@ant-design/pro-components"
import { history, useParams, useRequest } from "@umijs/max"
import { apiTaskItemDetail } from "../services/task-item"
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const Index: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const { data } = useRequest(() => apiTaskItemDetail(id));

    return (
        <PageContainer title={data?.title} extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <div className="md:flex gap-4">
                <div className="md:w-2/3">
                    <ProCard title="Thông tin nhiệm vụ" className="mb-4" headerBordered>
                        <div dangerouslySetInnerHTML={{ __html: data?.content }}></div>
                    </ProCard>
                </div>
                <div className="md:w-1/3">
                    <ProCard title="Cài đặt" className="mb-4" headerBordered>
                    </ProCard>
                </div>
            </div>
        </PageContainer>
    )
}

export default Index