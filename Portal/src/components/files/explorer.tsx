import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { ActionType, ProCard, ProTable } from "@ant-design/pro-components"
import { Button, Col, Empty, Image, Modal, Row, Space, Tooltip } from "antd";
import FileUpload from "./upload";
import { useRef, useState } from "react";
import { apiFileList } from "@/services/file";
import { humanFileSize } from "@/utils/format";

type Props = {
    open: boolean;
    setOpen: any;
}

const FileExplorer: React.FC<Props> = ({ open, setOpen }) => {

    const [openUpload, setOpenUpload] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [file, setFile] = useState<any>();

    const onUploadFinish = () => {
        actionRef.current?.reload();
    }

    return (
        <Modal width={1000} open={open} title="File Explorer" onCancel={() => setOpen(false)}
            footer={false}
            centered>
            <Row gutter={16}>
                <Col span={18}>
                    <ProTable
                        search={false}
                        columns={[
                            {
                                title: '#',
                                valueType: 'indexBorder'
                            },
                            {
                                title: 'Name',
                                dataIndex: 'fileName',
                                render: (dom, entity) => (
                                    <Tooltip title={dom}>
                                        <Button size="small" onClick={() => setFile(entity)} type="text" style={{
                                            maxWidth: 300,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>{dom}</Button>
                                    </Tooltip>
                                )
                            },
                            {
                                title: 'Size',
                                dataIndex: 'size',
                                render: (dom, entity) => humanFileSize(entity.size)
                            },
                            {
                                title: 'Upload',
                                dataIndex: 'createdDate',
                                valueType: 'dateTime',
                                width: 200
                            },
                            {
                                title: 'Tác vụ',
                                valueType: 'option',
                                render: () => [
                                    <Button size="small" type="text" icon={<DownloadOutlined />} />
                                ],
                                width: 60
                            }
                        ]}
                        size="small"
                        request={apiFileList}
                        actionRef={actionRef}
                        ghost toolBarRender={() => [
                            <Button key="upload" icon={<UploadOutlined />} type="primary" onClick={() => setOpenUpload(true)}>Upload</Button>
                        ]}
                        pagination={{
                            pageSize: 5
                        }}
                    />
                </Col>
                <Col span={6}>
                    <ProCard
                        size="small"
                        title="Preview"
                        headerBordered
                        bordered>
                        {
                            file ? (
                                <>
                                    <div className="mb-2">
                                        <Image src={file.url} height={150} style={{
                                            objectFit: 'contain'
                                        }} />
                                    </div>
                                    <div className="mb-2">
                                        Size: {humanFileSize(file.size)}
                                    </div>
                                    <Button className="w-full" type="primary">Chọn</Button>
                                </>
                            ) : (<Empty />)
                        }
                    </ProCard>
                </Col>
            </Row>
            <FileUpload open={openUpload} onCancel={() => setOpenUpload(false)} onFinish={onUploadFinish} />
        </Modal>
    )
}

export default FileExplorer;