import { Tabs, Button, Typography, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router"
import { IUsePrams } from "../../interfaces/use-params";
import { UserInterface } from "../../interfaces/user-interfaces";
import { ChangePassword } from "./components/change-password";

const { TabPane } = Tabs;

const UserEdit = () => {

    const { id } = useParams<IUsePrams>();

    const [user, setUser] = useState<UserInterface>();

    useEffect(() => {
        if (id) {
            axios.get(`/api/user/get/${id}`).then(response => {
                setUser(response.data);
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

    return (
        <div className="bg-white rounded">
            <Tabs defaultActiveKey="1" tabPosition="left">
                <TabPane tab="Basic Setting" key="1">
                    <div className="p-4">
                        <Typography.Title level={5}>Persional Profile</Typography.Title>
                        {user?.userName}
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
        </div>
    )
}

export default UserEdit