import { Button, Drawer, Form, Input, InputNumber, message, Popconfirm, Select, Space, Table } from "antd"
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

const { Option } = Select;

const MenuSetting = () => {

    const [menus, setMenus] = useState<any>([])
    const [visible, setVisible] = useState(false)
    const [fields, setFields] = useState<any>([]);
    const [parrentCategories, setParrentCategories] = useState<any>([])
    const [currentType, setCurrentType] = useState<string>('1')

    const [form] = Form.useForm();

    useEffect(() => {
        fetchData()
    }, [currentType])

    useEffect(() => {
        getParrentCategories('');
    }, [])

    const fetchData = () => {
        axios.get(`/api/menu/get-list?type=${currentType}`).then(response => {
            setMenus(response.data)
        })
    }

    const getParrentCategories = (type: string) => {
        axios.get(`/api/menu/parrent-list?type=${type}`).then(response => {
            setParrentCategories(response.data)
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
            },
            {
                name: ['parrentId'],
                value: record.parrentId
            }
        ])
        form.setFields([
            {
                name: ['type'],
                value: record.type
            }
        ])
        setVisible(true)
    }

    const onFinish = (values: any) => {
        let url = '';
        values.index = Number(values.index)
        values.type = Number(values.type)
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
            render: (record: any) => (
                <a href={record.url} target="_blank">{record.name}</a>
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

    const handleChangeType = (value: string) => {
        getParrentCategories(value)
    }

    return (
        <div>
            <div className="mb-3">
                <Select onChange={filterType} defaultValue={currentType} className="mr-2">
                    <Option value='0'>Default</Option>
                    <Option value='1'>Top Menu</Option>
                    <Option value='2'>Main Menu</Option>
                    <Option value='3'>Box Menu</Option>
                </Select>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => handleAdd()}>Thêm</Button>
            </div>
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

                    <Form.Item name="type" label="Loại" rules={[{ required: true }]}>
                        <Select onChange={handleChangeType}>
                            <Option value="0">Default</Option>
                            <Option value="1">Top Menu</Option>
                            <Option value="2">Main Menu</Option>
                            <Option value="3">Box Menu</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Danh mục cha" name="parrentId">
                        <Select>
                            {
                                parrentCategories?.map((category: any) => (
                                    <Option value={category.id} key={category.id}>{category.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item label="Thứ tự" name="index">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Icon" name="icon">
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

export default MenuSetting