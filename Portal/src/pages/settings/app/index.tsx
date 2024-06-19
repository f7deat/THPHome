import { apiSaveZalo, apiSettingList } from "@/services/setting";
import { SettingOutlined } from "@ant-design/icons";
import { ModalForm, PageContainer, ProCard, ProFormText } from "@ant-design/pro-components"
import { Button, message } from "antd";
import { useEffect, useState } from "react";

const AppPage: React.FC = () => {

    const [data, setData] = useState<any[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        apiSettingList().then((response: any) => {
            setData(response);
        });
    }, []);

    const onFinish = async (values: any) => {
        await apiSaveZalo(values);
        message.success('Lưu thành công!');
        setOpen(false);
    }

    return (
        <PageContainer>
            <div className="grid md:grid-cols-4 gap-4">
                {
                    data.map((app: any) => (
                        <ProCard key={app.id} title={app.name} headerBordered extra={<Button icon={<SettingOutlined />} type="text" size="small" onClick={() => setOpen(true)} />}>
                            <div className="flex gap-4">
                                <div className="md:w-20">
                                    <img src={app.icon} alt="icon" className="w-full" />
                                </div>
                                <div className="text-gray-500 flex-1">{app.description}</div>
                            </div>
                        </ProCard>
                    ))
                }
            </div>
            <ModalForm open={open} onOpenChange={setOpen} title="Cài đặt" onFinish={onFinish}>
                <ProFormText.Password name="accessToken" label="Access Token" rules={[
                    {
                        required: true
                    }
                ]} />
                <ProFormText.Password name="refreshToken" label="Refresh Token" rules={[
                    {
                        required: true
                    }
                ]} />
            </ModalForm>
        </PageContainer>
    )
}

export default AppPage;