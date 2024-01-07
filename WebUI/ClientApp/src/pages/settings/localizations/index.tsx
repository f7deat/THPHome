import { Button, Drawer, Form, Input, message, Popconfirm, Select, Space, Table } from "antd"
import React, { useEffect, useState } from "react"
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    SaveOutlined,
    ArrowRightOutlined
} from "@ant-design/icons";
import axios from "axios";

const Localization: React.FC = () => {

    const [menus, setMenus] = useState<any>([])
    const [visible, setVisible] = useState(false)
    const [fields, setFields] = useState<any>([]);
    const [locale, setLocale] = useState<any>();

    const [form] = Form.useForm();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        axios.get(`/api/localization/list`).then(response => {
            setMenus(response.data.data)
        })
    }

    const onClose = () => {
        setVisible(false);
    };

    function handleRemove(id: number) {
        axios.delete(`/api/menu/delete/${id}`).then(response => {
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
                name: ['value'],
                value: record.value
            }
        ])
        setLocale(record);
        setVisible(true)
    }

    const onFinish = (values: any) => {
        axios.post(`/api/localization/update`, values).then(response => {
            message.success('OK')
            fetchData();
            setVisible(false)
        })
    };

    const columns = [
        {
            title: 'Key',
            dataIndex: 'key'
        },
        {
            title: 'Value',
            dataIndex: "value"
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

    return (
        <div>
            <Table dataSource={menus} columns={columns} rowKey="id" rowSelection={{}} />

            <Drawer
                title="Cài đặt"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={700}
            >
                <Form onFinish={onFinish} layout="vertical" fields={fields} form={form}>
                    <Form.Item hidden={true} name="id"></Form.Item>

                    <Form.Item label="Bản dịch" name="value">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>Lưu lại</Button>
                            <Button htmlType="button" icon={<ArrowRightOutlined />} onClick={() => setVisible(false)}>Đóng</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
}

export default Localization