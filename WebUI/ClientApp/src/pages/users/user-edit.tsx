import { Tabs, Button, Typography, Space, Card, Form, Input, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router"
import { IUsePrams } from "../../interfaces/use-params";
import { UserInterface } from "../../interfaces/user-interfaces";
import { ChangePassword } from "./components/change-password";

const { TabPane } = Tabs;

const UserEdit = () => {

    const { id } = useParams<IUsePrams>();
    const [form] = Form.useForm();
    const [user, setUser] = useState<UserInterface>();

    useEffect(() => {
        if (id) {
            axios.get(`/api/user/get/${id}`).then(response => {
                setUser(response.data);
                form.setFields([
                    {
                        name: 'name',
                        value: response.data.name
                    },
                    {
                        name: 'jobTitle',
                        value: response.data.jobTitle
                    }
                ])
            })
        }
    }, [id])

    const downloadPersonalData = () => {
        axios({
            url: `/api/user/download-personal-data`,
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
        const response = await axios.post(`/api/user/update`, values);
        if (response.data.succeeded) {
            message.success('Thành công!');
        }
    }

    return (
        <div className="bg-white rounded">
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
                    <TabPane tab="Password" key="2">
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
        </div>
    )
}

export default UserEdit