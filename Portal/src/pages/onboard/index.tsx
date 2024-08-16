import { apiProgramListApproval } from "@/services/onboard/program";
import { PageContainer, ProTable } from "@ant-design/pro-components"

const OnboardPage: React.FC = () => {
    return (
        <PageContainer>
            <ProTable
                request={apiProgramListApproval}
            />
        </PageContainer>
    )
}

export default OnboardPage;