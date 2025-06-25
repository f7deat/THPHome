import { Button, Col, Form, Input, InputNumber, message, Popconfirm, Row, Select } from "antd"
import React, { useEffect, useRef, useState } from "react"
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { request, useAccess, useModel } from "@umijs/max";
import { ActionType, DrawerForm, PageContainer, ProColumnType, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components";
import { apiListMenu, apiMenuAdd, apiMenuUpdate, queryMenuOptions } from "@/services/menu";

const { Option } = Select;

const MenuSetting: React.FC = () => {

    const [visible, setVisible] = useState(false)
    const [menu, setMenu] = useState<any>();
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const access = useAccess();
    const { initialState } = useModel('@@initialState');

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
        values.type = 2;
        if (values.id) {
            await apiMenuUpdate(values);
        } else {
            await apiMenuAdd(values);
        }
        message.success('Thành công!');
        setVisible(false);
        formRef.current?.resetFields();
        actionRef.current?.reload();
        setMenu(null);
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
            dataIndex: 'mode',
            search: false
        },
        {
            title: 'Vị trí hiển thị',
            dataIndex: 'type',
            fieldProps: {
                options: [
                    {
                        label: 'Menu chính',
                        value: 2
                    },
                    {
                        label: 'Điều hành',
                        value: 3
                    }
                ]
            },
            valueType: 'select',
            initialValue: 2
        },
        {
            title: 'Liên kết',
            dataIndex: 'url'
        },
        {
            title: 'Người tạo',
            dataIndex: 'createdBy',
            search: false
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            valueType: 'fromNow',
            search: false
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
        <PageContainer extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setVisible(true)}>Thêm mới</Button>}>
            <ProTable
                actionRef={actionRef}
                search={{
                    layout: 'vertical'
                }}
                request={(params) => apiListMenu({
                    ...params,
                    departmentId: access.canEditor ? null : initialState?.currentUser?.departmentId
                })}
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

                <ProFormSelect label="Menu cha" name="parentId" allowClear showSearch request={(params) => queryMenuOptions({
                    ...params,
                    departmentId: access.canEditor ? null : initialState?.currentUser?.departmentId
                })} />
                <ProFormText name="type" initialValue={2} hidden />

                <ProFormTextArea label="Mô tả" name="description" />
                <ProFormText label="Liên kết" name="url" />
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