import { Tabs } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router"
import { IUsePrams } from "../../interfaces/use-params";
import { UserInterface } from "../../interfaces/user-interfaces";
import ChangePassword from "./change-password";

const { TabPane } = Tabs;

const UserEdit = () => {

    const { id } = useParams<IUsePrams>();

    const [user, setUser] = useState<UserInterface>();

    useEffect(() => {
        axios.get(`/api/user/get/${id}`).then(response => {
            setUser(response.data);
        })
    }, [id])

    return (
        <div className="bg-white rounded">
            <Tabs defaultActiveKey="1" tabPosition="left">
                <TabPane tab="Basic Setting" key="1">
                    {user?.userName}
                </TabPane>
                <TabPane tab="Đổi mật khẩu" key="2">
                    <div className="p-4">
                        <ChangePassword />
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default UserEdit