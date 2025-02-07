import { LeftOutlined } from "@ant-design/icons"
import { PageContainer } from "@ant-design/pro-components"
import { history } from "@umijs/max"
import { Button } from "antd"

const ContactStatusPage: React.FC = () => {
    return (
        <PageContainer extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>

        </PageContainer>
    )
}

export default ContactStatusPage;