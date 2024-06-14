import { Col, Empty, Row, Table, Tabs, Typography, Button, Avatar, Space } from "antd"
import React, { useEffect, useState } from "react";
import {
    StarOutlined,
    CommentOutlined,
    EditOutlined,
    UserOutlined
} from "@ant-design/icons";
import { request, useParams } from "@umijs/max";
import { Link } from "@umijs/max";
import { PageContainer, ProCard } from "@ant-design/pro-components";

const { TabPane } = Tabs;

const Profile = () => {

    const { id } = useParams();

    const [profile, setProfile] = useState<any>()
    const [postCount, setPostCount] = useState<number>(0)
    const [commentCount, setCommentCount] = useState<number>(0)

    useEffect(() => {
        request(`user/get/${id || ''}`).then(response => {
            setProfile(response);
            request(`post/get-count-in-user/${response.id}`).then(post => {
                setPostCount(post)
            })
            request(`comment/get-count-in-user/${response.id}`).then(response => {
                setCommentCount(response)
            })
        });
    }, [id])

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
        <PageContainer extra={<Link to={`/user/edit/${profile?.id}`}><Button type="primary" icon={<EditOutlined />}>Chỉnh sửa</Button></Link>}>
            <Row gutter={16}>
                <Col md={6}>
                    <ProCard className="mb-4">
                        <div className="flex items-center justify-center p-4">
                            {
                                profile?.avatar ? (
                                    <Avatar size={150} src={profile?.avatar} />
                                ) : (
                                    <Avatar size={150} icon={<UserOutlined />} />
                                )
                            }
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <Typography.Title level={3}>{profile?.name}</Typography.Title>
                            <div className="mb-4">{profile?.userName}</div>
                        </div>
                        <Space direction="vertical">
                            <div className="text-gray-400">Email: {profile?.email}</div>
                            <div className="text-gray-400">Chức vụ:</div>
                        </Space>
                    </ProCard>
                </Col>
                <Col md={18}>
                    <ProCard>
                        <div className="bg-white rounded mb-4">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <ProCard className="p-4 bg-gray-100 rounded" bordered>
                                        <div className="flex items-center">
                                            <CommentOutlined className="text-blue-400 text-xl px-2" />
                                            <div className="flex-grow px-2">
                                                <div className="text-gray-400">Comment</div>
                                                <div className="font-bold text-lg">{commentCount}</div>
                                            </div>
                                        </div>
                                    </ProCard>
                                </Col>
                                <Col span={8}>
                                    <ProCard className="p-4 bg-gray-100 rounded" bordered>
                                        <div className="flex items-center">
                                            <StarOutlined className="text-yellow-400 text-xl px-2" />
                                            <div className="flex-grow px-2">
                                                <div className="text-gray-400">Bài viết</div>
                                                <div className="font-bold text-lg">{postCount}</div>
                                            </div>
                                        </div>
                                    </ProCard>
                                </Col>
                            </Row>
                        </div>
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