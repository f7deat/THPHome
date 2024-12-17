import { ArrowRightOutlined, MailOutlined, MessageOutlined } from "@ant-design/icons";
import { PageContainer, ProCard } from "@ant-design/pro-components"
import { Link } from "@umijs/max";
import { Col, Row, Tooltip } from "antd";

const ToolPage: React.FC = () => {
    return (
        <PageContainer>
            <Row gutter={16}>
                <Col md={6} xs={12}>
                    <ProCard
                        actions={[
                            <Tooltip title="Soạn Email" key="email">
                                <Link to='/tool/email'>
                                    <ArrowRightOutlined />
                                </Link>
                            </Tooltip>
                        ]} title="Email" headerBordered>
                        <div className="flex gap-4">
                            <div className="w-16">
                                <div className="flex items-center justify-center shadow h-16 w-16 rounded-full bg-red-500 text-white">
                                    <MailOutlined className="text-2xl" />
                                </div>
                            </div>
                            <div className="text-gray-500 flex-1">Gửi Email hàng loạt tới người dùng</div>
                        </div>
                    </ProCard>
                </Col>
                <Col md={6} xs={12}>
                    <ProCard
                        actions={[
                            <Tooltip title="Gửi thông báo" key="notification">
                                <Link to='/tool/notification'>
                                    <ArrowRightOutlined />
                                </Link>
                            </Tooltip>
                        ]} title="Notification" headerBordered>
                        <div className="flex gap-4">
                            <div className="w-16">
                                <div className="flex items-center justify-center shadow h-16 w-16 rounded-full bg-blue-500 text-white">
                                    <MessageOutlined className="text-2xl" />
                                </div>
                            </div>
                            <div className="text-gray-500 flex-1">Gửi Thông báo tới người dùng</div>
                        </div>
                    </ProCard>
                </Col>
            </Row>
        </PageContainer>
    )
}

export default ToolPage;