import { PostType } from "@/enum/post-enum";
import { ActionType, PageContainer, ProColumnType, ProTable } from "@ant-design/pro-components";
import CopyPost from "../components/copy";
import { useRef, useState } from "react";
import { FormattedMessage, Link, request, useAccess, history } from "@umijs/max";
import { apiShareZaloOA, queryPosts } from "@/services/post";
import { Button, Dropdown, message, Popconfirm, Spin, Tag, Tooltip } from "antd";
import { PostStatus } from "@/utils/enum";
import { EditOutlined, ArrowDownOutlined, ArrowUpOutlined, SendOutlined, CopyOutlined, TranslationOutlined, ToolOutlined, MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import IPost from "../interfaces/post-model";
import NewPost from "../components/new-post";

const PagePage : React.FC = () => {

    const actionRef = useRef<ActionType>();
    const [openCopy, setOpenCopy] = useState<boolean>(false);
    const [post, setPost] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const access = useAccess();

    function remove(id: number) {
        request(`post/remove/${id}`, {
            method: 'POST'
        }).then((response: any) => {
            if (response.succeeded) {
                message.success('succeeded!');
                actionRef.current?.reload();
            } else {
                message.error('error!');
            }
        })
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
            title: 'STT',
            valueType: 'indexBorder',
            width: 40,
            align: 'center'
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            render: (dom, record: IPost) => <a href={`https://dhhp.edu.vn/post/${record.url}-${record.id}.html`} target="_blank" rel="noreferrer">{record.title}</a>
        },
        {
            title: <FormattedMessage id='general.view' />,
            dataIndex: 'view',
            valueType: 'digit',
            search: false,
            width: 100,
            align: 'center'
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
            title: 'Ngày xuất bản',
            dataIndex: 'issuedDate',
            valueType: 'date',
            width: 110,
            search: false
        },
        {
            title: 'Tác vụ',
            render: (dom, record: any) => [
                <Link key="edit" to={`/post/setting/${record.id}`}>
                    <Button type="primary" size="small" icon={<EditOutlined />} disabled={!record.canUpdate}></Button>
                </Link>,
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
        <PageContainer extra={<NewPost type={PostType.PAGE} />}>
            <ProTable
                actionRef={actionRef}
                request={(params) => queryPosts({
                    ...params,
                    type: PostType.PAGE
                })}
                search={{
                    layout: 'vertical'
                }}
                columns={columns}
                rowKey="id"
            />
            <CopyPost open={openCopy} onOpenChange={setOpenCopy} data={post} actionRef={actionRef} setOpen={setOpenCopy} />
            <Spin spinning={loading} fullscreen />
        </PageContainer>
    )
}

export default PagePage;