import { ProCard, ProFormCheckbox, ProFormText, StepsForm } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, Col, Divider, Form, FormInstance, Layout, Row, Spin, message } from "antd";
import { useEffect, useRef, useState } from "react";
import './index.css';
import { Helmet } from "@umijs/max";
import { ApartmentOutlined, FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { apiLogin } from "@/services/user";
import { useModel } from "@umijs/max";
import { flushSync } from "react-dom";

const { Password } = ProFormText;
const { Content } = Layout;

const Login: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const { initialState, setInitialState } = useModel('@@initialState');

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
            {
                loading ? (<Spin fullscreen />) : (
                    <Content>
                        <Row gutter={16}>
                            <Col md={8}>
                                <ProCard>
                                    <div className="flex flex-col items-center justify-center gap-2 py-4 relative h-screen">
                                        <img src="https://dhhp.edu.vn/img/banner.png" alt="LOGO" className="w-full" />
                                        <div className="login-form w-full">
                                            <Form layout="vertical" onFinish={onFinish}>
                                                <ProFormText label="Email" name="username"
                                                    fieldProps={{
                                                        size: "large"
                                                    }}
                                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                                />
                                                <Password label="Password" name='password'
                                                    fieldProps={{
                                                        size: "large"
                                                    }}
                                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                                />
                                                <Button type="primary" htmlType="submit">Đăng nhập</Button>
                                            </Form>
                                            <Divider>Hoặc</Divider>
                                            <div className="login-social">
                                                <Button size="large" className="w-full mb-2" icon={<GoogleOutlined />}>Login with Google</Button>
                                                <Button type="primary" size="large" className="w-full" icon={<FacebookOutlined />}>Login with Facebook</Button>
                                            </div>
                                        </div>
                                        <div className="copy-right">© 2022 <a href="https://dhhp.edu.vn">Hai Phong University</a></div>
                                    </div>
                                </ProCard>
                            </Col>
                            <Col md={16}>

                            </Col>
                        </Row>
                    </Content>
                )
            }
        </Layout>
    )
}

export default Login