import { CalendarOutlined, DeleteOutlined, DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProList } from "@ant-design/pro-components";
import { Button, Divider, message, Popconfirm, Upload, UploadProps } from "antd";
import { apiTaskItemAttachments, apiTaskItemAttachmentUpload } from "../../services/task-item";
import { useParams } from "@umijs/max";
import { useRef } from "react";
import dayjs from "dayjs";
import { humanFileSize } from "@/utils/format";

const TaskAttachments: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const actionRef = useRef<ActionType>();

    const props: UploadProps = {
        onChange({ file }) {
            if (file.status !== 'uploading') {
                const formData = new FormData();
                formData.append('file', file.originFileObj as any);
                formData.append('taskItemId', id as string);
                apiTaskItemAttachmentUpload(formData).then(() => {
                    message.success('Tải lên thành công!');
                    actionRef.current?.reload();
                });
            }
        },
        maxCount: 1,
        showUploadList: false
    };

    return (
        <div>
            <Divider orientation="left">Tệp đính kèm</Divider>
            <ProList
                actionRef={actionRef}
                request={(params) => apiTaskItemAttachments(id, params)}
                className="mb-4"
                rowKey="id"
                pagination={false}
                metas={{
                    title: {
                        dataIndex: 'fileName',
                        title: 'Tên tệp',
                    },
                    description: {
                        render: (text, row) => (
                            <div className="flex gap-2">
                                <CalendarOutlined />
                                <span>{dayjs(row.createdDate).format('DD/MM/YYYY HH:mm')}</span>
                                <span>-</span>
                                <span>{humanFileSize(row.fileSize)}</span>
                            </div>
                        )
                    },
                    actions: {
                        render: (_, row) => [
                            <Button key="download" type="primary" size="small" icon={<DownloadOutlined />} onClick={() => window.open(row.fileUrl)} />,
                            <Popconfirm key="delete" title="Bạn có chắc chắn muốn xóa?">
                                <Button type="primary" size="small" danger icon={<DeleteOutlined />} />
                            </Popconfirm>
                        ]
                    }
                }}
            />
            <div className="flex gap-2">
                <Upload {...props}>
                    <div className="h-16 cursor-pointer w-16 bg-gray-100 border border-dashed hover:border-blue-500 rounded flex items-center justify-center">
                        <PlusOutlined />
                    </div>
                </Upload>
            </div>
        </div>
    )
}

export default TaskAttachments;