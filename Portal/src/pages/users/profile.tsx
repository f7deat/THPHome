import { Col, Row, Typography, Button, Avatar, Space, Tooltip, Divider, Upload, Empty } from "antd"
import {
    EditOutlined,
    RightOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useModel } from "@umijs/max";
import { Link } from "@umijs/max";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import ChangePassword from "./components/change-password";
import { apiChangeAvatar } from "@/services/user";

const Profile: React.FC = () => {

    const { initialState } = useModel('@@initialState');

    return (
        <PageContainer extra={<Link to={`/account/profile/edit/${initialState?.currentUser.id}`}><Button type="primary" icon={<EditOutlined />}>Chỉnh sửa</Button></Link>}>
            <Row gutter={16}>
                <Col md={6} xs={24}>
                    <ProCard className="mb-4">
                        <div className="flex items-center justify-center p-4 relative">
                            {
                                initialState?.currentUser?.avatar ? (
                                    <Avatar size={200} src={initialState?.currentUser?.avatar} />
                                ) : (
                                    <Avatar size={200} icon={<UserOutlined />} />
                                )
                            }
                            <Tooltip title="Chỉnh sửa ảnh đại diện">
                                <Upload className="absolute top-0 right-0"
                                showUploadList={false}
                                beforeUpload={async (file) => {
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    await apiChangeAvatar(formData);
                                    window.location.reload();
                                    return false;
                                }}
                                >
                                    <Button type="text" icon={<EditOutlined />} size="small">Thay đổi</Button>
                                </Upload>
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
                    <ProCard title="Hoạt động" headerBordered>
                        <div className="bg-white rounded">
                            <div className="px-4">
                                <Empty />
                            </div>
                        </div>
                    </ProCard>
                </Col>
            </Row>
        </PageContainer>
    )
}

export default Profile