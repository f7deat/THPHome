import { Button, Form, Input, message, Popconfirm } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import MyEditor from "../../../components/my-editor";

interface TabContentProps {
    activeTab?: string;
    fetchData: any;
}

export const TabContentDepartment: React.FC<TabContentProps> = (props) => {

    const { activeTab, fetchData } = props;

    const [formType] = Form.useForm();

    const onFinishType = async (values: any) => {
        const response = await axios.post(`/api/department/update-detail`, values);
        if (response.data.succeeded) {
            message.success('Thành công!');
        }
    }

    useEffect(() => {
        if (activeTab) {
            axios.get(`/api/department/detail/content/${activeTab}`).then(response => {
                formType.setFields([
                    {
                        name: 'id',
                        value: response.data.id
                    },
                    {
                        name: 'type',
                        value: response.data.type
                    },
                    {
                        name: 'content',
                        value: response.data.content
                    }
                ])
            })
        }
    }, [])

    const removeContent = async () => {
        try {
            const response = await axios.post(`/api/department/detail/delete/${activeTab}`);
            if (response.data) {
                message.success('Thành công!');
                fetchData();
            }
        } catch (e) {
            console.log(e)
            message.error('zxc')
        }
    }

    return (
        <Form form={formType} layout="vertical" onFinish={onFinishType}>
            <Form.Item name="id" hidden>
                <Input />
            </Form.Item>
            <Form.Item name="type" label="Tiêu đề" required>
                <Input />
            </Form.Item>
            <Form.Item name="content" label="Nội dung" required>
                <MyEditor name="content" />
            </Form.Item>
            <div className="flex justify-end gap-4">
                <Button type="primary" htmlType="submit">Lưu lại</Button>
                <Popconfirm title="Xác nhận xóa?" onConfirm={() => removeContent()}>
                    <Button type="primary" danger>Xóa</Button>
                </Popconfirm>
            </div>
        </Form>
    )
}