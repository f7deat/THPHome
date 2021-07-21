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
                    <div className="bg-white rounded">
                        <Statistic
                            title="Total View"
                            value={postView}
                            className="p-4"
                        />
                        <div className="border-t px-4 py-2">
                            Total Post: {postCount}
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="bg-white rounded">
                        <Statistic
                            title="Idle"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                            className="p-4"
                        /><div className="border-t px-4 py-2">
                            Total Post: {postCount}
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="bg-white rounded">
                        <Statistic
                            title="Idle"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                            className="p-4"
                        /><div className="border-t px-4 py-2">
                            Total Post: {postCount}
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="bg-white rounded">
                        <Statistic
                            title="Idle"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                            className="p-4"
                        /><div className="border-t px-4 py-2">
                            Total Post: {postCount}
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Card title="Top View">
                        <List
                            bordered
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