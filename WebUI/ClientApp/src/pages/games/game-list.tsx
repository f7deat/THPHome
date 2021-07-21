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
import { Link } from "react-router-dom";

const GameList = () => {

    const [games, setGames] = useState([])
    const [visible, setVisible] = useState(false)
    const [fields, setFields] = useState<any>([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        axios.get(`/api/game/list`).then(response => {
            setGames(response.data)
        })
    }

    function handleRemove(id: number) {
        axios.delete(`/api/game/delete/${id}`).then(response => {
            if (response.data.succeeded) {
                message.success(response.data.message)
                fetchData()
            } else {
                message.error(response.data.message)
            }
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
            }
        ])
        setVisible(true)
    }

    const columns = [
        {
            title: '#',
            dataIndex: "id"
        },
        {
            title: 'Name',
            render: (record: any) => (
                <Link to={`/admin/game/item/${record.id}`}>{record.name}</Link>
            )
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

    function handleAdd() {
        setFields([])
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false);
    };

    const onFinish = (values: any) => {
        let url = '';
        if (values.id) {
            url = `/api/game/update`;
        } else {
            url = `/api/game/add`;
        }
        axios.post(url, values).then(response => {
            if (response.data.succeeded) {
                message.success(response.data.message)
            } else {
                message.error(response.data.message)
            }
            fetchData()
        })
        setVisible(false)
    };

    return (
        <div>
            <div className="mb-3">
                <Button type="primary" icon={<PlusOutlined />} onClick={() => handleAdd()}>Thêm</Button>
            </div>
            <Table dataSource={games} columns={columns} rowKey="id" rowSelection={{}} />

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
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Thumbnail" name="thumbnail">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea />
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

export default GameList