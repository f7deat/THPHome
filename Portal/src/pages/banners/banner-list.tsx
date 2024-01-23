import { Row, Col, Drawer, Input, Button, message, Select, Popconfirm, Upload, Form, Space, Image } from "antd"
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    SaveOutlined,
    UploadOutlined
} from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from "react";
import { BANNER_TYPE, LIST_BANNER_TYPE } from "./enums/banner-type";
import FileExplorer from "../files/file-explorer";
import { request } from "@umijs/max";
import { PageContainer, ProCard } from "@ant-design/pro-components";

const { Option } = Select;

const BannerList = () => {
    const [visible, setVisible] = useState(false);
    const [banner, setBanner] = useState<any>();
    const [listBanner, setListBanner] = useState<any>();
    const [bannerType, setBannerType] = useState(BANNER_TYPE.PHOTO)
    const [explorerVisible, setExplorerVisible] = useState<boolean>(false)
    const [form] = Form.useForm();

    const optionList = LIST_BANNER_TYPE.map((value) => (
        <Option value={value.id} key={value.id}>{value.name}</Option>
    ))

    const init = useCallback(() => {
        request(`banner/get-list?type=${bannerType}`).then(response => {
            setListBanner(response);
        })
    }, [bannerType])

    useEffect(() => {
        init()
    }, [init])

    const showDrawer = (item: any) => {
        setBannerType(item.type || BANNER_TYPE.PHOTO)
        setBanner(item);
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const save = () => {
        banner.image = form.getFieldValue('image');
        if (banner.id) {
            request(`banner/update`, {
                method: 'POST',
                data: banner
            }).then(response => {
                if (response.succeeded) {
                    init();
                    message.success('succeeded!');
                    setVisible(false);
                }
            })
        } else {
            request(`banner/add`, {
                method: 'POST',
                data: banner
            }).then(response => {
                if (response.succeeded) {
                    init();
                    message.success('succeeded!');
                    setVisible(false);
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

    const handleExplorer = () => {
        setExplorerVisible(true)
    }

    const handleExplorerOk = () => {
        setExplorerVisible(false)
    }

    const absoluteUri = (url: string) => {
        if (!url.startsWith('http')) {
            return `https://dhhp.edu.vn${url}`;
        }
        return url;
    }

    return (
        <PageContainer>
            <div className="mb-4">
                <Select defaultValue={bannerType} style={{ width: 120 }} onChange={(value) => setBannerType(value)}>
                    {optionList}
                </Select>
            </div>
            <Row gutter={16}>
                <Col span={6}>
                    <ProCard className="h-full flex items-center justify-center mb-4"  onClick={() => showDrawer({})}>
                        <PlusOutlined />
                    </ProCard>
                </Col>
                {
                    listBanner && listBanner.map((item: any) => (
                        <Col span={6} key={item.id}>
                            <ProCard className="mb-4" actions={[
                                <EditOutlined key="edit" onClick={() => showDrawer(item)} />,
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
                title="Banner"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={700}
            >
                <Form form={form} layout="vertical">
                    <div>Name</div>
                    <Input className="mb-2" value={banner?.name} onChange={(e: any) => setBanner((prevState: any) => ({ ...prevState, name: e.target.value }))} />
                    <div className="flex mb-2">
                        <Space>
                            <Form.Item name="image" label="Image">
                                <Input />
                            </Form.Item>
                            <Upload beforeUpload={(file) => {
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
                                        form.setFieldValue('image', response.url);
                                    })
                                    return false;
                                }
                            }} maxCount={1} showUploadList={false}>
                                <Button icon={<UploadOutlined />}>Tải lên</Button>
                            </Upload>
                            <Button icon={<UploadOutlined />} onClick={handleExplorer}>Duyệt</Button>
                        </Space>
                    </div>
                    <div>Url</div>
                    <Input className="mb-2" value={banner?.url} onChange={(e: any) => setBanner((prevState: any) => ({ ...prevState, url: e.target.value }))} />
                    <div>Display On</div>
                    <Input className="mb-2" value={banner?.displayOn} onChange={(e: any) => setBanner((prevState: any) => ({ ...prevState, displayOn: Number(e.target.value) }))} />
                    <div>Type</div>
                    <Select defaultValue={banner?.type} style={{ width: '100%' }} onChange={(value) => setBanner((prevState: any) => ({ ...prevState, type: value }))} className="mb-3">
                        {optionList}
                    </Select>
                    <Button type="primary" icon={<SaveOutlined />} onClick={save}>Lưu</Button>
                </Form>
            </Drawer>
            <FileExplorer visible={explorerVisible} onOk={handleExplorerOk} onCancel={() => setExplorerVisible(false)} />
        </PageContainer>
    )
}

export default BannerList