import { Button, Form, Input, message } from "antd"
import axios from "axios";

export default function ChangePassword() {

    const onFinish = (values: any) => {
        if (values.newPassword !== values.confirmPassword) {
            message.warning('Xác nhận mật khẩu không chính xác!');
        }
        else {
            axios.post(`/api/user/change-password`, values).then(response => {
                if (response.data.succeeded) {
                    message.success('Đổi mật khẩu thành công!')
                }
            })
        }
    };

    return (
        <div>
            <Form
                onFinish={onFinish}
                layout="vertical"
            >

                <Form.Item
                    label="Mật khẩu cũ"
                    name="currentPassword"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khaair mới!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Lưu lại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}