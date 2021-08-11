import { Card, Col, List, Row, Statistic } from "antd"
import React, { useEffect, useState } from "react"
import {
    ArrowDownOutlined,
    EyeOutlined
} from '@ant-design/icons';
import axios from "axios";

export const Dashboard = () => {
    const [postCount, setPostCount] = useState(0);
    const [postView, setPostView] = useState(0);
    const [posts, setPosts] = useState<any>([]);

    useEffect(() => {
        axios.get('/api/post/get-total').then(response => setPostCount(response.data));
        axios.get('/api/post/get-view').then(response => setPostView(response.data));
        axios.get('/api/post/get-list-popular').then(response => setPosts(response.data));
    }, [])

    return (
        <div>
            <Row gutter={16} className="mb-4">
                <Col span={6}>
                    <div className="bg-white rounded" style={{ marginBottom: 23 }}>
                        <Statistic
                            title="Lượt xem"
                            value={postView}
                            className="p-4"
                        />
                        <div className="border-t px-4 py-2">
                            Số bài viết: {postCount}
                        </div>
                    </div>
                    <div className="bg-white rounded">
                        <Statistic
                            title="Bình luận"
                            value={0}
                            className="p-4"
                        />
                        <div className="border-t px-4 py-2">
                            Đang chờ: 0
                        </div>
                    </div>
                </Col>
                <Col span={18}>
                    <Card title="Bài viết xem nhiều" className="p-0" bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}>
                        <List
                            dataSource={posts}
                            renderItem={(item: any) => (
                                <List.Item>
                                    <a href={`/post/${item.url}-${item.id}.html`} target="_blank" rel="noreferrer">{item.title}</a> - <span className="text-sm text-gray-400">{item.view} <EyeOutlined /></span>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}