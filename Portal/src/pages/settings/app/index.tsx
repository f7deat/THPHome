import { apiGetZalo, apiSaveZalo, apiSettingList } from "@/services/setting";
import { HistoryOutlined, SettingOutlined } from "@ant-design/icons";
import { ModalForm, PageContainer, ProCard, ProFormInstance, ProFormText } from "@ant-design/pro-components"
import { Link } from "@umijs/max";
import { Alert, Button, Tooltip, message } from "antd";
import { useEffect, useRef, useState } from "react";

const AppPage: React.FC = () => {

    const [data, setData] = useState<any[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<ProFormInstance>();

    useEffect(() => {
        if (!open) return;
        apiGetZalo().then(response => {
            formRef.current?.setFields([
                {
                    name: 'refreshToken',
                    value: response.refreshToken
                }
            ])
        })
    }, [open]);

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
                        <ProCard
                            actions={[
                                <Tooltip title="Xem lịch sử chia sẻ" key="history">
                                    <Link to='/settings/application/zalo-article'>
                                        <HistoryOutlined />
                                    </Link>
                                </Tooltip>
                            ]}
                            key={app.id} title={app.name} headerBordered extra={<Button icon={<SettingOutlined />} type="text" size="small" onClick={() => setOpen(true)} />}>
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
            <ModalForm open={open} onOpenChange={setOpen} title="Cài đặt" onFinish={onFinish} formRef={formRef}>
                <Alert type="warning" message="Mỗi 3 tháng cần vào https://developers.zalo.me/tools/explorer lấy refresh token một lần." className="mb-4" showIcon />
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