import { PageContainer } from "@ant-design/pro-components"
import { Button, Space } from "antd";
import { TableOutlined } from "@ant-design/icons";
import TaskTable from "./components/table";

const Index: React.FC = () => {

    return (
        <PageContainer extra={(
            <Space>
                <Button icon={<TableOutlined />} />
            </Space>
        )}>
            <TaskTable />
        </PageContainer>
    )
}

export default Index