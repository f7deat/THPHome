import { ActionType, ProForm, ProFormInstance, ProFormTextArea, ProList } from "@ant-design/pro-components"
import { Button, Divider, message, Popconfirm } from "antd"
import { apiTaskCommentCreate, apiTaskCommentDelete, apiTaskCommentList } from "../../services/comment"
import { useParams } from "@umijs/max";
import { useRef } from "react";
import { DeleteOutlined } from "@ant-design/icons";

const TaskComment: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();

    const onFinish = async (values: any) => {
        values.taskItemId = id;
        await apiTaskCommentCreate(values);
        actionRef.current?.reload();
        message.success('Gửi bình luận thành công!');
        formRef.current?.resetFields();
    }

    const onDelete = async (id: string) => {
        await apiTaskCommentDelete(id);
        actionRef.current?.reload();
        message.success('Xóa bình luận thành công!');
    }

    return (
        <div>
            <ProList
                actionRef={actionRef}
                request={(params) => apiTaskCommentList({
                    ...params,
                    taskItemId: id
                })}
                metas={{
                    title: {
                        dataIndex: 'createdBy'
                    },
                    subTitle: {
                        dataIndex: 'createdDate',
                        valueType: 'fromNow'
                    },
                    description: {
                        dataIndex: 'content'
                    },
                    actions: {
                        render: (_, record) => [
                            <Popconfirm key="delete" title="Bạn có chắc chắn muốn xóa bình luận này?" onConfirm={() => onDelete(record.id)}>
                                <Button danger size="small" icon={<DeleteOutlined />} />
                            </Popconfirm>
                        ]
                    }
                }}
            />
            <Divider orientation="left">Gửi bình luận</Divider>
            <ProForm onFinish={onFinish} formRef={formRef}>
                <ProFormTextArea label="Nội dung" name="content" placeholder="Nhập bình luận" rows={4} />
            </ProForm>
        </div>
    )
}

export default TaskComment