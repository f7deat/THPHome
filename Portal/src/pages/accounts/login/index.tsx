import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, Divider, Form, Layout, message } from "antd";
import { Helmet } from "@umijs/max";
import { GoogleCircleFilled, LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { apiLogin } from "@/services/user";
import { useModel } from "@umijs/max";
import { flushSync } from "react-dom";
import { useState } from "react";

const { Password } = ProFormText;
const { Content } = Layout;

const Login: React.FC = () => {

    const { initialState, setInitialState } = useModel('@@initialState');
    const [open, setOpen] = useState<boolean>(false);

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
            localStorage.setItem('thp_token', response.token || '');
            await fetchUserInfo();
            const urlParams = new URL(window.location.href).searchParams;
            history.push(urlParams.get('redirect') || '/');
        } else {
            message.error('Sai tên đăng nhập hoặc mật khẩu!');
        }
    }

    return (
        <Layout className="overflow-hidden">
            <Helmet>
                <title>Đăng nhập - Đại học Hải Phòng</title>
            </Helmet>
            <Content className="h-screen">
                <div className="h-full flex">
                    <div className="h-full relative md:w-1/3 shadow-lg">
                        <img src="https://dhhp.edu.vn/css/imgs/login_background.svg" className="absolute bottom-0" />
                        <div className="h-full flex flex-col justify-between items-center bg-white w-full">
                            <div className="flex flex-col items-center justify-center gap-2 py-4 relative flex-1 w-full px-10 md:px-20">
                                <img src="https://dhhp.edu.vn/img/banner.png" alt="LOGO" className="mb-4" />
                                <div className="mb-4 w-full">
                                    <Form layout="vertical" onFinish={onFinish}>
                                        <ProFormText label="Tài khoản" name="username"
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
                                        <Button type="primary" htmlType="submit" icon={<LoginOutlined />} className="shadow w-full" size="large">Đăng nhập</Button>
                                    </Form>
                                </div>
                                <div className="flex justify-end w-full">
                                    <Button type="link" size="small" onClick={() => setOpen(true)} className="poppins-regular">Quên mật khẩu?</Button>
                                </div>
                                <Divider>Hoặc</Divider>
                                <div className="flex justify-center w-full gap-4">
                                    <div className="w-10 text-white flex items-center justify-center h-10 bg-blue-500 rounded-full">
                                        <GoogleCircleFilled className="text-lg" />
                                    </div>
                                    </div>
                            </div>
                            <div className="p-4 poppins-medium">© 2022 <a href="https://dhhp.edu.vn">Hai Phong University</a></div>
                        </div>
                    </div>
                    <div style={{
                        backgroundImage: `url('https://dhhp.edu.vn/assets/bg-login.png')`
                    }} className="bg-cover no-repeat md:w-2/3">

                    </div>
                </div>
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
        </Layout>
    )
}

export default Login