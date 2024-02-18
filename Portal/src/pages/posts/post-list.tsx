import { Button, Empty, Input, message, Modal, Popconfirm, Space, Table, Tabs, Tag } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import moment from "moment";
import IPost from "./interfaces/post-model";
import Tooltip from "antd/es/tooltip";
import { Link, request, useIntl, useParams, useSearchParams } from "@umijs/max";
import { language } from "@/utils/format";
import { PageContainer, ProCard } from "@ant-design/pro-components";

const { TabPane } = Tabs;

const PostList = () => {

    const [posts, setPosts] = useState();
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchTerm, setSerchTerm] = useState<string>('');
    const [activeKey, setActiveKey] = useState<string>('1');
    const intl = useIntl();

    function bindData(response: any) {
        setPosts(response.data);
        setPagination(response.pagination);
        setLoading(false);
    }

    const initCallback = useCallback(() => {
        request(`post/get-list?pageIndex=1&pageSize=10&searchTerm=${searchTerm}&type=${activeKey}&language=${language(intl.locale)}`).then(response => {
            bindData(response)
        })
    }, [searchTerm, activeKey])

    useEffect(() => {
        initCallback();
    }, [initCallback])

    function remove(id: number) {
        request(`post/remove/${id}`, {
            method: 'POST'
        }).then(response => {
            if (response.succeeded) {
                message.success('succeeded!');
                initCallback();
            } else {
                message.error('error!');
            }
        })
    }

    const onTabChange = (activeKey: string) => {
        setActiveKey(activeKey);
    }

    function setActive(id: number) {
        request(`post/active/${id}`, {
            method: 'POST'
        }).then(response => {
            if (response.succeeded) {
                message.success(response.message)
                initCallback();
            } else {
                message.error(response.message)
            }
        })
    }

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        setLoading(true);
        request(`post/get-list?pageIndex=${pagination.current}&pageSize=${pagination.pageSize}&type=${activeKey}`).then(response => {
            bindData(response.data);
        });
    }

    const columns = [
        {
            title: 'STT',
            render: (text: string, record: IPost, index: number) => index + 1
        },
        {
            title: 'Tiêu đề',
            render: (record: IPost) => <a href={`https://dhhp.edu.vn/post/${record.url}-${record.id}.html`} target="_blank" rel="noreferrer">{record.title}</a>
        },
        {
            title: 'Lượt xem',
            dataIndex: 'view'
        },
        {
            title: 'Trạng thái',
            render: (record: IPost) => (
                <Tooltip title="Nhấp để chuyển trạng thái">
                    <Tag color={record.status === 1 ? 'cyan' : 'gold'} onClick={() => setActive(record.id || 0)} style={{
                        cursor: 'pointer'
                    }}>
                        {record.status === 1 ? 'xuất bản' : 'chờ duyệt'}
                    </Tag>
                </Tooltip>
            )
        },
        {
            title: 'Ngày xuất bản',
            dataIndex: 'modifiedDate',
            render: (text: Date) => moment(text).format('DD/MM/YYYY hh:mm:ss')
        },
        {
            title: '',
            render: (record: IPost) => (
                <Space>
                    <Link to={`/post/setting/${record.id}`}><Button type="primary" size="small" icon={<EditOutlined />}></Button></Link>
                    <Popconfirm
                        title="Are you sure to delete?"
                        onConfirm={() => remove(record.id || 0)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" size="small" danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <PageContainer extra={<Link to="/post/setting"><Button type="primary" icon={<PlusOutlined />}>Bài viết mới</Button></Link>}>
            <ProCard>
                <Tabs defaultActiveKey={activeKey} onChange={onTabChange} activeKey={activeKey} type="card"
                    tabBarExtraContent={<Space>
                        <Input placeholder="Nhập từ khóa..." onChange={(e: any) => setSerchTerm(e.target.value)} />
                        <Button type="primary" icon={<SearchOutlined />} onClick={initCallback}>Tìm kiếm</Button>
                    </Space>}>
                    <TabPane tab="Trang" key="1">
                        <Table dataSource={posts}
                            columns={columns}
                            rowSelection={{
                                type: 'checkbox',
                            }}
                            loading={loading}
                            rowKey="id"
                            pagination={pagination}
                            onChange={handleTableChange}
                        />
                    </TabPane>
                    <TabPane tab="Tin tức" key="2">
                        <Table dataSource={posts}
                            columns={columns}
                            rowSelection={{
                                type: 'checkbox',
                            }}
                            loading={loading}
                            rowKey="id"
                            pagination={pagination}
                            onChange={handleTableChange}
                        />
                    </TabPane>
                    <TabPane tab="Thông báo" key="3">
                        <Table dataSource={posts}
                            columns={columns}
                            rowSelection={{
                                type: 'checkbox',
                            }}
                            loading={loading}
                            rowKey="id"
                            pagination={pagination}
                            onChange={handleTableChange}
                        />
                    </TabPane>
                </Tabs>
            </ProCard>
        </PageContainer>
    )
}

export default PostList