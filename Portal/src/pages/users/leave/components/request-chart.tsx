import { apiLeaveRequestChart } from "@/services/leave"
import { ProCard } from "@ant-design/pro-components"
import { useRequest } from "@umijs/max"
import { Button, DatePicker, Space } from "antd"
import EChartsReact from "echarts-for-react"
import { useState } from "react"

const RequestChart: React.FC = () => {

    const [dateRange, setDateRange] = useState<string[]>([])

    const { data, loading, refresh } = useRequest(() => {
        if (dateRange.length === 2) {
            return apiLeaveRequestChart({
                fromDate: dateRange[0],
                toDate: dateRange[1]
            });
        }
        return apiLeaveRequestChart();
    })

    return (
        <div>
            <ProCard title="Thống kê" headerBordered className="mb-4" loading={loading}
                extra={(
                    <Space>
                        <DatePicker.RangePicker onChange={(values) => {
                            if (values && values.length === 2 && values[0] && values[1]) {
                                setDateRange([values[0].format('YYYY-MM-DD'), values[1].format('YYYY-MM-DD')]);
                            }
                        }} />
                        <Button type="primary" onClick={refresh}>Lọc</Button>
                    </Space>
                )}
            >
                <EChartsReact
                    option={{
                        xAxis: {
                            type: 'category',
                            data: data?.xAxis,
                            nameTruncate: {
                                maxWidth: 200
                            }
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
                                name: 'Số đơn xin nghỉ'
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