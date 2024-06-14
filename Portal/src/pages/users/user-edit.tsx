import { Tabs, Button, Typography, Space, Card, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { UserInterface } from "../../interfaces/user-interfaces";
import { ChangePassword } from "./components/change-password";
import { request, useParams } from "@umijs/max";
import { PageContainer } from "@ant-design/pro-components";

const { TabPane } = Tabs;

const UserEdit = () => {

    const { id } = useParams();
    const [form] = Form.useForm();
    const [user, setUser] = useState<UserInterface>();

    useEffect(() => {
        if (id) {
            request(`user/get/${id}`).then(response => {
                setUser(response);
                form.setFields([
                    {
                        name: 'name',
                        value: response.name
                    },
                    {
                        name: 'jobTitle',
                        value: response.jobTitle
                    },
                    {
                        name: 'avatar',
                        value: response.avatar
                    }
                ])
            })
        }
    }, [id])

    const downloadPersonalData = () => {
        request(`user/download-personal-data`, {
            responseType: 'blob',
            method: 'POST'
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'personalData.json');
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
    }

    const onFinishProfile = async (values: any) => {
        values.id = id;
        const response = await request(`user/update`, {
            method: 'POST',
            data: values
        });
        if (response.succeeded) {
            message.success('Thành công!');
        }
    }

    return (
        <PageContainer className="bg-white rounded">
            <Card title={user?.name}>
                <Tabs defaultActiveKey="1" tabPosition="left">
                    <TabPane tab="Hồ sơ" key="1">
                        <div className="p-4">
                            <Form form={form} layout="vertical" onFinish={onFinishProfile}>
                                <Form.Item name="name" label="Họ và tên" required>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="jobTitle" label="Chức danh">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="avatar" label="Ảnh đại diện">
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Lưu lại</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </TabPane>
                    <TabPane tab="Mật khẩu" key="2">
                        <div className="p-4">
                            <ChangePassword />
                        </div>
                    </TabPane>
                    <TabPane tab="Privacy Setting" key="3">
                        <div className="p-4">
                            <div className="mb-2">
                                <Typography.Title level={5}>Disable 2FA</Typography.Title>
                                <div className="mb-2">
                                    Disabling 2FA does not change the keys used in authenticator apps. If you wish to change the key
                                    used in an authenticator app you should <a href="./ResetAuthenticator">reset your authenticator keys.</a>
                                </div>
                                <Button type="primary" danger>Disable 2FA</Button>
                            </div>
                            <div className="mb-2">
                                <Typography.Title level={5}>Delete account</Typography.Title>
                                <div className="mb-2">Deleting this data will permanently remove your account, and this cannot be recovered.</div>
                                <Space>
                                    <Button type="primary" onClick={downloadPersonalData}>Download my data</Button>
                                    <Button type="primary" danger>Delete data and close my account</Button>
                                </Space>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Card>
        </PageContainer>
    )
}

export default UserEdit