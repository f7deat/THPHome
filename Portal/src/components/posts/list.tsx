import { PostType } from "@/enum/post-enum";
import { ActionType, ProColumnType, ProTable } from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { FormattedMessage, request, useAccess, history } from "@umijs/max";
import { apiPostDelete, apiShareZaloOA, queryPosts } from "@/services/post";
import { Button, Dropdown, message, Popconfirm, Spin, Tag, Tooltip } from "antd";
import { PostStatus } from "@/utils/enum";
import { EditOutlined, ArrowDownOutlined, ArrowUpOutlined, SendOutlined, CopyOutlined, TranslationOutlined, ToolOutlined, MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { apiGetAllCategoryOptions } from "@/services/categoy";
import IPost from "@/pages/posts/interfaces/post-model";
import NewPost from "@/pages/posts/components/new-post";
import CopyPost from "@/pages/posts/components/copy";

type Props = {
    type: PostType;
}

const PostList: React.FC<Props> = ({ type }) => {

    const actionRef = useRef<ActionType>();
    const [openCopy, setOpenCopy] = useState<boolean>(false);
    const [post, setPost] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const access = useAccess();
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        apiGetAllCategoryOptions().then(response => setCategories(response));
    }, []);

    async function remove(id: number) {
        await apiPostDelete(id);
        message.success('Xóa bài viết thành công!');
        actionRef.current?.reload();
    }

    function setActive(id: number) {
        request(`post/active/${id}`, {
            method: 'POST'
        }).then((response: any) => {
            if (response.succeeded) {
                message.success(response.message);
                actionRef.current?.reload();
            } else {
                message.error(response.message)
            }
        })
    }

    const onMoreClick = (info: any, entity: any) => {
        if (info.key === 'copy') {
            setPost(entity);
            setOpenCopy(true);
        }
        if (info.key === 'zalo') {
            apiShareZaloOA(entity.id).then(() => {
                setLoading(false);
                message.success('Chia sẻ thành công!');
            });
        }
        if (info.key === 'publish') {
            request(`post/active/${entity.id}`, {
                method: 'POST'
            }).then((response: any) => {
                if (response.succeeded) {
                    message.success(response.message);
                    actionRef.current?.reload();
                } else {
                    message.error(response.message)
                }
            })
        }
        if (info.key === 'builder') {
            history.push(`/post/page/${entity.id}`);
        }
    }

    const columns: ProColumnType<IPost>[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 30,
            align: 'center'
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            render: (dom, record: IPost) => <a href={`https://dhhp.edu.vn/post/${record.url}-${record.id}.html`} target="_blank" rel="noreferrer">{record.title}</a>
        },
        {
            title: 'Danh mục',
            dataIndex: 'categoryId',
            valueType: 'select',
            fieldProps: {
                options: categories
            },
            minWidth: 150
        },
        {
            title: <FormattedMessage id='general.view' />,
            dataIndex: 'view',
            valueType: 'digit',
            search: false,
            width: 80
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            valueEnum: {
                0: 'Chờ duyệt',
                1: 'Đã xuất bản'
            },
            render: (dom, record: IPost) => (
                <Tooltip title="Nhấp để chuyển trạng thái">
                    <Tag color={record.status === 1 ? 'cyan' : 'gold'} onClick={() => setActive(record.id || 0)} style={{
                        cursor: 'pointer'
                    }}>
                        {record.status === 1 ? 'Xuất bản' : 'Chờ duyệt'}
                    </Tag>
                </Tooltip>
            ),
            width: 100
        },
        {
            title: 'Người đăng',
            dataIndex: 'createdBy',
            width: 140,
            search: false
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            valueType: 'fromNow',
            width: 120,
            search: false
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'modifiedDate',
            valueType: 'fromNow',
            width: 110,
            search: false
        },
        {
            title: 'Tác vụ',
            render: (_, record: any) => [
                <Button key="edit" type="primary" size="small" icon={<EditOutlined />}
                onClick={() => {
                    if (type === PostType.PAGE) {
                        history.push(`/post/page/setting/${record.id}`);
                    }
                    if (type === PostType.NEWS) {
                        history.push(`/post/article/setting/${record.id}`);
                    }
                    if (type === PostType.NOTIFICATION) {
                        history.push(`/post/notification/setting/${record.id}`);
                    }
                    if (type === PostType.ADMISSION) {
                        history.push(`/admission/article/setting/${record.id}`);
                    }
                }}
                disabled={!record.canUpdate} />,
                <Dropdown
                    disabled={!record.canUpdate && !access.canAdmin}
                    key="more" menu={{
                        items: [
                            {
                                label: record.status === PostStatus.PUBLISH ? 'Quay lại bản nháp' : 'Xuất bản',
                                key: 'publish',
                                icon: record.status === PostStatus.PUBLISH ? <ArrowDownOutlined /> : <ArrowUpOutlined />,
                            },
                            {
                                label: 'Chia sẻ Zalo OA',
                                key: 'zalo',
                                icon: <SendOutlined />
                            },
                            {
                                label: 'Nhân bản',
                                key: 'copy',
                                icon: <CopyOutlined />
                            },
                            {
                                label: 'Dịch',
                                key: 'translate',
                                icon: <TranslationOutlined />,
                                disabled: true
                            },
                            {
                                label: 'Page builder',
                                key: 'builder',
                                icon: <ToolOutlined />
                            }
                        ],
                        onClick: (info) => onMoreClick(info, record)
                    }}>
                    <Button size="small" icon={<MoreOutlined />} />
                </Dropdown>,
                <Popconfirm
                    key="delete"
                    title="Bạn có chắc chắn muốn xóa?"
                    onConfirm={() => remove(record.id || 0)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" size="small" danger icon={<DeleteOutlined />} disabled={!record.canUpdate && !access.canAdmin}></Button>
                </Popconfirm>
            ],
            valueType: 'option',
            width: 100,
            align: 'center'
        }
    ];

    return (
        <>
            <ProTable
                headerTitle={<NewPost type={type} reload={() => {
                    actionRef.current?.reload();
                }} />}
                actionRef={actionRef}
                request={(params) => queryPosts({
                    ...params,
                    type: type
                })}
                search={{
                    layout: 'vertical'
                }}
                columns={columns}
                rowKey="id"
            />
            <CopyPost open={openCopy} onOpenChange={setOpenCopy} data={post} actionRef={actionRef} setOpen={setOpenCopy} />
            <Spin spinning={loading} fullscreen />
        </>
    )
}

export default PostList;