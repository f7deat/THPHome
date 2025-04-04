import { PostType } from "@/enum/post-enum";
import NewPost from "@/pages/posts/components/new-post";
import DepartmentUsers from "@/pages/users/profile/components/department";
import { apiPostList } from "@/services/post";
import { MoreOutlined } from "@ant-design/icons";
import { ActionType, PageContainer, ProTable } from "@ant-design/pro-components"
import { history, useModel } from "@umijs/max"
import { Button, Dropdown } from "antd";
import { useRef } from "react";

const Index: React.FC = () => {

    const { initialState } = useModel('@@initialState');
    const actionRef = useRef<ActionType>();

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
                            },
                            {
                                title: 'Ngày đăng',
                                dataIndex: 'createdDate',
                                valueType: 'fromNow'
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
                                render: (text, record) => [
                                    <Dropdown key="more" menu={{
                                        items: [
                                            {
                                                key: 'edit',
                                                label: 'Chỉnh sửa',
                                                onClick: () => {
                                                    history.push(`/department/article/${record.id}`);
                                                }
                                            },
                                            {
                                                key: 'delete',
                                                label: 'Xóa',
                                                onClick: () => { console.log('delete', record) }
                                            }
                                        ]
                                    }}>
                                        <Button type="dashed" size="small" icon={<MoreOutlined />} />
                                    </Dropdown>
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