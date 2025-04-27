import { PageContainer } from "@ant-design/pro-components"
import Board from "../components/board";
import { useModel, useRequest } from "@umijs/max";
import { apiTaskItemKanban } from "../services/task-item";

const Index: React.FC = () => {
    
    const { initialState } = useModel('@@initialState');
    const { data, loading } = useRequest(() => apiTaskItemKanban({ departmentId: initialState?.currentUser.departmentId }));

    return (
        <PageContainer loading={loading}>
            <Board data={data} />
        </PageContainer>
    )
}

export default Index;