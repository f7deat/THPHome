import { Button, Form, Input, message, Popconfirm } from "antd"
import React, { useEffect, useRef, useState } from "react"
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { Link, request } from "@umijs/max";
import { DrawerForm, PageContainer, ProColumnType, ProFormInstance, ProTable } from "@ant-design/pro-components";

const VideoSetting = () => {

    const [menus, setMenus] = useState<any>([])
    const [visible, setVisible] = useState(false)
    const formRef = useRef<ProFormInstance>();

    const [video, setVideo] = useState<any>();

    const fetchData = () => {
        request(`video/get-list`).then(response => {
            setMenus(response)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    function handleAdd() {
        setVideo(undefined);
        formRef.current?.resetFields();
        setVisible(true)
    }

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

    useEffect(() => {
        if (visible && video) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: video.id
                },
                {
                    name: 'name',
                    value: video.name
                },
                {
                    name: 'url',
                    value: video.url
                }
            ])
        }
    }, [video, visible]);

    const onFinish = async (values: any) => {
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
            render: (_, record: any) => [
                <Button size="small" type="primary" icon={<EditOutlined />} onClick={() => {
                    setVideo(record);
                    setVisible(true);
                }} key="edit" />,
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
            width: 60
        }
    ]

    return (
        <PageContainer extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => handleAdd()}>Thêm</Button>}>
            <ProTable
                search={{
                    layout: "vertical"
                }}
                dataSource={menus} columns={columns} rowKey="id" rowSelection={{}} />

            <DrawerForm
                title="Cài đặt"
                open={visible}
                onOpenChange={setVisible}
                width={700}
                onFinish={onFinish}
                formRef={formRef}
            >
                <Form.Item hidden={true} name="id"></Form.Item>
                <Form.Item label="Tiêu đề" name="name">
                    <Input />
                </Form.Item>

                <Form.Item label="Youtube Video Id" name="url">
                    <Input />
                </Form.Item>
            </DrawerForm>
        </PageContainer>
    )
}

export default VideoSetting