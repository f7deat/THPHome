import { Button, Drawer, Form, Input, message, Popconfirm, Select, Space, Table } from "antd"
import React, { useEffect, useState } from "react"
import {
    EditOutlined,
    DeleteOutlined,
    SaveOutlined,
    ArrowRightOutlined
} from "@ant-design/icons";
import { request, useIntl } from "@umijs/max";
import { PageContainer, ProCard, ProColumnType, ProTable } from "@ant-design/pro-components";

const Localization: React.FC = () => {

    const [menus, setMenus] = useState<any>([])
    const [visible, setVisible] = useState(false)
    const [fields, setFields] = useState<any>([]);
    const intl = useIntl();

    const [form] = Form.useForm();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        request(`localization/list`, {
            params: {
                locale: intl.locale
            }
        }).then(response => {
            setMenus(response.data)
        })
    }

    const onClose = () => {
        setVisible(false);
    };

    function handleRemove(id: number) {
        request(`localization/delete/${id}`, {
            method: 'POST'
        }).then(response => {
            message.success('OK')
            fetchData()
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
        setVisible(true)
    }

    const onFinish = (values: any) => {
        request(`localization/update`, {
            method: 'POST',
            data: values
        }).then(response => {
            message.success('OK')
            fetchData();
            setVisible(false)
        })
    };

    const columns : ProColumnType<any>[] = [
        {
            title: 'Key',
            dataIndex: 'key'
        },
        {
            title: 'Value',
            dataIndex: "value"
        },
        {
            title: 'Cập nhật lúc',
            dataIndex: 'modifiedDate',
            valueType: 'dateTime',
            search: false
        },
        {
            title: '',
            render: (record: any) => (
                <Space>
                    <Button size="small" icon={<EditOutlined />} onClick={() => handleUpdate(record)}></Button>
                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleRemove(record.id)}
                    >
                        <Button size="small" type="primary" danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            ),
            valueType: 'option'
        }
    ]

    return (
        <PageContainer>
            <ProCard>
                <ProTable 
                search={{
                    layout: 'vertical'
                }}
                dataSource={menus} columns={columns} rowKey="id" rowSelection={{}} />
            </ProCard>

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
        </PageContainer>
    )
}

export default Localization