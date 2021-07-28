import { Button, Empty, Input, message, Modal, Popconfirm, Space, Table, Tabs } from "antd";
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
import { Link } from "react-router-dom";
import IPost from "./interfaces/post-model";

const { TabPane } = Tabs;

export const PostList = () => {

    const [posts, setPosts] = useState();
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [importFile, setImportFile] = useState<any>();
    const [isModalImportVisible, setIsModalImportVisible] = useState(false)
    const [searchTerm, setSerchTerm] = useState<string>('')

    function bindData(response: any) {
        setPosts(response.data);
        setPagination(response.pagination);
        setLoading(false);
    }

    const initCallback = useCallback(() => {
        axios.get(`/api/post/get-list?pageIndex=1&pageSize=10&searchTerm=${searchTerm}`).then(response => {
            bindData(response.data)
        })
    }, [searchTerm])

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

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        console.log(pagination)
        setLoading(true);
        axios.get(`/api/post/get-list?pageIndex=${pagination.current}&pageSize=${pagination.pageSize}`).then(response => {
            bindData(response.data);
        });
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

    const columns = [
        {
            title: 'Id',
            render: (text: string, record: IPost, index: number) => index + 1
        },
        {
            title: 'Title',
            render: (record: IPost) => <a href={`/post/${record.url}-${record.id}.html`}>{record.title}</a>
        },
        {
            title: 'View',
            dataIndex: 'view'
        },
        {
            title: 'Last modified',
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
                    <Input placeholder="input keyword..." onChange={(e: any) => setSerchTerm(e.target.value)} />
                    <Button type="primary" icon={<SearchOutlined />} onClick={initCallback}>Search</Button>
                </Space>
                <Space>
                    <Link to="/admin/post/setting"><Button type="primary" icon={<PlusOutlined />}>New Post</Button></Link>
                    <Button icon={<FileExcelTwoTone />} onClick={exportPost}>Export</Button>
                    <Button type="primary" danger onClick={() => setIsModalImportVisible(true)}>Import</Button>
                </Space>
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Default" key="1">
                    <Table dataSource={posts}
                        columns={columns}
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                        }}
                        loading={loading}
                        rowKey="id"
                        onChange={handleTableChange}
                        pagination={pagination}
                    />
                </TabPane>
                <TabPane tab="Page" key="2">
                    <Empty />
                </TabPane>
                <TabPane tab="News" key="3">
                    <Empty />
                </TabPane>
                <TabPane tab="Notification" key="4">
                    <Empty />
                </TabPane>
            </Tabs>

            <Modal title="Basic Modal" visible={isModalImportVisible} onOk={() => handleImport()} onCancel={() => setIsModalImportVisible(false)}>
                <Input type="file" onChange={(e: any) => setImportFile(e.target.files[0])} />
            </Modal>
        </div>
    )
}