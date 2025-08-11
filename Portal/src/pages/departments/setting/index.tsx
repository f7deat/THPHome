import { LeftOutlined } from "@ant-design/icons";
import { PageContainer, ProCard } from "@ant-design/pro-components"
import { Button } from "antd";
import { history } from "@umijs/max";

const Index: React.FC = () => {
    return (
        <PageContainer extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <div className="md:flex gap-4">
                <div className="md:w-96">
                    <ProCard title="Logo" headerBordered>
                        
                    </ProCard>
                </div>
                <div className="flex-1">
                    <ProCard title="Thông tin" headerBordered>
                    </ProCard>
                </div>
            </div>
        </PageContainer>
    )
}

export default Index;