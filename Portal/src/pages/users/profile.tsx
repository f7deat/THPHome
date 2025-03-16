import { Col, Row, Typography, Button, Avatar, Space, Tooltip, Divider, Upload, Empty } from "antd"
import {
    EditOutlined,
    EyeOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useModel } from "@umijs/max";
import { Link } from "@umijs/max";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import ChangePassword from "./components/change-password";
import { apiChangeAvatar } from "@/services/user";
import PrivacySetting from "./components/privacy-setting";
import Department from "./profile/components/department";

const Profile: React.FC = () => {

    const { initialState } = useModel('@@initialState');

    return (
        <PageContainer extra={<Link to={`/account/profile/edit/${initialState?.currentUser.id}`}><Button type="primary" icon={<EditOutlined />}>Chỉnh sửa</Button></Link>}>
            <Row gutter={16}>
                <Col md={6} xs={24}>
                    <ProCard className="mb-4"
                        actions={[
                        <Link to={`/account/profile/edit/${initialState?.currentUser.id}`} key="edit"><EditOutlined className="mr-2" />Chỉnh sửa</Link>,
                        <a href={`https://next.dhhp.edu.vn/profile/${initialState?.currentUser?.userName}`} rel="noreferrer" key="privacy" target="_blank"><EyeOutlined className="mr-2" />Xem hồ sơ</a>,
                    ]}
                        title="Thông tin cá nhân" headerBordered>
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
                            <div className="text-gray-600"><MailOutlined className="mr-2" />{initialState?.currentUser.email}</div>
                            <div className="text-gray-600"><PhoneOutlined className="mr-2" />{initialState?.currentUser.phoneNumber}</div>
                        </Space>
                        <Divider dashed orientation="left">Cài đặt</Divider>
                        <div>
                            <PrivacySetting />
                            <ChangePassword />
                        </div>
                    </ProCard>
                </Col>
                <Col md={18} xs={24}>
                    <ProCard title="Hoạt động" headerBordered className="mb-4">
                        <div className="bg-white rounded">
                            <div className="px-4">
                                <Empty />
                            </div>
                        </div>
                    </ProCard>
                    <Department />
                </Col>
            </Row>
        </PageContainer>
    )
}

export default Profile