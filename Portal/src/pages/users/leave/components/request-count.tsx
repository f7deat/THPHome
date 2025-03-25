import { apiLeaveRequestCount } from "@/services/leave";
import { ProCard } from "@ant-design/pro-components";
import { useRequest } from "@umijs/max";
import { Statistic } from "antd";

const RequestCount: React.FC = () => {

    const { data, loading } = useRequest(apiLeaveRequestCount);

    return (
        <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <ProCard loading={loading}>
                <Statistic title="Số đơn xin nghỉ phép" value={data?.total} />
            </ProCard>
            <ProCard loading={loading}>
                <Statistic title="Chờ phê duyệt" value={data?.pending} />
            </ProCard>
            <ProCard loading={loading}>
                <Statistic title="Đã phê duyệt" value={data?.approved} />
            </ProCard>
            <ProCard loading={loading}>
                <Statistic title="Đã từ chối" value={data?.reject} />
            </ProCard>
        </div>
    )
}

export default RequestCount;