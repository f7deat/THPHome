import { Button, Drawer, Form, Input, message, Popconfirm, Space } from "antd"
import React, { useEffect, useState } from "react"
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    SaveOutlined,
    ArrowRightOutlined
} from "@ant-design/icons";
import { Link, request } from "@umijs/max";
import { PageContainer, ProColumnType, ProTable } from "@ant-design/pro-components";

const VideoSetting = () => {

    const [menus, setMenus] = useState<any>([])
    const [visible, setVisible] = useState(false)
    const [fields, setFields] = useState<any>([]);

    const [form] = Form.useForm();

    const fetchData = () => {
        request(`video/get-list`).then(response => {
            setMenus(response)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    function handleAdd() {
        form.resetFields()
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false);
    };

    function handleRemove(id: number) {
        request(`video/delete/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.succeeded) {
                message.success(response.message)
                fetchData()
            } else {
                message.error(response.message)
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
                name: ['name'],
                value: record.name
            },
            {
                name: ['thumbnail'],
                value: record.thumbnail
            },
            {
                name: ['url'],
                value: record.url
            }
        ])
        setVisible(true)
    }

    const onFinish = (values: any) => {
        let url = '';
        values.index = Number(values.index)
        values.type = Number(values.type)
        if (values.id) {
            url = `video/update`;
        } else {
            url = `video/add`;
        }
        request(url, {
            method: 'POST',
            data: values
        }).then(response => {
            if (response.succeeded) {
                message.success(response.message)
            } else {
                message.error(response.message)
            }
            fetchData()
        })
        setVisible(false)
    };

    const columns: ProColumnType<any>[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 30,
            align: 'center'
        },
        {
            title: 'Tiêu đề',
            render: (record: any) => (
                <Link to={`/video/item/${record.id}`}>{record.name}</Link>
            )
        },
        {
            title: 'Url',
            dataIndex: 'url',
            search: false
        },
        {
            title: 'Tác vụ',
            render: (record: any) => [
                    <Button size="small" type="primary" icon={<EditOutlined />} onClick={() => handleUpdate(record)} key="edit" />,
                    <Popconfirm
                        key="delete"
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleRemove(record.id)}
                    >
                        <Button size="small" type="primary" danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
            ],
            valueType: 'option',
            width: 100
        }
    ]

    return (
        <PageContainer extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => handleAdd()}>Thêm</Button>}>
            <ProTable
                search={{
                    layout: "vertical"
                }}
                dataSource={menus} columns={columns} rowKey="id" rowSelection={{}} />

            <Drawer
                title="Cài đặt"
                placement="right"
                closable={false}
                onClose={onClose}
                open={visible}
                width={700}
            >
                <Form onFinish={onFinish} layout="vertical" fields={fields} form={form}>
                    <Form.Item hidden={true} name="id"></Form.Item>
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Thumbnail" name="thumbnail">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Youtube Video Id" name="url">
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
        </PageContainer>
    )
}

export default VideoSetting