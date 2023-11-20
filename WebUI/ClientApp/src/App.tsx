import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { MenuList } from './layout/menu-list';
import { AppRouter } from './appRouter';
import { AppHeader } from './layout/app-header';
import axios from 'axios';
import LostInSpaceLogin from './components/lost-in-space-login';

const { Sider, Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [user, setUser] = useState<any>()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        axios.get('/api/user/is-authenticated').then(response => {
            if (response.data) {
                axios.get('/api/user/get').then(user => {
                    setUser(user.data)
                })
                setIsAuthenticated(response.data);
                setLoading(false)
            } else {
                window.location.href = '/identity/account/login';
            }
        })
    }, [])
    return (
        loading ? (<div />) :
            !isAuthenticated ? (
                <Layout className="flex items-center h-full">
                    <LostInSpaceLogin />
                </Layout>) :
                (
                    <Layout className="h-full">
                        <Sider trigger={null} collapsible collapsed={collapsed} style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            top: 0,
                            bottom: 0,
                        }}>
                            <div className="logo">
                                <img src="/img/admin-logo.svg" alt="logo" style={{ height: 32 }} />
                            </div>
                            <MenuList />
                        </Sider>
                        <Layout className="site-layout" style={{ marginLeft: 200 }}>
                            <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} user={user} />
                            <Content className="p-4">
                                <AppRouter />
                            </Content>
                        </Layout>
                    </Layout>
                )
    );
}

export default App;
