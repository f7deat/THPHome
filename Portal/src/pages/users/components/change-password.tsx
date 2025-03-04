import { LockOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { request } from "@umijs/max";
import { Form, Input, message } from "antd";
import { useState } from "react";

const ChangePassword: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);

    const onFinish = async (values: any) => {
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
            <div className="p-2 border-b border-dashed hover:bg-gray-100 cursor-pointer" onClick={() => setOpen(true)}>
                <LockOutlined className="mr-2 text-gray-500" />
                Đổi mật khẩu
            </div>
            <ModalForm
                open={open}
                onOpenChange={setOpen}
                onFinish={onFinish}
                autoComplete="off"
                title="Đổi mật khẩu"
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
            </ModalForm>
        </div>
    )
}

export default ChangePassword;