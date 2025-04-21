import { PageContainer } from "@ant-design/pro-components"
import { Segmented } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import TaskTable from "./components/table";
import { history } from "@umijs/max";

const Index: React.FC = () => {

    return (
        <PageContainer extra={(
            <Segmented
                defaultValue="List"
                options={[
                    { value: 'List', icon: <BarsOutlined /> },
                    { value: 'Kanban', icon: <AppstoreOutlined /> },
                ]}
                onChange={(value) => {
                    if (value === 'List') {
                        history.push('/task/board');
                    } else {
                        history.push('/task/kanban');
                    }
                }}
            />
        )}>
            <TaskTable />
        </PageContainer>
    )
}

export default Index