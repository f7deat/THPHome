import { PageContainer } from "@ant-design/pro-components"
import { Col, Row } from "antd";
import NotificationDashboard from "./dashboard/notification";

const OnboardDashboardPage: React.FC = () => {
    return (
        <PageContainer>
            <Row gutter={16}>
                <Col xs={12} md={8}>
                    <NotificationDashboard />
                </Col>
            </Row>
        </PageContainer>
    )
}

export default OnboardDashboardPage;