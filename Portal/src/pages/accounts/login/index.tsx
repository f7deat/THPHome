import { ModalForm, ProCard, ProFormText } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Alert, Button, Col, Divider, Form, Layout, Row, message } from "antd";
import './index.css';
import { Helmet } from "@umijs/max";
import { FacebookOutlined, LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { apiLogin, apiLoginSSO } from "@/services/user";
import { useModel } from "@umijs/max";
import { flushSync } from "react-dom";
import { useState } from "react";

const { Password } = ProFormText;
const { Content } = Layout;

const Login: React.FC = () => {

    const { initialState, setInitialState } = useModel('@@initialState');
    const [open, setOpen] = useState<boolean>(false);
    const [openSSO, setOpenSSO] = useState<boolean>(false);

    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
            flushSync(() => {
                setInitialState((s) => ({
                    ...s,
                    currentUser: userInfo,
                }));
            });
        }
    };

    const onFinish = async (values: any) => {
        const response = await apiLogin(values);
        if (response.succeeded) {
            message.success('Đăng nhập thành công!')
            localStorage.setItem('wf_token', response.token || '');
            await fetchUserInfo();
            const urlParams = new URL(window.location.href).searchParams;
            history.push(urlParams.get('redirect') || '/');
        } else {
            message.error('Sai tên đăng nhập hoặc mật khẩu!')
        }
    }

    return (
        <Layout className="overflow-hidden">
            <Helmet>
                <title>Login - Hai Phong University</title>
            </Helmet>
            <Content className="h-screen">
                <Row gutter={16} className="h-full">
                    <Col md={8} className="h-full">
                        <ProCard className="h-full">
                            <div className="flex flex-col items-center justify-center gap-2 py-4 relative h-full">
                                <img src="https://dhhp.edu.vn/img/banner.png" alt="LOGO" className="w-full" />
                                <div className="login-form w-full">
                                    <Form layout="vertical" onFinish={onFinish}>
                                        <ProFormText label="Email hoặc Tài khoản" name="username"
                                            fieldProps={{
                                                size: "large",
                                                prefix: <UserOutlined />
                                            }}
                                            rules={[{ required: true }]}

                                        />
                                        <Password label="Mật khẩu" name='password'
                                            fieldProps={{
                                                size: "large",
                                                prefix: <LockOutlined />
                                            }}
                                            rules={[{ required: true }]}
                                        />
                                        <Button type="primary" htmlType="submit" icon={<LoginOutlined />}>Đăng nhập</Button>
                                    </Form>
                                    <div className="flex justify-end">
                                        <Button type="link" size="small" onClick={() => setOpen(true)}>Quên mật khẩu?</Button>
                                    </div>
                                    <Divider>Hoặc</Divider>
                                    <Alert type="warning" showIcon message="Từ ngày 17/07/2024 có thể đăng nhập SSO bằng tài khoản QLDT" />
                                    <div className="login-social">
                                        <Button size="large" className="w-full mb-2" icon={<LoginOutlined />} onClick={() => setOpenSSO(true)}>Đăng nhập SSO</Button>
                                        <Button type="primary" size="large" className="w-full" icon={<FacebookOutlined />}>Đăng nhập với Facebook</Button>
                                    </div>
                                </div>
                                <div className="copy-right">© 2022 <a href="https://dhhp.edu.vn">Hai Phong University</a></div>
                            </div>
                        </ProCard>
                    </Col>
                    <Col md={16} style={{
                        backgroundImage: `url('https://dhhp.edu.vn/assets/bg-login.png')`
                    }} className="bg-cover no-repeat">

                    </Col>
                </Row>
            </Content>
            <ModalForm open={open} onOpenChange={setOpen} title="Quên mật khẩu?">
                <ProFormText name="email" label="Địa chỉ email" rules={[
                    {
                        type: 'email'
                    },
                    {
                        required: true
                    }
                ]} />
            </ModalForm>
            <ModalForm open={openSSO} onOpenChange={setOpenSSO} title="Đăng nhập SSO" onFinish={async (values: any) => {
                const response = await apiLoginSSO(values);
                message.success('Đăng nhập thành công!')
                localStorage.setItem('wf_token', response.token || '');
                await fetchUserInfo();
                const urlParams = new URL(window.location.href).searchParams;
                history.push(urlParams.get('redirect') || '/');
            }}>
                <ProFormText name="userName" label="Tài khoản" rules={[
                    {
                        required: true
                    }
                ]} />
                <ProFormText.Password name="password" label="Mật khẩu" rules={[
                    {
                        required: true
                    }
                ]} />
            </ModalForm>
        </Layout>
    )
}

export default Login