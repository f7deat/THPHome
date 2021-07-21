import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Header } = Layout;

export const AppHeader = (props: any) => {

    const menu = (
        <Menu>
            <Menu.Item icon={<UserOutlined />} className="cursor-pointer">
                <Link to="/admin/user/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item danger icon={<LogoutOutlined />} className="cursor-pointer">Logout</Menu.Item>
        </Menu>
    );

    return (
        <Header className="bg-white p-0 flex">
            <div className="flex-grow">
                <Button type="text" icon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => props.setCollapsed(!props.collapsed)} className="trigger"></Button>
            </div>
            <div className="px-4">
                <Avatar icon={<UserOutlined />} />
                <Dropdown overlay={menu} arrow={true}>
                    <Button type="text">
                        {props.user?.userName} 
                    </Button>
                </Dropdown>
            </div>
        </Header>
    )
}