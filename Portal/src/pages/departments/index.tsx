﻿import { Button, Col, Form, Input, message, Popconfirm, Row } from "antd"
import { useEffect, useRef, useState } from "react"
import {
    FolderOutlined,
    DeleteOutlined,
    PlusOutlined,
    EditOutlined
} from "@ant-design/icons";
import { getLocale, history, request, useRequest } from "@umijs/max";
import { ActionType, ModalForm, PageContainer, ProCard, ProColumnType, ProFormDigit, ProFormInstance, ProFormSelect, ProTable } from "@ant-design/pro-components";
import { apiGetDepartmentList, apiGetDepartmentTypeOptions, apiGetDepartmentTypes, apiUpdateDepartment } from "@/services/department";

const Department: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const { data: departmentTypes, loading: departmentTypeLoading } = useRequest(apiGetDepartmentTypes);
    const [department, setDepartment] = useState<any>();

    useEffect(() => {
        if (department && open) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: department.id
                },
                {
                    name: 'name',
                    value: department.name
                },
                {
                    name: 'departmentTypeId',
                    value: department.departmentTypeId
                },
                {
                    name: 'code',
                    value: department.code
                },
                {
                    name: 'description',
                    value: department.description
                }
            ])
        } else {
            setDepartment(null);
            formRef.current?.resetFields();
        }
    }, [department, open]);

    const onFinish = async (values: any) => {
        if (values.id) {
            await apiUpdateDepartment(values);
            message.success('Đã lưu');
            setOpen(false);
            actionRef.current?.reload();
        } else {
            values.locale = getLocale();
            await request(`department/add`, {
                data: values,
                method: 'POST'
            });
            message.success('Đã lưu!');
            setOpen(false);
            actionRef.current?.reload();
        }
    }

    const onConfirm = async (id: string) => {
        const response = await request(`department/remove/${id}`, {
            method: 'POST'
        });
        if (response.succeeded) {
            message.success('Xóa thành công!');
            actionRef.current?.reload();
        }
    }

    const columns: ProColumnType<any>[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 30,
            align: 'center'
        },
        {
            title: 'Tên đơn vị',
            dataIndex: 'name'
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            search: false
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            search: false,
            valueType: 'dateTime',
            width: 160
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'modifiedDate',
            search: false,
            valueType: 'dateTime',
            width: 160
        },
        {
            title: 'Tác vụ',
            valueType: 'option',
            render: (value, record) => [
                <Button size="small" icon={<EditOutlined />} key="edit" onClick={() => {
                    setDepartment(record);
                    setOpen(true);
                }} />,
                <Button size="small" type="primary" key="detail" icon={<FolderOutlined />} onClick={() => history.push(`/department/detail/${record.id}`)}></Button>,
                <Popconfirm title="Xóa bản ghi?" key="delete" onConfirm={() => onConfirm(record.id)}>
                    <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                </Popconfirm>
            ],
            width: 100
        }
    ]

    return (
        <PageContainer>
            <ProCard loading={departmentTypeLoading} tabs={{
                type: 'card'
            }}>
                {
                    departmentTypes?.map(((type: any) => (
                        <ProCard.TabPane key={type.id} tab={type.name}>
                            <ProTable
                                ghost
                                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Thêm mới</Button>}
                                actionRef={actionRef}
                                request={(params) => apiGetDepartmentList({
                                    ...params,
                                    departmentTypeId: type.id
                                })}
                                search={{
                                    layout: 'vertical'
                                }}
                                columns={columns}
                            />
                        </ProCard.TabPane>
                    )))
                }
            </ProCard>

            <ModalForm title="Đơn vị" open={open} onOpenChange={setOpen} formRef={formRef} onFinish={onFinish}>
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item label="Tên đơn vị" name="name" rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên đơn vị'
                    }
                ]}>
                    <Input />
                </Form.Item>
                <Row gutter={16}>
                    <Col md={18}>
                        <ProFormSelect
                            request={apiGetDepartmentTypeOptions}
                            name="departmentTypeId" label="Loại đơn vị" rules={[
                                {
                                    required: true
                                }
                            ]} />
                    </Col>
                    <Col md={6}>
                        <ProFormDigit name="code" label="Mã đơn vị" />
                    </Col>
                </Row>
                <Form.Item label="Mô tả" name="description">
                    <Input.TextArea />
                </Form.Item>
            </ModalForm>

        </PageContainer>
    )
}

export default Department