import { Menu } from "antd"
import React, { useEffect, useState } from "react"
import {
    DashboardOutlined,
    UserOutlined,
    ReadOutlined,
    ApartmentOutlined,
    FileImageOutlined,
    AlertOutlined,
    CommentOutlined,
    SettingOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

export const MenuList = () => {

    const [activeKey, setActiveKey] = useState<string>('1');

    useEffect(() => {
        const act = localStorage.getItem('active_menu');
        setActiveKey(act || '1');
    }, []);

    const _preFix = "/admin";
    const onClick = (event: any) => {
        setActiveKey(event.key);
        localStorage.setItem('active_menu', event.key);
    }

    return (
        <Menu theme="dark" mode="inline" onClick={onClick} activeKey={activeKey}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to="/admin">Dashboard</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<ReadOutlined />} title="Blog">
                <Menu.Item key="2">
                    <Link to="/admin/post/list">Bài viết</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to={`${_preFix}/category/list`}>Danh mục</Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="5" icon={<FileImageOutlined />}>
                <Link to={`${_preFix}/banner/list`}>Hình ảnh</Link>
            </Menu.Item>
            <SubMenu key="sub2" icon={<UserOutlined />} title="Người dùng">
                <Menu.Item key="8">
                    <Link to="/admin/user/list">Danh sách</Link>
                </Menu.Item>
                <Menu.Item key="9">
                    <Link to="/admin/role/list">Quyền</Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="10" icon={<AlertOutlined />}>
                <Link to="/admin/partner">Đối tác</Link>
            </Menu.Item>
            <Menu.Item key="11" icon={<CommentOutlined />}>
                <Link to="/admin/comment/list">Bình luận</Link>
            </Menu.Item>
            <SubMenu key="sub3" icon={<SettingOutlined />} title="Cài đặt">
                <Menu.Item key="12">
                    <Link to="/admin/setting/menu">Menu</Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="13" icon={<AlertOutlined />}>
                <Link to="/admin/video">Video</Link>
            </Menu.Item>
        </Menu>
    )
}