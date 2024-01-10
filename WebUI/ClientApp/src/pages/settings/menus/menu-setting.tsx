import { Button, Col, Drawer, Form, Input, InputNumber, message, Popconfirm, Row, Select, Space, Table, Tabs, TabsProps } from "antd"
import React, { useEffect, useState } from "react"
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    SaveOutlined,
    ArrowRightOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "antd/lib/card/Card";

const { Option } = Select;

const MenuSetting = () => {

    const [menus, setMenus] = useState<any>([])
    const [visible, setVisible] = useState(false)
    const [fields, setFields] = useState<any>([]);
    const [currentType, setCurrentType] = useState<string>('1');
    const [menu, setMenu] = useState<any>();

    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, [currentType, menu])

    const fetchData = () => {
        axios.get(`/api/menu/list?type=${currentType}&parentId=${menu?.id || ''}`).then(response => {
            setMenus(response.data)
        })
    }

    const filterType = (value: string) => {
        setCurrentType(value)
        fetchData()
    }

    function handleAdd() {
        form.resetFields()
        form.setFields([
            {
                name: 'type',
                value: currentType
            }
        ])
        setVisible(true)
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
                name: ['url'],
                value: record.url
            },
            {
                name: ['index'],
                value: record.index
            },
            {
                name: ['icon'],
                value: record.icon
            }
        ])
        form.setFields([
            {
                name: 'type',
                value: record.type
            },
            {
                name: 'mode',
                value: record.mode
            }
        ])
        setVisible(true)
    }

    const onFinish = (values: any) => {
        let url = '';
        values.type = Number(currentType)
        values.parrentId = menu?.id;
        if (values.id) {
            url = `/api/menu/update`;
        } else {
            url = `/api/menu/add`;
        }
        axios.post(url, values).then(response => {
            if (response.data.succeeded) {
                message.success(response.data.message)
            } else {
                message.error(response.data.message)
            }
            setVisible(false);
            fetchData();
        })
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id'
        },
        {
            title: 'Thứ tự',
            dataIndex: "index"
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            render: (dom: any, record: any) => (
                <Button type="link" size="small" onClick={() => setMenu(record)}>{dom}</Button>
            )
        },
        {
            title: 'Tác vụ',
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

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Top Menu'
        },
        {
            key: '2',
            label: 'Main Menu'
        },
        {
            key: '3',
            label: 'Box Menu'
        },
    ];

    return (
        <Card title={menu?.name || 'Menu'} extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => handleAdd()}>Thêm</Button>}>
            <Tabs defaultActiveKey="1" items={items} onChange={filterType} />
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
                    <Form.Item hidden={true} name="createdBy"></Form.Item>
                    <Form.Item hidden={true} name="createdDate"></Form.Item>
                    <Form.Item hidden={true} name="modifiedBy"></Form.Item>
                    <Form.Item label="Tên" name="name" rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập'
                        }
                    ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Ảnh đại diện" name="thumbnail">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item label="Liên kết" name="url">
                        <Input />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item name="mode" label="Kiểu hiển thị">
                                <Select>
                                    <Option value="Flyout">Flyout</Option>
                                    <Option value="Mega">Mega</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Thứ tự" name="index">
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Icon" name="icon">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>Save</Button>
                            <Button htmlType="button" icon={<ArrowRightOutlined />} onClick={() => setVisible(false)}>Close</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Drawer>
        </Card>
    )
}

export default MenuSetting