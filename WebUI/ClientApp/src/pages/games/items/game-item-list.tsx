import { Button, Drawer, Form, Input, message, Popconfirm, Space, Table } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    SaveOutlined,
    ArrowRightOutlined
} from "@ant-design/icons";
import { useParams } from "react-router-dom";

const GameItemList = () => {

    const { id } = useParams<any>()

    const [items, setItems] = useState([])
    const [visible, setVisible] = useState(false)
    const [fields, setFields] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    useEffect(() => {
        fetchData(pagination)
    }, [])

    function fetchData(pagination: any) {
        setLoading(true)
        axios.get(`/api/game/item/list/${id}?pageIndex=${pagination.current}&pageSize=${pagination.pageSize}`).then(response => {
            setItems(response.data.data)
            setLoading(false)
            setPagination(response.data.pagination)
        })
    }

    function handleUpdate(record: any) {
        setFields([
            {
                name: ['id'],
                value: record.id
            },
            {
                name: ['createdBy'],
                value: record.createdBy
            },
            {
                name: ['createdDate'],
                value: record.createdDate
            },
            {
                name: ['name'],
                value: record.name
            },
            {
                name: ['thumbnail'],
                value: record.thumbnail
            },
            {
                name: ['description'],
                value: record.description
            },
            {
                name: ['link'],
                value: record.link
            },
            {
                name: ['lang'],
                value: record.lang
            }
        ])
        setVisible(true)
    }

    function handleRemove(id: string) {
        axios.delete(`/api/game/item/delete/${id}`).then(response => {
            if (response.data.succeeded) {
                message.success(response.data.message)
                fetchData(pagination)
            } else {
                message.error(response.data.message)
            }
        })
    }

    function handleAdd() {
        setFields([])
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false);
    };

    const columns = [
        {
            title: '#',
            render: (text: string, record: any, index: number) => index + 1
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: '',
            render: (record: any) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleUpdate(record)}></Button>
                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleRemove(record.id)}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    const onFinish = (values: any) => {
        let url = '';
        if (values.id) {
            url = `/api/game/item/update`;
        } else {
            url = `/api/game/item/add`;
        }
        values.gameId = Number(values.gameId)
        axios.post(url, values).then(response => {
            if (response.data.succeeded) {
                message.success(response.data.message)
            } else {
                message.error(response.data.message)
            }
            fetchData(pagination)
        })
        setVisible(false)
    };

    const handleTableChange = (pagination: any, filters: any, sorter: any) => {
        fetchData(pagination)
    }

    return (
        <div>
            <div className="mb-3">
                <Button type="primary" icon={<PlusOutlined />} onClick={() => handleAdd()}>Thêm</Button>
            </div>

            <Table dataSource={items} columns={columns} rowKey="id" rowSelection={{}} pagination={pagination} loading={loading} onChange={handleTableChange} />
            <Drawer
                title="Game"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={700}
            >
                <Form onFinish={onFinish} layout="vertical" fields={fields}>
                    <Form.Item hidden={true} name="id"></Form.Item>
                    <Form.Item hidden={true} name="createdBy"></Form.Item>
                    <Form.Item hidden={true} name="createdDate"></Form.Item>
                    <Form.Item hidden={true} name="modifiedBy"></Form.Item>
                    <Form.Item hidden={true} name="gameId" initialValue={id}></Form.Item>
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Thumbnail" name="thumbnail">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item label="Language" name="lang">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Link" name="link">
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>Save</Button>
                            <Button htmlType="button" icon={<ArrowRightOutlined />} onClick={() => setVisible(false)}>Close</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
}

export default GameItemList