import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LogoutOutlined,
    GlobalOutlined,
    DownOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import axios from "axios";

const { Header } = Layout;

export const AppHeader = (props: any) => {

    const handleLogout = () => {
        axios.post(`/api/user/logout`).then(response => {
            window.location.href = '/';
        })
    }
    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const getLocale = () => {
        const locale = getCookie('locale');
        if (locale === 'en-US') {
            return 'English'
        }
        return 'Tiếng Việt';
    }

    const menu = (
        <Menu>
            <Menu.Item icon={<UserOutlined />} className="cursor-pointer">
                <Link to="/admin/user/profile">Hồ sơ</Link>
            </Menu.Item>
            <Menu.Item danger icon={<LogoutOutlined />} className="cursor-pointer" onClick={() => handleLogout()}>Đăng xuất</Menu.Item>
        </Menu>
    );

    function setCookie(name: string, value: string, days: number) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
        window.location.reload();
    }

    return (
        <Header className="bg-white p-0 flex">
            <div className="flex-grow">
                <Button type="text" icon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => props.setCollapsed(!props.collapsed)} className="trigger"></Button>
            </div>
            <div className="px-4 items-center" style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
            }}>
                <Dropdown overlay={<Menu>
                    <Menu.Item icon={<UserOutlined />} className="cursor-pointer" onClick={() => setCookie('locale', 'vi-VN', 360)}>
                        Tiếng Việt
                    </Menu.Item>
                    <Menu.Item icon={<LogoutOutlined />} className="cursor-pointer" onClick={() => setCookie('locale', 'en-US', 360)}>
                        English
                    </Menu.Item>
                </Menu>}>
                    <Button type="link" icon={<GlobalOutlined />}>{getLocale()} <DownOutlined /></Button>
                </Dropdown>
                <div>
                    <Avatar icon={<UserOutlined />} />
                    <Dropdown overlay={menu} arrow={true}>
                        <Button type="text">
                            {props.user?.userName}
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </div>
        </Header>
    )
}