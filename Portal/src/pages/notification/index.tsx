import React, { useRef, useState } from "react";
import { PageContainer, ProList, ProCard, ActionType } from "@ant-design/pro-components";
import { Badge, Button, Dropdown, Empty, message } from "antd";
import { apiUserListNotification, apiUserNotificationDelete } from "@/services/user";
import { CalendarOutlined, DeleteOutlined, EyeInvisibleOutlined, EyeOutlined, MailOutlined, MoreOutlined } from "@ant-design/icons";
import { apiGetNotification } from "@/services/notificaton";
import { FormattedDate } from "@umijs/max";

const NotificationPage: React.FC = () => {

    const actionRef = useRef<ActionType>();

    const [selectedNotification, setSelectedNotification] = useState<string | null>(null);
    const [notification, setNotification] = useState<any>(null);

    const handleSelectNotification = (id: string) => {
        setSelectedNotification(id);
    };

    return (
        <PageContainer>
            <div className="flex gap-4">
                <div className="md:w-1/3">
                    <ProCard title="Thông báo mới" headerBordered>
                        <ProList
                            actionRef={actionRef}
                            request={apiUserListNotification}
                            pagination={{
                                size: "small"
                            }}
                            size="small"
                            rowKey="id"
                            metas={{
                                title: {
                                    dataIndex: "title",
                                    render: (text, record) => (
                                        <div className="text-normal">
                                            <Badge dot={!record.isRead} offset={[5, 0]}>{text}</Badge>
                                        </div>
                                    )
                                },
                                actions: {
                                    render: (_, entity) => [
                                        <Dropdown key="action" menu={{
                                            items: [
                                                {
                                                    key: 'archive',
                                                    label: 'Lưu trữ',
                                                    icon: <MailOutlined />
                                                },
                                                {
                                                    key: 'markAsRead',
                                                    label: entity.isRead ? 'Đánh dấu là chưa đọc' : 'Đánh dấu đã đọc',
                                                    icon: entity.isRead ? <EyeInvisibleOutlined /> : <EyeOutlined />
                                                },
                                                {
                                                    key: 'delete',
                                                    label: 'Xóa',
                                                    icon: <DeleteOutlined />,
                                                    danger: true,
                                                    onClick: async () => {
                                                        await apiUserNotificationDelete(entity.id);
                                                        message.success("Xóa thông báo thành công");
                                                        actionRef.current?.reload();
                                                    }
                                                },
                                            ]
                                        }}>
                                            <Button size="small" type="dashed" icon={<MoreOutlined />} />
                                        </Dropdown>
                                    ],
                                },
                                description: {
                                    valueType: 'fromNow',
                                    dataIndex: 'createdDate',
                                    render: (text) => <div className="flex items-center gap-1"><CalendarOutlined /> {text}</div>
                                }
                            }}
                            onRow={(record) => ({
                                onClick: async () => {
                                    handleSelectNotification(record.id);
                                    await apiGetNotification(record.notificationId).then((response) => setNotification(response.data));
                                },
                                style: {
                                    cursor: "pointer",
                                    backgroundColor: selectedNotification === record.id ? "#e6f7ff" : "white",
                                    transition: "background-color 0.3s",
                                }
                            })}
                        />
                    </ProCard>

                </div>
                <div className="md:w-2/3">
                    <ProCard title={notification?.title || 'Nội dung thông báo'}
                        headerBordered>
                        <div className="mb-2">
                            {notification ? (<div dangerouslySetInnerHTML={{ __html: notification?.content }} />) : (<Empty />)}
                        </div>
                        <div className="mb-4 border-t border-dashed pt-1 text-slate-500 text-right">
                            <CalendarOutlined /> Ngày: <FormattedDate value={notification?.createdDate} format="DD/MM/YYYY" /> <br />
                        </div>
                    </ProCard>
                </div>
            </div>
        </PageContainer>
    );
};

export default NotificationPage;