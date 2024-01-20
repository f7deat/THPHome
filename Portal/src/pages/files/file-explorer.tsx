import { Button, Col, Drawer, Input, message, Popconfirm, Popover, Row, Space, Image, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { FileDrawerProps } from "./types/file-explorer-props";
import {
    SaveOutlined,
    CloseOutlined,
    InboxOutlined,
    SearchOutlined,
    FolderTwoTone,
    FileTwoTone,
    DeleteTwoTone
} from '@ant-design/icons';
import Dragger from "antd/lib/upload/Dragger";
import moment from "moment";
import { request } from "@umijs/max";

export default function FileExplorer(props: FileDrawerProps) {

    const [directories, setDirectories] = useState<any>([])
    const [file, setFile] = useState<string>('')

    useEffect(() => {
        if (props.visible) {
            fetchDirectories();
        }
    }, [props.visible])

    function fetchDirectories() {
        request(`file/directories`).then(response => {
            setDirectories(response)
        })
    }

    const handleOk = () => {
        if (!file) {
            return message.warning('Please choose a file!');
        }
        props.onOk(file)
    }

    function handleSelect(item: string) {

    }

    function handleSelectFile(file: string) {
        setFile(file)
    }

    const handleUpload = (info: any) => {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            fetchDirectories();
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    function handleDelete(fullName: string) {
        request(`/api/file/delete`, {
            method: 'POST',
            data: { fullName }
        }).then(response => {
            if (response.data.succeeded) {
                fetchDirectories();
                message.success(response.data.message);
            } else {
                message.error(response.data.message);
            }
        })
    }

    function validateFile(fileName: string) {
        var imgExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
        var fileExtension = fileName.split('.').pop()?.toLowerCase() || '';

        return imgExtension.includes(fileExtension);
    }

    function previewFile(file: any) {
        if (validateFile(file.name)) {
            return (
                <div>
                    <Image src={file.fullName} width={200} />
                </div>
            )
        }
        return <Empty />
    }

    return (
        <Drawer
            title="File Explorer"
            placement="right"
            closable={false}
            visible={props.visible}
            width={900}
        >
            <div className="mb-4">
                <Dragger action="/api/file/upload" onChange={handleUpload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
            </div>
            <div className="mb-4">
                <Space className="mb-2">
                    <Input />
                    <Button type="primary" icon={<SearchOutlined />}></Button>
                </Space>
                <div className="border" style={{ minHeight: 'calc(100vh - 360px)' }}>
                    {
                        directories?.folders?.map((folder: any, index: number) => (
                            <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer" key={index} onDoubleClick={() => handleSelect(folder)}>
                                {<FolderTwoTone className="mr-2" />}{folder.name}
                            </div>
                        ))
                    }
                    {
                        directories?.files?.map((file: any, index: number) => (
                            <button className="px-2 py-1 hover:bg-gray-100 w-full text-left bg-white focus:bg-gray-100" key={index} onClick={() => handleSelectFile(file)}>
                                <Row className="items-center">
                                    <Col span={12}>
                                        <Popover content={previewFile(file)} title="Preview">
                                            {<FileTwoTone className="mr-2" />}{file.name}
                                        </Popover>
                                    </Col>
                                    <Col span={6}>{moment(file.lastWriteTime).format('MM/DD/YYYY h:mm:ss A')}</Col>
                                    <Col span={3}>{file.length} KB</Col>
                                    <Col span={3} className="text-right">
                                        <Popconfirm
                                            title="Are you sure to delete?"
                                            okText="Yes"
                                            cancelText="No"
                                            onConfirm={() => handleDelete(file.fullName)}
                                        >
                                            <DeleteTwoTone twoToneColor="red" />
                                        </Popconfirm>
                                    </Col>
                                </Row>
                            </button>
                        ))
                    }
                </div>
            </div>

            <Space>
                <Button onClick={handleOk} icon={<SaveOutlined />} type="primary">Ok</Button>
                <Button onClick={props.onCancel} icon={<CloseOutlined />}>Close</Button>
            </Space>
        </Drawer>
    )
}