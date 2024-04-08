import { ProForm, ProFormText } from "@ant-design/pro-components";
import { IBlock } from "./typings";
import { useEffect, useState } from "react";
import { queryBlock } from "@/services/block";
import FileUpload from "../files/upload";
import { IFileUpload } from "../files/typings";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const BannerBlock: React.FC<IBlock> = ({ id }) => {
    const form = ProForm.useFormInstance();
    const [openUpload, setOpenUpload] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            queryBlock(id).then(response => {
                form.setFields([
                    {
                        name: 'image',
                        value: response.image
                    },
                    {
                        name: 'className',
                        value: response.className
                    },
                    {
                        name: 'url',
                        value: response.url
                    }
                ]);
            })
        }
    }, [id]);

    const onUpload = (values: IFileUpload) => {
        form.setFieldValue('image', values.url);
    }

    return (
        <>
            <ProFormText label="Hình ảnh" name="image" rules={[
                {
                    required: true
                }
            ]} 
            fieldProps={{
                addonAfter: <Button type="text" size="small" icon={<UploadOutlined />} onClick={() => setOpenUpload(true)}>Upload</Button>
            }}
            />
            <ProFormText label="Liên kết" name="url" placeholder="https://" />
            <FileUpload open={openUpload} onCancel={() => setOpenUpload(false)} onFinish={onUpload} />
        </>
    )
}

export default BannerBlock;