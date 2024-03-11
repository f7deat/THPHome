import { Col, Empty, Row, Table, Tabs, Typography, Image, Button, Statistic } from "antd"
import React, { useEffect, useState } from "react";
import {
    StarOutlined,
    CommentOutlined,
    EditOutlined
} from "@ant-design/icons";
import { request, useParams } from "@umijs/max";
import { Link } from "@umijs/max";
import { PageContainer, ProCard } from "@ant-design/pro-components";

const { TabPane } = Tabs;

const Profile = () => {

    const { id } = useParams();

    const [profile, setProfile] = useState<any>()
    const [postCount, setPostCount] = useState<number>(0)
    const [listPost, setListPost] = useState<any>([])
    const [commentCount, setCommentCount] = useState<number>(0)

    useEffect(() => {
        request(`user/get/${id || ''}`).then(response => {
            setProfile(response);
            request(`post/get-count-in-user/${response.id}`).then(post => {
                setPostCount(post)
            })
            request(`post/list-in-user/${response.id}`).then(response => {
                setListPost(response)
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
        <PageContainer extra={<Link to={`/users/edit/${profile?.id}`}><Button type="primary" icon={<EditOutlined />}>Chỉnh sửa</Button></Link>}>
            <ProCard className="mb-4">
                <div className="h-40 bg-white rounded">
                    <div className="flex justify-end">

                    </div>
                </div>
                <div className="absolute flex items-center" style={{ top: '5rem', left: '3rem' }}>
                    <div className="mr-2">
                        <Image width={150} src={profile?.avatar} className="rounded-full" />
                    </div>
                    <div>
                        <div className="font-bold text-lg">{profile?.email}</div>
                        <div className="text-gray-400">UX/UI Desinger</div>
                        <div className="text-gray-400">Join January 2021</div>
                    </div>
                </div>
            </ProCard>
            <ProCard>
                <Row gutter={16}>
                    <Col span={12}>
                        <div className="bg-white rounded">
                            <div className="px-4 py-2">
                                <Typography.Title level={4}>Activity</Typography.Title>
                            </div>
                            <div className="px-4">
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Post" key="1">
                                        <Table dataSource={listPost} rowKey="id" columns={columns} pagination={{ pageSize: 5 }} />
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
                    </Col>
                    <Col span={12}>
                        <div className="bg-white rounded p-4">
                            <Row gutter={16}>
                                <Col span={12}>
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
                                <Col span={12}>
                                    <ProCard className="p-4 bg-gray-100 rounded" bordered>
                                        <div className="flex items-center">
                                            <StarOutlined className="text-yellow-400 text-xl px-2" />
                                            <div className="flex-grow px-2">
                                                <div className="text-gray-400">Post</div>
                                                <div className="font-bold text-lg">{postCount}</div>
                                            </div>
                                        </div>
                                    </ProCard>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </ProCard>
        </PageContainer>
    )
}

export default Profile