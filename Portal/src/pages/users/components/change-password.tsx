import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React from "react";

export const ChangePassword = () => {
    const onFinish = (values: any) => {
        if (values.newPassword !== values.confirmPassword) {
            return message.warning('Password not match')
        }
        axios.post(`/api/user/change-password`, values).then(response => {
            if (response.data.succeeded) {
                message.success('succeeded')
            } else {
                response.data.errors.forEach((value: any) => {
                    message.error(value.description)
                })
            }
        })
    };
    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >

                <Form.Item
                    label="Current password"
                    name="currentPassword"
                    rules={[{ required: true, message: 'Please input your current password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                 
                <Form.Item
                    label="New password"
                    name="newPassword"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm password"
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please confirm your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Save changes</Button>
                </Form.Item>
            </Form>
        </div>
    )
}