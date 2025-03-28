import { apiLeaveRequestChart } from "@/services/leave"
import { ProCard } from "@ant-design/pro-components"
import { useRequest } from "@umijs/max"
import EChartsReact from "echarts-for-react"
import { useEffect } from "react"

type Props = {
    dateRange: string[]
}

const RequestChart: React.FC<Props> = ({ dateRange }) => {

    const { data, loading, refresh } = useRequest(() => {
        if (dateRange.length === 2) {
            return apiLeaveRequestChart({
                fromDate: dateRange[0],
                toDate: dateRange[1]
            });
        }
        return apiLeaveRequestChart();
    });

    useEffect(() => {
        refresh();
    }, [dateRange]);

    console.log(loading);

    return (
        <div>
            <ProCard title="Thống kê" headerBordered className="mb-4 min-h-[420px]" loading={loading}>
                <EChartsReact
                    option={{
                        xAxis: {
                            type: 'category',
                            data: data?.xAxis
                        },
                        grid: {
                            left: 30,
                            top: 30,
                            right: 0,
                            bottom: 30
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                data: data?.series,
                                type: 'bar',
                                name: 'Số đơn xin nghỉ',
                                barWidth: 50,
                            }
                        ],
                        tooltip: {}
                    }}
                    style={{
                        height: 350
                    }}
                />
            </ProCard>
        </div>
    )
}

export default RequestChart