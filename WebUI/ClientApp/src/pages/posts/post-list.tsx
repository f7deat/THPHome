import { Button, Empty, Input, message, Modal, Popconfirm, Space, Table, Tabs, Tag } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    FileExcelTwoTone,
    SearchOutlined
} from '@ant-design/icons';
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import IPost from "./interfaces/post-model";

const { TabPane } = Tabs;

export const PostList = () => {

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const type = searchParams.get("type");
    const [posts, setPosts] = useState();
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [importFile, setImportFile] = useState<any>();
    const [isModalImportVisible, setIsModalImportVisible] = useState(false)
    const [searchTerm, setSerchTerm] = useState<string>('');
    const [activeKey, setActiveKey] = useState<string>(type || '1');

    function bindData(response: any) {
        setPosts(response.data);
        setPagination(response.pagination);
        setLoading(false);
    }

    const initCallback = useCallback(() => {
        axios.get(`/api/post/get-list?pageIndex=1&pageSize=10&searchTerm=${searchTerm}&type=${activeKey}`).then(response => {
            bindData(response.data)
        })
    }, [searchTerm, activeKey])

    useEffect(() => {
        initCallback();
    }, [initCallback])

    const rowSelection = (e: any) => {
        console.log(e)
    }

    function remove(id: number) {
        axios.post(`/api/post/remove/${id}`).then(response => {
            if (response.data.succeeded) {
                message.success('succeeded!');
                initCallback();
            } else {
                message.error('error!');
            }
        })
    }

    const exportPost = async () => {
        let response = await axios({
            url: '/api/post/export',
            method: 'POST',
            responseType: 'blob'
        })
        if (response.data) {
            const type = response.headers['content-type']
            const blob = new Blob([response.data], { type: type, endings: 'native' })
            var url = URL.createObjectURL(blob);
            window.open(url)
        } else {
            message.error(response.data.error);
        }
    }

    const onTabChange = (activeKey: string) => {
        setActiveKey(activeKey);
    }

    const handleImport = () => {
        const formData = new FormData();
        formData.append('file', importFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('/api/post/import', formData, config).then(response => {
            if (response.data.succeeded) {
                setIsModalImportVisible(false);
            }
        })
    }

    function setActive(id: number) {
        axios.post(`/api/post/active/${id}`).then(response => {
            if (response.data.succeeded) {
                message.success(response.data.message)
                initCallback();
            } else {
                message.error(response.data.message)
            }
        })
    }

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        console.log(pagination)
        setLoading(true);
        axios.get(`/api/post/get-list?pageIndex=${pagination.current}&pageSize=${pagination.pageSize}&type=${activeKey}`).then(response => {
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
            render: (record: IPost) => <a href={`/post/${record.url}-${record.id}.html`}>{record.title}</a>
        },
        {
            title: 'Lượt xem',
            dataIndex: 'view'
        },
        {
            title: 'Trạng thái',
            render: (record: IPost) => (
                <Tag color={record.status == 1 ? 'cyan' : 'gold'} onClick={() => setActive(record.id || 0)}>
                    {record.status == 1 ? 'xuất bản' : 'chờ duyệt'}
                </Tag>
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
                    <Link to={`/admin/post/setting/${record.id}`}><Button type="primary" icon={<EditOutlined />}></Button></Link>
                    <Popconfirm
                        title="Are you sure to delete?"
                        onConfirm={() => remove(record.id || 0)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <div className="p-4 bg-white">
            <div className="flex justify-between mb-3">
                <Space>
                    <Input placeholder="Nhập từ khóa..." onChange={(e: any) => setSerchTerm(e.target.value)} />
                    <Button type="primary" icon={<SearchOutlined />} onClick={initCallback}>Tìm kiếm</Button>
                </Space>
                <Space>
                    <Link to="/admin/post/setting"><Button type="primary" icon={<PlusOutlined />}>Bài viết mới</Button></Link>
                    <Button icon={<FileExcelTwoTone />} onClick={exportPost}>Export</Button>
                    <Button type="primary" danger onClick={() => setIsModalImportVisible(true)}>Import</Button>
                </Space>
            </div>
            <Tabs defaultActiveKey={activeKey} onChange={onTabChange} activeKey={activeKey}>
                <TabPane tab="Mặc định" key="0">
                    <Table dataSource={posts}
                        columns={columns}
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                        }}
                        loading={loading}
                        rowKey="id"
                        pagination={pagination}
                        onChange={handleTableChange}
                    />
                </TabPane>
                <TabPane tab="Trang" key="1">
                    <Table dataSource={posts}
                        columns={columns}
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
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
                            ...rowSelection,
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
                            ...rowSelection,
                        }}
                        loading={loading}
                        rowKey="id"
                        pagination={pagination}
                        onChange={handleTableChange}
                    />
                </TabPane>
            </Tabs>

            <Modal title="Basic Modal" visible={isModalImportVisible} onOk={() => handleImport()} onCancel={() => setIsModalImportVisible(false)}>
                <Input type="file" onChange={(e: any) => setImportFile(e.target.files[0])} />
            </Modal>
        </div>
    )
}