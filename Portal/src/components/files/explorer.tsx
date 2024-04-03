import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { ActionType, ProCard, ProTable } from "@ant-design/pro-components"
import { Button, Col, Image, Modal, Row, Space, Tooltip } from "antd";
import FileUpload from "./upload";
import { useRef, useState } from "react";
import { apiFileList } from "@/services/file";

type Props = {
    open: boolean;
    setOpen: any;
}

const FileExplorer: React.FC<Props> = ({ open, setOpen }) => {

    const [openUpload, setOpenUpload] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [thumbnail, setThumbnail] = useState<string>('');

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
                                        <Button size="small" onClick={() => setThumbnail(entity.url)} type="text" style={{
                                            maxWidth: 300,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>{dom}</Button>
                                    </Tooltip>
                                )
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
                        bordered extra actions={<Space>
                            <Button icon={<UploadOutlined key="setting" />}></Button>
                            <Button icon={<UploadOutlined key="setting" />}></Button>
                        </Space>}>
                        <Image src={thumbnail} />
                    </ProCard>
                </Col>
            </Row>
            <FileUpload open={openUpload} onCancel={() => setOpenUpload(false)} onFinish={onUploadFinish} />
        </Modal>
    )
}

export default FileExplorer;