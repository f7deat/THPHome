import { apiAddPartner, apiGePartner, apiUpdatePartner } from "@/services/partner";
import { UploadOutlined } from "@ant-design/icons";
import { DrawerForm, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Button, Image, message } from "antd";
import { useEffect, useRef, useState } from "react";

type Props = {
    open: boolean;
    setOpen: any;
    id?: number;
    actionRef?: any;
}

const PartnerSetting: React.FC<Props> = ({ open, setOpen, id, actionRef }) => {

    const formRef = useRef<ProFormInstance>();
    const [logo, setLogo] = useState<string>('');

    useEffect(() => {
        if (id) {
            apiGePartner(id).then((response: any) => {
                formRef.current?.setFields([
                    {
                        name: 'id',
                        value: response.id
                    },
                    {
                        name: 'name',
                        value: response.name
                    },
                    {
                        name: 'logo',
                        value: response.logo
                    },
                    {
                        name: 'description',
                        value: response.description
                    },
                    {
                        name: 'url',
                        value: response.url
                    },
                    {
                        name: 'status',
                        value: response.status
                    }
                ]);
                setLogo(response.logo);
            })
        } else {
            formRef.current?.resetFields();
        }
    }, [id])

    const onFinish = async (values: any) => {
        if (id) {
            await apiUpdatePartner(values);
        } else {
            await apiAddPartner(values);
        }
        setOpen(false);
        message.success('Thành công!');
        actionRef.current?.reload();
    };

    return (
        <>
            <DrawerForm
                open={open}
                onOpenChange={setOpen}
                title="Cài đặt"
                width={700}
                formRef={formRef}
                onFinish={onFinish}
            >
                <ProFormText hidden={true} name="id" />
                <ProFormText label="Tên đối tác" name="name" rules={[
                    {
                        required: true
                    }
                ]} />
                {
                    logo && <div className="flex justify-center mb-4"><Image src={logo} width={150} /></div>
                }
                <ProFormText label="Logo" name="logo" rules={[
                    {
                        required: true
                    }
                ]} fieldProps={{
                    addonAfter: <span><UploadOutlined /> Upload</span>
                }} />
                <ProFormTextArea label="Description" name="description" />
                <ProFormText label="Liên kết" name="url" />
                <ProFormSelect name="status" label="Trạng thái" rules={[
                    {
                        required: true
                    }
                ]} options={[
                    {
                        label: 'Draft',
                        value: 0
                    },
                    {
                        label: 'Active',
                        value: 1
                    }
                ]} />
            </DrawerForm>
        </>
    )
}

export default PartnerSetting;