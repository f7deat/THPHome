import { Button, Dropdown, message, Popconfirm, Spin, Tag } from "antd";
import { useRef, useState } from "react";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ToolOutlined,
    CopyOutlined,
    TranslationOutlined,
    MoreOutlined,
    SendOutlined
} from '@ant-design/icons';
import IPost from "./interfaces/post-model";
import Tooltip from "antd/es/tooltip";
import { history, Link, request, useIntl } from "@umijs/max";
import { language } from "@/utils/format";
import { ActionType, PageContainer, ProColumnType, ProTable } from "@ant-design/pro-components";
import { apiShareZaloOA, queryPosts } from "@/services/post";
import CopyPost from "./components/copy";
import { FormattedMessage } from "@umijs/max";
import { PostType } from "@/enum/post-enum";

const PostList: React.FC<{
    type: PostType
}> = ({ type }) => {

    const actionRef = useRef<ActionType>();
    const intl = useIntl();
    const [openCopy, setOpenCopy] = useState<boolean>(false);
    const [post, setPost] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

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
                1: 'Đã xuất bản',
                2: 'Đã xóa'
            },
            render: (dom, record: IPost) => (
                <Tooltip title="Nhấp để chuyển trạng thái">
                    <Tag color={record.status === 1 ? 'cyan' : 'gold'} onClick={() => setActive(record.id || 0)} style={{
                        cursor: 'pointer'
                    }}>
                        {record.status === 1 ? 'xuất bản' : 'chờ duyệt'}
                    </Tag>
                </Tooltip>
            ),
            width: 100
        },
        {
            title: 'Cập nhật lúc',
            dataIndex: 'modifiedDate',
            valueType: 'fromNow',
            width: 140,
            search: false
        },
        {
            title: 'Đăng bởi',
            dataIndex: 'createdBy',
            width: 140,
            search: false
        },
        {
            title: 'Tác vụ',
            render: (dom, record: IPost) => [
                <Tooltip key="build" title="Page Builder">
                    <Button size="small" icon={<ToolOutlined />} hidden={type !== PostType.DEFAULT && type !== PostType.PAGE} onClick={() => {
                        history.push(`/post/page/${record.id}`);
                    }} />
                </Tooltip>,
                <Link key="edit" to={`/post/setting/${record.id}`} hidden={type === PostType.DEFAULT}><Button type="primary" size="small" icon={<EditOutlined />}></Button></Link>,
                <Popconfirm
                    key="delete"
                    title="Bạn có chắc chắn muốn xóa?"
                    onConfirm={() => remove(record.id || 0)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" size="small" danger icon={<DeleteOutlined />} hidden={type === PostType.DEFAULT}></Button>
                </Popconfirm>,
                <Dropdown
                    key="more" menu={{
                        items: [
                            {
                                label: 'Chia sẻ lên Zalo OA',
                                key: 'zalo',
                                icon: <SendOutlined />
                            },
                            {
                                label: 'Nhân bản',
                                key: 'copy',
                                icon: <CopyOutlined />
                            },
                            {
                                label: 'Dịch sang ngôn ngữ khác',
                                key: 'translate',
                                icon: <TranslationOutlined />
                            }
                        ],
                        onClick: (info) => onMoreClick(info, record)
                    }}>
                    <Button size="small" icon={<MoreOutlined />} />
                </Dropdown>
            ],
            valueType: 'option',
            width: 100,
            align: 'center'
        }
    ];

    return (
        <PageContainer extra={<Link to="/post/setting"><Button type="primary" icon={<PlusOutlined />}>Bài viết mới</Button></Link>}>
            <ProTable
                actionRef={actionRef}
                request={(params) => queryPosts({
                    ...params,
                    type: type,
                    language: language(intl.locale),
                    pageIndex: params.current
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

export default PostList