import { Menu } from "antd"
import React from "react"
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

    const _preFix = "/admin";

    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to="/admin">Dashboard</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<ReadOutlined />} title="Blog">
                <Menu.Item key="2">
                    <Link to="/admin/post/list">Bài viết</Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<ApartmentOutlined />}>
                <Link to={`${_preFix}/category/list`}>Category</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<FileImageOutlined />}>
                <Link to={`${_preFix}/banner/list`}>Image</Link>
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
                <Link to="/admin/partner">Partner</Link>
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