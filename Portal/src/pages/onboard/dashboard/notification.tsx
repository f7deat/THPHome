import { apiGetUsersByNotificationId, apiNotificationList } from "@/services/onboard/notification";
import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { ProCard, ProList, ProTable } from "@ant-design/pro-components"
import { FormattedDate, FormattedTime } from "@umijs/max";
import { Button, Modal } from "antd";
import { useState } from "react";

const NotificationDashboard: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [notification, setNotification] = useState<any>();

    return (
        <ProCard title="Thông báo chung" headerBordered extra={<Button type="primary" icon={<PlusOutlined />} size="small">Thêm mới</Button>}>
            <ProList
                ghost
                request={(params) => apiNotificationList({
                    ...params,
                    type: 1
                })}
                metas={{
                    avatar: {
                        valueType: 'indexBorder'
                    },
                    title: {
                        dataIndex: 'title',
                        render: (dom, entity) => (
                            <div className="font-medium" onClick={() => {
                                setNotification(entity);
                                setOpen(true);
                            }}>{dom}</div>
                        )
                    },
                    description: {
                        render: (_, entity: any) => (
                            <div><CalendarOutlined /> Ngày: <FormattedDate value={entity.createdDate} /> <FormattedTime value={entity.createdDate} /></div>
                        )
                    }
                }}
            />
            <Modal open={open} onCancel={() => setOpen(false)} title={notification?.title} centered width={800}>
                <ProTable
                    request={(params) => apiGetUsersByNotificationId({
                        ...params,
                        notificationId: notification?.id
                    })}
                    ghost
                    search={{
                        layout: 'vertical'
                    }}
                    columns={[
                        {
                            title: '#',
                            valueType: 'indexBorder'
                        },
                        {
                            title: 'Họ và tên',
                            dataIndex: 'name'
                        },
                        {
                            title: 'Mã sinh viên',
                            dataIndex: 'userName'
                        },
                        {
                            title: 'Trạng thái',
                            dataIndex: 'isRead',
                            valueEnum: {
                                true: {
                                    text: 'Đã xem'
                                },
                                false: {
                                    text: 'Chưa xem'
                                }
                            }
                        },
                        {
                            title: 'Ngày xem',
                            dataIndex: 'readDate',
                            valueType: 'dateTime'
                        }
                    ]}
                />
            </Modal>
        </ProCard>
    )
}

export default NotificationDashboard;