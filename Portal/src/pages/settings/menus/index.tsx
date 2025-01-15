import { Button, Col, Form, Input, InputNumber, message, Popconfirm, Row, Select } from "antd"
import React, { useEffect, useRef, useState } from "react"
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { request } from "@umijs/max";
import { ActionType, DrawerForm, PageContainer, ProColumnType, ProFormInstance, ProFormSelect, ProFormText, ProTable } from "@ant-design/pro-components";
import { apiListMenu, queryMenuOptions } from "@/services/menu";

const { Option } = Select;

const MenuSetting = () => {

    const [visible, setVisible] = useState(false)
    const [menu, setMenu] = useState<any>();
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();

    useEffect(() => {
        formRef.current?.setFields([
            {
                name: 'id',
                value: menu?.id
            },
            {
                name: 'name',
                value: menu?.name
            },
            {
                name: 'parentId',
                value: menu?.parentId
            },
            {
                name: 'thumbnail',
                value: menu?.thumbnail
            },
            {
                name: 'description',
                value: menu?.description
            },
            {
                name: 'url',
                value: menu?.url
            },
            {
                name: 'index',
                value: menu?.index
            },
            {
                name: 'icon',
                value: menu?.icon
            }
        ])
    }, [menu]);

    function handleRemove(id: number) {
        request(`menu/delete/${id}`, {
            method: 'DELETE'
        }).then(() => {
            message.success('Thành công!');
            actionRef.current?.reload();
        })
    }

    const onFinish = async (values: any) => {
        let url = '';
        values.type = 2;
        if (values.id) {
            url = `menu/update`;
        } else {
            url = `menu/add`;
        }
        request(url, {
            data: values,
            method: 'POST'
        }).then(() => {
            message.success('Thành công!');
            setVisible(false);
            formRef.current?.resetFields();
            actionRef.current?.reload();
        })
    };

    const columns: ProColumnType<any>[] = [
        {
            title: '#',
            width: 20,
            align: 'center',
            search: false
        },
        {
            title: 'STT',
            dataIndex: "index",
            width: 40,
            search: false
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            render: (dom: any, record: any) => (
                <Button type="link" size="small" onClick={() => setMenu(record)}>{dom}</Button>
            )
        },
        {
            title: 'Kiểu hiển thị',
            dataIndex: 'mode'
        },
        {
            title: 'Liên kết',
            dataIndex: 'url'
        },
        {
            title: 'Tác vụ',
            valueType: 'option',
            render: (_, record: any) => [
                <Button size="small" key="add" type="primary" icon={<PlusOutlined />} onClick={() => {
                    setMenu(record);
                    setVisible(true);
                }}></Button>,
                <Button size="small" key="edit" icon={<EditOutlined />} onClick={() => {
                    setMenu(record);
                    setVisible(true);
                }}></Button>,
                <Popconfirm
                    key="delete"
                    title="Are you sure to delete?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleRemove(record.id)}
                >
                    <Button type="primary" danger icon={<DeleteOutlined />} size="small"></Button>
                </Popconfirm>
            ],
            width: 100
        }
    ]

    return (
        <PageContainer extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setVisible(true)}>Thêm</Button>}>
            <ProTable
                actionRef={actionRef}
                search={{
                    layout: 'vertical'
                }}
                request={apiListMenu}
                columns={columns} rowKey="id" />

            <DrawerForm
                title="Cài đặt"
                onOpenChange={setVisible}
                open={visible}
                width={700}
                onFinish={onFinish}
                formRef={formRef}
            >
                <ProFormText hidden name="id" />
                <ProFormText name="name" label="Tên" rules={[
                    {
                        required: true
                    }
                ]} />

                <ProFormSelect label="Menu cha" name="parentId" allowClear showSearch request={queryMenuOptions} />
                <ProFormText name="type" initialValue={2} hidden />

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
                        <Form.Item name="mode" label="Kiểu hiển thị" initialValue="Flyout">
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
            </DrawerForm>
        </PageContainer>
    )
}

export default MenuSetting