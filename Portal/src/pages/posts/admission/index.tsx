import { apiAdmissions, apiPostPublish } from "@/services/post";
import { ActionType, PageContainer, ProTable } from "@ant-design/pro-components"
import NewPost from "../components/new-post";
import { PostType } from "@/enum/post-enum";
import { useRef } from "react";
import { ArrowDownOutlined, ArrowUpOutlined, EditOutlined, MoreOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, message } from "antd";
import { history } from "@umijs/max";
import { PostStatus } from "@/utils/enum";

const Index: React.FC = () => {

    const actionRef = useRef<ActionType>(null);

    return (
        <PageContainer>
            <ProTable
                actionRef={actionRef}
                headerTitle={<NewPost type={PostType.ADMISSION} reload={() => {
                    actionRef.current?.reload();
                }} />}
                request={apiAdmissions}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30,
                        align: 'center'
                    },
                    {
                        title: 'Tiêu đề',
                        dataIndex: 'title'
                    },
                    {
                        title: 'Ngày tạo',
                        dataIndex: 'createdDate',
                        valueType: 'fromNow',
                        search: false
                    },
                    {
                        title: 'Lượt xem',
                        valueType: 'digit',
                        dataIndex: 'view',
                        search: false
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        valueType: 'select',
                        valueEnum: {
                            0: { text: 'Bản nháp', status: 'Default' },
                            1: { text: 'Xuất bản', status: 'Success' },
                            2: { text: 'Đã hủy', status: 'Error' },
                        }
                    },
                    {
                        title: <SettingOutlined />,
                        valueType: 'option',
                        width: 40,
                        render: (text, record) => [
                            <Dropdown key={"more"} menu={{
                                items: [
                                    {
                                        key: 'edit',
                                        label: 'Chỉnh sửa',
                                        icon: <EditOutlined />,
                                        onClick: () => {
                                            history.push(`/post/article/setting/${record.id}`);
                                        }
                                    },
                                    {
                                        key: 'publish',
                                        label: record.status === PostStatus.DRAFT ? 'Xuất bản' : 'Hủy xuất bản',
                                        icon: record.status === PostStatus.DRAFT ? <ArrowUpOutlined /> : <ArrowDownOutlined />,
                                        onClick: async () => {
                                            await apiPostPublish(record.id);
                                            message.success('Cập nhật trạng thái thành công');
                                            actionRef.current?.reload();
                                        }
                                    }
                                ]
                            }}>
                                <Button type="dashed" icon={<MoreOutlined />} size="small" />
                            </Dropdown>
                        ]
                    }
                ]}
                search={{
                    layout: 'vertical'
                }}
            />
        </PageContainer>
    )
}

export default Index;