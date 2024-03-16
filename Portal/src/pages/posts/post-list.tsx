import { Button, Dropdown, message, Popconfirm, Tabs, Tag } from "antd";
import React, { useRef, useState } from "react";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ToolOutlined,
    CopyOutlined,
    TranslationOutlined
} from '@ant-design/icons';
import IPost from "./interfaces/post-model";
import Tooltip from "antd/es/tooltip";
import { history, Link, request, useIntl } from "@umijs/max";
import { language } from "@/utils/format";
import { ActionType, PageContainer, ProColumnType, ProTable } from "@ant-design/pro-components";
import { queryPosts } from "@/services/post";
import CopyPost from "./components/copy";

const { TabPane } = Tabs;

const PostList = () => {

    const [activeKey, setActiveKey] = useState<string>('1');
    const actionRef = useRef<ActionType>();
    const intl = useIntl();
    const [openCopy, setOpenCopy] = useState<boolean>(false);
    const [post, setPost] = useState<any>();

    function remove(id: number) {
        request(`post/remove/${id}`, {
            method: 'POST'
        }).then(response => {
            if (response.succeeded) {
                message.success('succeeded!');
                actionRef.current?.reload();
            } else {
                message.error('error!');
            }
        })
    }

    const onTabChange = (activeKey: string) => {
        setActiveKey(activeKey);
        actionRef.current?.reload();
    }

    function setActive(id: number) {
        request(`post/active/${id}`, {
            method: 'POST'
        }).then(response => {
            if (response.succeeded) {
                message.success(response.message);
                actionRef.current?.reload();
            } else {
                message.error(response.message)
            }
        })
    }

    const columns: ProColumnType<IPost>[] = [
        {
            title: 'STT',
            valueType: 'indexBorder',
            width: 50
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            render: (dom, record: IPost) => <a href={`https://dhhp.edu.vn/post/${record.url}-${record.id}.html`} target="_blank" rel="noreferrer">{record.title}</a>
        },
        {
            title: 'Lượt xem',
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
            title: 'Ngày xuất bản',
            dataIndex: 'modifiedDate',
            valueType: 'fromNow',
            width: 140
        },
        {
            title: 'Tác vụ',
            render: (dom, record: IPost) => [
                <Tooltip key="build" title="Page Builder">
                    <Button size="small" icon={<ToolOutlined />} hidden={activeKey !== '1'} onClick={() => {
                        history.push(`/post/page/${record.id}`);
                    }} />
                </Tooltip>,
                <Tooltip key="copy" title="Nhân bản">
                    <Button icon={<CopyOutlined />} size="small" type="dashed" onClick={() => {
                        setPost(record);
                        setOpenCopy(true);
                    }} />
                </Tooltip>,
                <Tooltip key="translate" title="Dịch">
                    <Dropdown menu={{
                        items: [
                            {
                                key: 'vi',
                                label: 'Tiếng Việt',
                                disabled: intl.locale === 'vi-VN'
                            },
                            {
                                key: 'en',
                                label: 'Tiếng Anh',
                                disabled: intl.locale === 'en-US'
                            }
                        ]
                    }}>
                        
                    <Button icon={<TranslationOutlined />} size="small" type="primary"/>
                    </Dropdown>
                </Tooltip>,
                <Link key="edit" to={`/post/setting/${record.id}`}><Button type="primary" size="small" icon={<EditOutlined />}></Button></Link>,
                <Popconfirm
                    key="delete"
                    title="Are you sure to delete?"
                    onConfirm={() => remove(record.id || 0)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" size="small" danger icon={<DeleteOutlined />}></Button>
                </Popconfirm>
            ],
            valueType: 'option',
            width: 120,
            align: 'center'
        }
    ];

    const TabData = (key: string) => (
        <ProTable
            actionRef={actionRef}
            request={(params) => queryPosts({
                ...params,
                type: key,
                language: language(intl.locale),
                pageIndex: params.current
            })}
            search={{
                layout: 'vertical'
            }}
            columns={columns}
            rowSelection={{
                type: 'checkbox',
            }}
            rowKey="id"
        />
    )

    return (
        <PageContainer extra={<Link to="/post/setting"><Button type="primary" icon={<PlusOutlined />}>Bài viết mới</Button></Link>}>
            <Tabs defaultActiveKey={activeKey} onChange={onTabChange} activeKey={activeKey} type="card">
                <TabPane tab="Trang" key="1">
                    {TabData("1")}
                </TabPane>
                <TabPane tab="Tin tức" key="2">
                    {TabData("2")}
                </TabPane>
                <TabPane tab="Thông báo" key="3">
                    {TabData("3")}
                </TabPane>
            </Tabs>
            <CopyPost open={openCopy} onOpenChange={setOpenCopy} data={post} actionRef={actionRef} setOpen={setOpenCopy} />
        </PageContainer>
    )
}

export default PostList