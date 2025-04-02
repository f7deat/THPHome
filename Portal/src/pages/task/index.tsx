import { PageContainer } from "@ant-design/pro-components"
import { useState } from "react";
import Board from "./components/board";

const Index: React.FC = () => {
    
    const [tasks, setTasks] = useState<any>({
        todo: [
            { id: 1, title: "Task 1", description: "This is a todo task" },
            { id: 2, title: "Task 2", description: "Another todo task" },
        ],
        inProgress: [
            { id: 3, title: "Task 3", description: "This task is in progress" },
        ],
        completed: [
            { id: 4, title: "Task 4", description: "This task is completed" },
        ],
        canceled: [
            { id: 5, title: "Task 5", description: "This task was canceled" },
        ],
    });

    return (
        <PageContainer>
            <Board tasks={tasks} />
        </PageContainer>
    )
}

export default Index