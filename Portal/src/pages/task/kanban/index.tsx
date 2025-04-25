import { PageContainer } from "@ant-design/pro-components"
import Board from "../components/board";

const Index: React.FC = () => {
    return (
        <PageContainer>
            <Board tasks={{
                inProgress: [],
                canceled: [],
                completed: [],
                todo: []
            }} />
        </PageContainer>
    )
}

export default Index;