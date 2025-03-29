import { PageContainer } from "@ant-design/pro-components"
import LeaveRequest from "./components/request"
import RequestCount from "./components/request-count"
import { useAccess } from "@umijs/max"
import RequestDepartment from "./components/request-department"
import RequestChart from "./components/request-chart"
import { Button, DatePicker, Form } from "antd"
import { useState } from "react"
import dayjs from "dayjs"
import { FilterOutlined } from "@ant-design/icons"

const Index: React.FC = () => {

    const access = useAccess();
    const [dateRange, setDateRange] = useState<string[]>([]);

    return (
        <PageContainer extra={(
            <Form layout="inline" onFinish={(values) => {
                if (values.dateRanger && values.dateRanger.length === 2 && values.dateRanger[0] && values.dateRanger[1]) {
                    setDateRange([values.dateRanger[0].format('YYYY-MM-DD'), values.dateRanger[1].format('YYYY-MM-DD')]);
                }
            }}>
                <Form.Item name="dateRanger" label="Thời gian" style={{ marginBottom: 0 }} initialValue={[dayjs(), dayjs()]}>
                    <DatePicker.RangePicker allowClear={false} />
                </Form.Item>
                <Button type="primary" icon={<FilterOutlined />} htmlType="submit">Lọc</Button>
            </Form>
        )}>
            <RequestCount />
            {access.admin && (
                <>
                    <RequestChart dateRange={dateRange} />
                    <RequestDepartment dateRange={dateRange} />
                </>
            )}
            <LeaveRequest />
        </PageContainer>
    )
}

export default Index