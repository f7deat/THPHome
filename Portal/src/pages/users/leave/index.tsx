import { PageContainer } from "@ant-design/pro-components"
import LeaveRequest from "./components/request"
import RequestCount from "./components/request-count"
import { useAccess } from "@umijs/max"
import RequestDepartment from "./components/request-department"

const Index: React.FC = () => {

    const access = useAccess();

    return (
        <PageContainer>
            <RequestCount />
            {access.admin && <RequestDepartment />}
            {!access.admin && <LeaveRequest />}
        </PageContainer>
    )
}

export default Index