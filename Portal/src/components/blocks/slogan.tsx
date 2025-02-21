import { ProForm, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { BlockProps } from "./typings";
import { Button, Image, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { apiUploadImage } from "@/services/file";

const SloganBlock: React.FC<BlockProps> = (props) => {

    const formRef = ProForm.useFormInstance();
    const [previewImage, setPreviewImage] = useState<string>('https://placehold.jp/1000x150.png');

    useEffect(() => {
        if (props.data) {
            formRef.setFields([
                {
                    name: 'className',
                    value: props.data?.className
                },
                {
                    name: 'title',
                    value: props.data?.title
                }
            ]);
            setPreviewImage(props.data?.image);
        }
    }, [props.data]);

    return (
        <>
            <ProFormTextArea label="Tiêu đề" name="title" />
            <div className="mb-4 flex justify-center">
                <Image src={previewImage} className="w-full" />
            </div>
            <ProFormText label="Hình ảnh" name='image' fieldProps={{
                suffix: <Upload beforeUpload={(file) => {
                    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                    if (!isJPG) {
                        message.error('You can only upload JPG or PNG file!');
                        return false;
                    } else {
                        const formData = new FormData();
                        formData.append('file', file);
                        apiUploadImage(formData).then((response: any) => {
                            if (!response.succeeded) {
                                message.error(response.message);
                                return false;
                            }
                            formRef?.setFieldValue('image', response.url);
                            setPreviewImage(response.url)
                        })
                        return false;
                    }
                }} maxCount={1} showUploadList={false}>
                    <Button icon={<UploadOutlined />} size='small' type='dashed'>Tải lên</Button>
                </Upload>
            }} />
        </>
    )
}

export default SloganBlock;