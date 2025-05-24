import { PageContainer } from "@ant-design/pro-components"
import { Alert} from "antd"

const Index: React.FC = () => {

    return (
        <PageContainer>
            <Alert type="info" message={<div>Đăng ký nghỉ phép được chuyển qua <a href="https://office.dhhp.edu.vn" target="_blank" className="font-bold text-blue-500">office.dhhp.edu.vn</a></div>} showIcon />
        </PageContainer>
    )
}

export default Index