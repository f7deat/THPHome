import { Button, Drawer, Form, Input, message, Popconfirm, Popover, Select, Space, Table, Upload, Image, Tag } from "antd"
import React, { useEffect, useState } from "react"
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    SaveOutlined,
    ArrowRightOutlined,
    UploadOutlined
} from "@ant-design/icons";
import axios from "axios";

const PartnerSetting = () => {

    const [menus, setMenus] = useState<any>([])
    const [visible, setVisible] = useState(false)
    const [fields, setFields] = useState<any>([]);

    const [form] = Form.useForm();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        axios.get(`/api/partner/get-list`).then(response => {
            setMenus(response.data)
        })
    }

    function handleAdd() {
        form.resetFields()
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false);
    };

    function handleRemove(id: number) {
        axios.delete(`/api/partner/delete/${id}`).then(response => {
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
                name: ['logo'],
                value: record.logo
            },
            {
                name: ['description'],
                value: record.description
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
        if (values.id) {
            url = `/api/partner/update`;
        } else {
            url = `/api/partner/add`;
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

    const columns = [
        {
            title: 'STT',
            dataIndex: "index"
        },
        {
            title: 'Tên đối tác',
            render: (record: any) => (
                <Popover content={<Image src={record.logo} width={200} />} title="Logo">
                    <a href={record.url} target="_blank">{record.name}</a>
                </Popover>
            )
        },
        {
            title: 'Trạng thái',
            render: (record: any) => (
                record.status === 1 ? <Tag color="green">Đang kích hoạt</Tag> : <Tag color="red">Không hoạt động</Tag>
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

    const handleUpload = (info: any) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            form.setFieldsValue({ logo: info.file.response.fileUrl })
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    return (
        <div>
            <div className="mb-3">
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
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Logo">
                        <div className="flex">
                            <Form.Item name="logo" className="flex-grow mb-0">
                                <Input />
                            </Form.Item>
                            <Upload action="/api/partner/upload" onChange={handleUpload} maxCount={1} showUploadList={false}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </div>
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item label="Liên kết" name="url">
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

export default PartnerSetting