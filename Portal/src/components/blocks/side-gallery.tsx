import { PlusOutlined } from "@ant-design/icons";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { request } from "@umijs/max";
import { Badge, Button, Image, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { BlockProps } from "./typings";
import MyCkEditor from "../my-ckeditor";

const SideGalleryBlock: React.FC<BlockProps> = (props) => {

    const [images, setImages] = useState<string[]>([]);
    const [fileList, setFileList] = useState<any>([]);
    const [dataSource, setDataSource] = useState<any>();

    const form = ProForm.useFormInstance();

    useEffect(() => {
        if (props.data) {
                form.setFields([
                    {
                        name: 'textContent',
                        value: props.data.textContent
                    },
                    {
                        name: 'images',
                        value: props.data.images
                    },
                    {
                        name: 'className',
                        value: props.data.className
                    }
                ]);
                setDataSource(props.data);
                if (props.data.images) {
                    setImages(props.data.images);
                } else {
                    setImages([]);
                }
        }
    }, [props.data]);

    useEffect(() => {
        setFileList([]);
    }, [form, props.data]);

    return (
        <>
            <ProFormText name="images" hidden />
            <MyCkEditor name="textContent" label="Nội dung" initialValue={dataSource?.textContent} />
            <div className="flex gap-4" style={{
                gap: 8,
                flexWrap: 'wrap'
            }}>
                {
                    images.map((logo: string, i: number) => (
                        <div className="relative" key={i} style={{
                            border: '1px solid #d1d1d1',
                            borderRadius: 8,
                            marginBottom: 8,
                            padding: 4
                        }}>
                            <Badge.Ribbon text={<Button
                                onClick={() => {
                                    setImages(images.filter(x => x !== logo));
                                }}
                                type="text" size="small" style={{
                                    color: 'white'
                                }}>Xóa</Button>}>
                                <Image src={logo} alt="LOGO" width={90} height={90} style={{
                                    borderRadius: 8,
                                    objectFit: 'cover'
                                }} />
                            </Badge.Ribbon>
                        </div>
                    ))
                }
                <Upload
                    beforeUpload={(file) => {
                        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                        if (!isJPG) {
                            message.error('You can only upload JPG or PNG file!');
                            return false;
                        } else {
                            const formData = new FormData();
                            formData.append('file', file);
                            request('file/upload', {
                                method: 'POST',
                                data: formData
                            }).then(response => {
                                if (!response.succeeded) {
                                    message.error(response.message);
                                    return false;
                                }
                                images.push(response.url);
                                setImages(images);
                                form.setFieldValue('images', images);
                            })
                            return false;
                        }
                    }}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={({ fileList: newFileList }) => {
                        setFileList([newFileList.pop()]);
                    }}
                >
                    <button style={{ border: 0, background: 'none' }} type="button">
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                </Upload>
            </div>
        </>
    )
}

export default SideGalleryBlock;