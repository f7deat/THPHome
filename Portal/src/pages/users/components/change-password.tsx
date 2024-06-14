import { request } from "@umijs/max";
import { Button, Form, Input, message } from "antd";

export const ChangePassword = () => {
    const onFinish = (values: any) => {
        if (values.newPassword !== values.confirmPassword) {
            return message.warning('Password not match')
        }
        request(`user/change-password`, {
            method: 'POST',
            data: values
        }).then(response => {
            if (response.succeeded) {
                message.success('succeeded')
            } else {
                response.errors.forEach((value: any) => {
                    message.error(value.description)
                })
            }
        })
    };
    return (
        <div>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >

                <Form.Item
                    label="Mật khẩu cũ"
                    name="currentPassword"
                    rules={[{ required: true }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[{ required: true }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Nhập lại mật khẩu"
                    name="confirmPassword"
                    rules={[{ required: true }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Đổi mật khẩu</Button>
                </Form.Item>
            </Form>
        </div>
    )
}