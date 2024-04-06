import { Row, Col, Drawer, Input, Button, message, Select, Popconfirm, Upload, Form, Image, Radio } from "antd"
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    SaveOutlined,
    UploadOutlined
} from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from "react";
import { BANNER_TYPE } from "./enums/banner-type";
import { request } from "@umijs/max";
import { PageContainer, ProCard, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import FileUpload from "@/components/files/upload";
import { apiPostOptions } from "@/services/post";

const BannerList = () => {
    const [visible, setVisible] = useState(false);
    const [listBanner, setListBanner] = useState<any>();
    const [form] = Form.useForm();
    const [openUpload, setOpenUpload] = useState<boolean>(false);
    const [extraType, setExtraType] = useState<string>('post');
    const [banner, setBanner] = useState<any>();

    const init = useCallback(() => {
        request(`banner/get-list?type=${BANNER_TYPE.SLIDE}`).then(response => {
            setListBanner(response);
        })
    }, [])

    useEffect(() => {
        init()
    }, [init]);

    useEffect(() => {
        if (banner) {
            form.setFields([
                {
                    name: 'id',
                    value: banner.id
                },
                {
                    name: 'name',
                    value: banner.name
                },
                {
                    name: 'image',
                    value: banner.image
                },
                {
                    name: 'url',
                    value: banner.url
                },
                {
                    name: 'postId',
                    value: banner.postId
                },
                {
                    name: 'description',
                    value: banner.description
                }
            ])
        }
    }, [banner]);

    const showDrawer = (item: any) => {

        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const save = (values: any) => {
        values.type = BANNER_TYPE.SLIDE;
        if (values.id) {
            request(`banner/update`, {
                method: 'POST',
                data: values
            }).then(response => {
                if (response.succeeded) {
                    init();
                    message.success('succeeded!');
                    setVisible(false);
                    form.resetFields();
                }
            })
        } else {
            request(`banner/add`, {
                method: 'POST',
                data: values
            }).then(response => {
                if (response.succeeded) {
                    init();
                    message.success('succeeded!');
                    setVisible(false);
                    form.resetFields();
                }
            })
        }
    }

    function remove(id: number) {
        request(`banner/delete/${id}`, {
            method: 'POST'
        }).then(response => {
            if (response.succeeded) {
                init();
                message.success('succeeded!');
            }
        })
    }

    function handleDelete(id: number) {
        remove(id)
    }

    const absoluteUri = (url: string) => {
        if (!url.startsWith('http')) {
            return `https://dhhp.edu.vn${url}`;
        }
        return url;
    }

    const onUpload = async (values: any) => {
        if (values.succeeded) {
            form.setFieldValue('image', values.url);
        }
    }

    return (
        <PageContainer extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setVisible(true)}>Thêm mới</Button>}>
            <Row gutter={16}>
                {
                    listBanner && listBanner.map((item: any) => (
                        <Col span={6} key={item.id}>
                            <ProCard className="mb-4" actions={[
                                <EditOutlined key="edit" onClick={() => {
                                    setBanner(item);
                                    setVisible(true);
                                }} />,
                                <Popconfirm key="delete"
                                    title="Are you sure to delete?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => handleDelete(item.id)}
                                >
                                    <DeleteOutlined />
                                </Popconfirm>
                            ]}>
                                <div className="relative w-full bg-white border border-dashed border-gray-500 flex justify-center items-center hover:border-blue-600 hover:text-blue-600">
                                    <Image src={absoluteUri(item.image)} alt={item.name} height={200} wrapperClassName="w-full" style={{
                                        objectFit: 'cover'
                                    }} />
                                </div>
                            </ProCard>
                        </Col>
                    ))
                }
            </Row>
            <Drawer
                title="Slider"
                placement="right"
                closable={false}
                onClose={onClose}
                open={visible}
                width={700}
            >
                <Form form={form} layout="vertical" onFinish={save}>
                    <ProFormText name="id" hidden />
                    <ProFormText name="image" className="w-full" label="Hình ảnh" rules={[
                        {
                            required: true
                        }
                    ]}
                        fieldProps={{
                            addonAfter: <Button type="text" size="small" icon={<UploadOutlined />} onClick={() => setOpenUpload(true)}>Tải lên</Button>
                        }} />
                    <div className="mb-3">
                        <Radio.Group defaultValue={extraType} onChange={(e) => setExtraType(e.target.value)}>
                            <Radio value="post">Bài viết</Radio>
                            <Radio value="link">Liên kết ngoài</Radio>
                        </Radio.Group>
                    </div>
                    {
                        extraType === 'link' && (
                            <>
                                <ProFormText name="url" placeholder="https://" label="Liên kết" />
                                <ProFormText name="name" label="Tiêu đề" />
                                <ProFormTextArea name="description" label="Mô tả" />
                            </>
                        )
                    }
                    {
                        extraType === 'post' && <ProFormSelect name="postId" request={apiPostOptions} showSearch label="Chọn bài viết" />
                    }
                    <Button type="primary" icon={<SaveOutlined />} htmlType="submit">Lưu</Button>
                </Form>
            </Drawer>
            <FileUpload open={openUpload} onCancel={() => setOpenUpload(false)} onFinish={onUpload} />
        </PageContainer>
    )
}

export default BannerList