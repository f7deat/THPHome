import { apiListNotification, apiNotificationDelete } from "@/services/notificaton";
import { DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, PageContainer, ProTable } from "@ant-design/pro-components"
import { Button, Dropdown, message, Popconfirm } from "antd";
import { useRef, useState } from "react";
import NotificationForm from "./components/form";
import SentInfo from "./components/sent-info";

const NotificationPage: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [notification, setNotification] = useState<any>();
    const actionRef = useRef<ActionType>();
    const [openSent, setOpenSent] = useState<boolean>(false);

    const onDelete = async (id: string) => {
        await apiNotificationDelete(id);
        message.success('Xóa thông báo thành công!');
        actionRef.current?.reload();
    }

    return (
        <PageContainer extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Thêm mới</Button>}>
            <ProTable
                actionRef={actionRef}
                search={{
                    layout: 'vertical'
                }}
                request={apiListNotification}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: 'Thông báo',
                        dataIndex: 'title'
                    },
                    {
                        title: 'Loại',
                        dataIndex: 'type',
                        valueEnum: {
                            0: {
                                text: 'Thông báo chung',
                                status: 'Default'
                            },
                            1: {
                                text: 'Thông báo cá nhân',
                                status: 'Processing'
                            },
                            2: {
                                text: 'Thông báo hệ thống',
                                status: 'Warning'
                            },
                        },
                        width: 150
                    },
                    {
                        title: 'Lượt gửi',
                        dataIndex: 'sentCount',
                        valueType: 'digit',
                        search: false,
                        width: 80,
                        render: (dom, entity) => (
                            <Button type="link" size="small" disabled={entity.sentCount === 0} onClick={() => {
                                setNotification(entity);
                                setOpenSent(true);
                            }}>{dom}</Button>
                        )
                    },
                    {
                        title: 'Xem',
                        dataIndex: 'readCount',
                        valueType: 'digit',
                        search: false
                    },
                    {
                        title: 'Người gửi',
                        dataIndex: 'createdBy',
                        search: false
                    },
                    {
                        title: 'Ngày gửi',
                        dataIndex: 'createdDate',
                        valueType: 'fromNow',
                        search: false
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, entity) => [
                            <Dropdown key="more" menu={{
                                items: [
                                    {
                                        key: 'detail',
                                        label: 'Chi tiết',
                                        icon: <EyeOutlined />
                                    },
                                    {
                                        key: 'edit',
                                        label: 'Chỉnh sửa',
                                        icon: <EditOutlined />
                                    }
                                ],
                                onClick: (info) => {
                                    setNotification(entity);
                                    if (info.key === 'edit') {
                                        setOpen(true);
                                        return;
                                    }
                                }
                            }}>
                               <Button icon={<MoreOutlined />} size="small" /> 
                            </Dropdown>,
                            <Popconfirm key="delete" title="Xác nhận xóa?" onConfirm={() => onDelete(entity.id)}>
                                <Button type="primary" danger size="small" icon={<DeleteOutlined />}></Button>
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
            />
            <NotificationForm open={open} onOpenChange={setOpen} notificationId={notification?.id} />
            <SentInfo open={openSent} onClose={() => setOpenSent(false)} notification={notification} />
        </PageContainer>
    )
}

export default NotificationPage;