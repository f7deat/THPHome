import { ProCard, ProFormCheckbox, ProFormText, StepsForm } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, Col, Divider, Form, FormInstance, Layout, Row, Spin, message } from "antd";
import { useEffect, useRef, useState } from "react";
import './index.css';
import { Helmet } from "@umijs/max";
import { ApartmentOutlined, FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { apiLogin } from "@/services/user";

const { Password } = ProFormText;
const { Content } = Layout;

const Login: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const formRef = useRef<FormInstance>();

    useEffect(() => {
        const token = localStorage.getItem('def_token');
        if (true) {
            history.push('/accounts/login');
        } else {
            setLoading(false)
        }
        const host = localStorage.getItem('baseURL');
        if (host) {
            formRef.current?.setFieldsValue({
                name: 'host',
                value: host
            });
        }
    }, [])

    function isValidHttpUrl(value: string) {
        let url;

        try {
            url = new URL(value);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }

    const onFinish = async (values: any) => {
        apiLogin(values).then(response => {
            if (response.succeeded) {
                localStorage.setItem('wf_token', response.token || '');
                history.push('/home')
            } else {
                message.error('Username or password incorrect!')
            }
        })
    }

    const handleNexStep = async (values: { host: string }) => {
        if (isValidHttpUrl(values.host)) {
            if (values.host.endsWith('/')) {
                localStorage.setItem('baseURL', values.host + 'api/');
            } else {
                localStorage.setItem('baseURL', values.host + '/api/');
            }
            return true;
        }
        message.error('Please input valid URL. e.g: https://example.com');
        return false;
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