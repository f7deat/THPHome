import { CheckCircleOutlined, ExclamationCircleOutlined, LoadingOutlined, StopOutlined } from "@ant-design/icons";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useRequest } from "@umijs/max";
import { Statistic } from "antd";
import { apiTaskItemCount } from "../services/task-item";

const Index: React.FC = () => {

    const { data } = useRequest(apiTaskItemCount);

    return (
        <PageContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <ProCard>
                    <Statistic title="Tổng" value={data?.notStarted + data?.needsReview + data?.approved + data?.inProgress + data?.complete + data?.onHold + data?.overdue} />
                </ProCard>
                <ProCard>
                    <Statistic title="Chưa bắt đầu" value={data?.notStarted} />
                </ProCard>
                <ProCard>
                    <Statistic title="Chờ duyệt" value={data?.needsReview} />
                </ProCard>
                <ProCard>
                    <Statistic title="Đã duyệt" value={data?.approved} />
                </ProCard>
                <ProCard>
                    <Statistic title="Đang thực hiện" value={data?.inProgress} prefix={<LoadingOutlined className="text-blue-500" />} />
                </ProCard>
                <ProCard>
                    <Statistic title="Hoàn thành" value={data?.complete} prefix={<CheckCircleOutlined className="text-green-500" />} />
                </ProCard>
                <ProCard>
                    <Statistic title="Tạm dừng" value={data?.onHold} prefix={<StopOutlined className="text-yellow-500" />} />
                </ProCard>
                <ProCard>
                    <Statistic title="Quá hạn" value={data?.overdue} prefix={<ExclamationCircleOutlined className="text-red-500" />} />
                </ProCard>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProCard title="Khối lượng công việc" headerBordered>

                </ProCard>
                <ProCard title="Hoạt động gần đây" headerBordered>
                </ProCard>
            </div>
        </PageContainer>
    )
}

export default Index;