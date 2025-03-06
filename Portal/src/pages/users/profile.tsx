import { Col, Empty, Row, Table, Tabs, Typography, Button, Avatar, Space, Tooltip, Divider } from "antd"
import {
    EditOutlined,
    RightOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useModel } from "@umijs/max";
import { Link } from "@umijs/max";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import ChangePassword from "./components/change-password";

const { TabPane } = Tabs;

const Profile: React.FC = () => {

    const { initialState } = useModel('@@initialState');

    const columns = [
        {
            title: "Title",
            dataIndex: "title"
        },
        {
            title: 'Date',
            dataIndex: 'createdDate'
        }
    ]

    return (
        <PageContainer extra={<Link to={`/account/profile/edit/${initialState?.currentUser.id}`}><Button type="primary" icon={<EditOutlined />}>Chỉnh sửa</Button></Link>}>
            <Row gutter={16}>
                <Col md={6} xs={24}>
                    <ProCard className="mb-4">
                        <div className="flex items-center justify-center p-4 relative">
                            {
                                initialState?.currentUser?.avatar ? (
                                    <Avatar size={150} src={initialState?.currentUser?.avatar} />
                                ) : (
                                    <Avatar size={150} icon={<UserOutlined />} />
                                )
                            }
                            <Tooltip title="Chỉnh sửa ảnh đại diện" className="absolute right-0 bottom-0">
                                <Button type="text" className="absolute right-0 top-0" icon={<EditOutlined />} size="small" />
                            </Tooltip>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <Typography.Title level={3}>{initialState?.currentUser.name}</Typography.Title>
                            <div className="mb-4">{initialState?.currentUser.userName}</div>
                        </div>
                        <Space direction="vertical">
                            <div className="text-gray-400">Email: {initialState?.currentUser.email}</div>
                            <div className="text-gray-400">Điện thoại: {initialState?.currentUser.phoneNumber}</div>
                        </Space>
                        <Divider dashed orientation="left">Cài đặt</Divider>
                        <div>
                            <ChangePassword />
                            <li className="py-2 border-b border-dashed"><RightOutlined className="mr-2 text-gray-500" /><Link to={`/`}>Privacy Setting</Link></li>
                        </div>
                    </ProCard>
                </Col>
                <Col md={18} xs={24}>
                    <ProCard>
                        <div className="bg-white rounded">
                            <div className="px-4 py-2">
                                <Typography.Title level={4}>Hoạt động</Typography.Title>
                            </div>
                            <div className="px-4">
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Bài viết" key="1">
                                        <Table rowKey="id" columns={columns} pagination={{ pageSize: 5 }} />
                                    </TabPane>
                                    <TabPane tab="Comment" key="2">
                                        <Empty />
                                    </TabPane>
                                    <TabPane tab="History" key="3">
                                        <Empty />
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    </ProCard>
                </Col>
            </Row>


        </PageContainer>
    )
}

export default Profile