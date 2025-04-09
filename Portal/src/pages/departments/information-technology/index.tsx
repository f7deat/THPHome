import { PostType } from "@/enum/post-enum";
import NewPost from "@/pages/posts/components/new-post";
import DepartmentUsers from "@/pages/users/profile/components/department";
import { apiPostActive, apiPostDelete, apiPostList } from "@/services/post";
import { PostStatus } from "@/utils/enum";
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { ActionType, PageContainer, ProTable } from "@ant-design/pro-components"
import { history, useAccess, useModel } from "@umijs/max"
import { Button, Dropdown, message, Popconfirm } from "antd";
import { useRef } from "react";

const Index: React.FC = () => {

    const { initialState } = useModel('@@initialState');
    const access = useAccess();
    const actionRef = useRef<ActionType>();

    const onRemove = async (id: number) => {
        await apiPostDelete(id);
        message.success('Xóa bài viết thành công!');
        actionRef.current?.reload();
    }

    const onApprove = async (id: number) => {
        await apiPostActive(id);
        message.success('Duyệt bài viết thành công!');
        actionRef.current?.reload();
    }

    return (
        <PageContainer>
            <div className="flex gap-4">
                <div className="md:w-2/3">
                    <ProTable
                        actionRef={actionRef}
                        headerTitle={<NewPost type={PostType.NEWS} reload={() => actionRef.current?.reload()} />}
                        request={(params) => apiPostList({
                            ...params,
                            departmentId: initialState?.currentUser?.departmentId
                        })}
                        search={{
                            layout: 'vertical'
                        }}
                        columns={[
                            {
                                title: '#',
                                dataIndex: 'avatar',
                                valueType: 'indexBorder',
                                width: 30,
                                align: 'center'
                            },
                            {
                                title: 'Tiêu đề',
                                dataIndex: 'title',
                            },
                            {
                                title: 'Người đăng',
                                dataIndex: 'createdBy',
                                search: false
                            },
                            {
                                title: 'Ngày đăng',
                                dataIndex: 'createdDate',
                                valueType: 'fromNow',
                                search: false
                            },
                            {
                                title: 'Trạng thái',
                                dataIndex: 'status',
                                valueEnum: {
                                    0: { text: 'Chưa duyệt', status: 'Default' },
                                    1: { text: 'Đã duyệt', status: 'Success' },
                                    2: { text: 'Đã xóa', status: 'Error' },
                                }
                            },
                            {
                                title: 'Tác vụ',
                                key: 'option',
                                valueType: 'option',
                                render: (_, record) => [
                                    <Dropdown key="more" menu={{
                                        items: [
                                            {
                                                key: 'edit',
                                                label: 'Chỉnh sửa',
                                                onClick: () => {
                                                    history.push(`/department/article/${record.id}`);
                                                },
                                                icon: <EditOutlined />
                                            },
                                            {
                                                key: 'approve',
                                                label: record.status === PostStatus.DRAFT ? 'Duyệt' : 'Hủy duyệt',
                                                onClick: () => onApprove(record.id),
                                                icon: record.status === PostStatus.DRAFT ? <CheckOutlined /> : <CloseOutlined />,
                                                disabled: !access.hod
                                            }
                                        ]
                                    }}>
                                        <Button type="dashed" size="small" icon={<MoreOutlined />} />
                                    </Dropdown>,
                                    <Popconfirm key="remove" title="Bạn có chắc chắn muốn xóa bài viết này không?" onConfirm={() => onRemove(record.id)}>
                                        <Button type="primary" size="small" danger icon={<DeleteOutlined />} />
                                    </Popconfirm>
                                ],
                                width: 60
                            }
                        ]}
                    />
                </div>
                <div className="md:w-1/3">
                    <DepartmentUsers />
                </div>
            </div>

        </PageContainer>
    )
}

export default Index