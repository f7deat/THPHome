import { Button, message, Popconfirm } from "antd"
import React, { useEffect, useRef, useState } from "react"
import {
    EditOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import { request } from "@umijs/max";
import { ActionType, ModalForm, PageContainer, ProColumnType, ProFormInstance, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components";
import { apiListLocalization } from "@/services/localization";

const Localization: React.FC = () => {

    const [visible, setVisible] = useState(false)
    const [data, setData] = useState<any>();
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();

    useEffect(() => {
        formRef.current?.setFields([
            {
                name: 'id',
                value: data?.id
            },
            {
                name: 'key',
                value: data?.key
            },
            {
                name: 'value',
                value: data?.value
            }
        ])
    }, [data]);

    function handleRemove(id: number) {
        request(`localization/delete/${id}`, {
            method: 'POST'
        }).then(() => {
            message.success('OK');
            actionRef.current?.reload();
        })
    }

    const onFinish = async (values: any) => {
        request(`localization/update`, {
            method: 'POST',
            data: values
        }).then(() => {
            message.success('OK')
            setVisible(false);
            actionRef.current?.reload();
        })
    };

    const columns: ProColumnType<any>[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 30
        },
        {
            title: 'Key',
            dataIndex: 'key'
        },
        {
            title: 'Value',
            dataIndex: "value"
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            valueType: 'fromNow',
            search: false,
            width: 150
        },
        {
            title: 'Người cập nhật',
            dataIndex: 'modifiedBy',
            search: false,
            width: 200
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'modifiedDate',
            valueType: 'fromNow',
            search: false,
            width: 150
        },
        {
            title: 'Tác vụ',
            render: (_, record: any) => [
                <Button size="small" icon={<EditOutlined />} onClick={() => {
                    setData(record);
                    setVisible(true);
                }} key="edit"></Button>,
                <Popconfirm
                    title="Are you sure to delete?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleRemove(record.id)}
                    key="delete"
                >
                    <Button size="small" type="primary" danger icon={<DeleteOutlined />}></Button>
                </Popconfirm>
            ],
            valueType: 'option',
            width: 60
        }
    ]

    return (
        <PageContainer>
            <ProTable
                actionRef={actionRef}
                search={{
                    layout: 'vertical'
                }}
                request={apiListLocalization}
                columns={columns} rowKey="id" />

            <ModalForm
                title="Cài đặt"
                onOpenChange={setVisible}
                open={visible}
                onFinish={onFinish}
                formRef={formRef}
            >
                <ProFormText name="id" hidden />
                <ProFormText name="key" label="Khóa" disabled />
                <ProFormTextArea name="value" label="Bản dịch" rules={[
                    {
                        required: true
                    }
                ]} />
            </ModalForm>
        </PageContainer>
    )
}

export default Localization