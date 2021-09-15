import { Row, Col, Drawer, Input, Button, message, Select, Popconfirm, Upload } from "antd"
import {
    PlusOutlined,
    SaveOutlined,
    UploadOutlined
} from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BANNER_TYPE, LIST_BANNER_TYPE } from "./enums/banner-type";
import { FileExplorer } from "../files/file-explorer";

const { Option } = Select;

const BannerList = () => {
    const [visible, setVisible] = useState(false);
    const [banner, setBanner] = useState<any>();
    const [listBanner, setListBanner] = useState<any>();
    const [bannerType, setBannerType] = useState(BANNER_TYPE.PHOTO)
    const [explorerVisible, setExplorerVisible] = useState<boolean>(false)

    const optionList = LIST_BANNER_TYPE.map((value) => (
        <Option value={value.id} key={value.id}>{value.name}</Option>
    ))

    const init = useCallback(() =>  {
        axios.get(`/api/banner/get-list?type=${bannerType}`).then(response => {
            setListBanner(response.data);
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
        if (banner.id) {
            axios.post(`/api/banner/update`, banner).then(response => {
                if(response.data.succeeded) {
                    init();
                    message.success('succeeded!');
                    setVisible(false);
                }
            })
        } else {
            axios.post(`/api/banner/add`, banner).then(response => {
                if (response.data.succeeded) {
                    init();
                    message.success('succeeded!');
                    setVisible(false);
                }
            })
        }
    }

    function remove(id: number) {
        axios.post(`/api/banner/delete/${id}`).then(response => {
            if (response.data.succeeded) {
                init();
                message.success('succeeded!');
            }
        })
    }

    function handleDelete(id: number) {
        remove(id)
    }

    const handleUpload = (info: any) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            setBanner((prevState: any) => ({ ...prevState, image: info.file.response.fileUrl }))
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    const handleExplorer = () => {
        setExplorerVisible(true)
    }

    const handleExplorerOk = () => {
        setExplorerVisible(false)
    }

    return (
        <div>
            <div className="mb-4">
                <Select defaultValue={bannerType} style={{ width: 120 }} onChange={(value) => setBannerType(value)}>
                    {optionList}
                </Select>
            </div>
            <Row gutter={16}>
                <Col span={6}>
                    <div className="h-40 w-full bg-white border border-dashed border-gray-500 flex justify-center items-center hover:border-blue-600 cursor-pointer hover:text-blue-600" onClick={() => showDrawer({})}>
                        <PlusOutlined />
                    </div>
                </Col>
                {
                    listBanner && listBanner.map((item: any) => (
                        <Col span={6} key={item.id}>
                            <div className="relative w-full bg-white border border-dashed border-gray-500 flex justify-center items-center hover:border-blue-600 hover:text-blue-600">
                                <img src={item.image} alt={item.name} className="object-fit-cover w-full h-40" />
                                <div className="flex absolute bottom-0 w-full">
                                    <div className="w-1/2 flex justify-center py-1 bg-white cursor-pointer hover:bg-red-500 hover:text-white" onClick={() => showDrawer(item)}>
                                        Chi tiết
                                    </div>
                                    <Popconfirm
                                        title="Are you sure to delete?"
                                        okText="Yes"
                                        cancelText="No"
                                        onConfirm={() => handleDelete(item.id)}
                                    >
                                        <div className="w-1/2 flex justify-center py-1 bg-white cursor-pointer hover:bg-red-500 hover:text-white">
                                            Xóa
                                        </div>
                                    </Popconfirm>
                                    
                                </div>
                            </div>
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
                <img src={banner?.image || "http://placehold.jp/40/0a1c2e/ccd7e3/650x250.png?text=DefZone.Net"} alt="preview" className="object-fit-cover w-full h-40 mb-2" />
                <div>Name</div>
                <Input className="mb-2" value={banner?.name} onChange={(e: any) => setBanner((prevState: any) => ({ ...prevState, name: e.target.value }))} />
                <div>Image</div>
                <div className="flex mb-2">
                    <Input className="flex-grow" value={banner?.image} onChange={(e: any) => setBanner((prevState: any) => ({ ...prevState, image: e.target.value }))} />
                    <Upload action="/api/partner/upload" onChange={handleUpload} maxCount={1} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Tải lên</Button>
                    </Upload>
                    <Button icon={<UploadOutlined />} onClick={handleExplorer}>Duyệt</Button>
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
            </Drawer>
            <FileExplorer visible={explorerVisible} onOk={handleExplorerOk} onCancel={() => setExplorerVisible(false)} />
        </div>
    )
}

export default BannerList