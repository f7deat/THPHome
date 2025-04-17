import { CheckCircleOutlined, ExclamationCircleOutlined, LoadingOutlined, StopOutlined } from "@ant-design/icons";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Statistic } from "antd";

const Index: React.FC = () => {
    return (
        <PageContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <ProCard>
                    <Statistic title="Tổng" value={0} />
                </ProCard>
                <ProCard>
                    <Statistic title="Chưa bắt đầu" value={0} />
                </ProCard>
                <ProCard>
                    <Statistic title="Chờ duyệt" value={0} />
                </ProCard>
                <ProCard>
                    <Statistic title="Đã duyệt" value={0} />
                </ProCard>
                <ProCard>
                    <Statistic title="Đang thực hiện" value={0} prefix={<LoadingOutlined className="text-blue-500" />} />
                </ProCard>
                <ProCard>
                    <Statistic title="Hoàn thành" value={0} prefix={<CheckCircleOutlined className="text-green-500" />} />
                </ProCard>
                <ProCard>
                    <Statistic title="Tạm dừng" value={0} prefix={<StopOutlined className="text-yellow-500" />} />
                </ProCard>
                <ProCard>
                    <Statistic title="Quá hạn" value={0} prefix={<ExclamationCircleOutlined className="text-red-500" />} />
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