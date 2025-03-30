import React, { useEffect, useState } from "react";
import { PageContainer, ProList, ProCard } from "@ant-design/pro-components";
import { Avatar, Button, Empty, Typography } from "antd";
import { apiUserListNotification } from "@/services/user";
import { CalendarOutlined, MailOutlined, MoreOutlined } from "@ant-design/icons";
import { apiGetNotification } from "@/services/notificaton";

const { Title, Paragraph } = Typography;

const NotificationPage: React.FC = () => {
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
                            request={apiUserListNotification}
                            pagination={{
                                pageSize: 20,
                                size: "small"
                            }}
                            size="small"
                            rowKey="id"
                            metas={{
                                title: {
                                    dataIndex: "title",
                                },
                                actions: {
                                    render: () => [
                                        <Button size="small" type="dashed" key="view" icon={<MoreOutlined />} />
                                    ],
                                },
                                description: {
                                    valueType: 'fromNow',
                                    dataIndex: 'createdDate',
                                    render: (text) => <div className="flex items-center gap-1"><CalendarOutlined /> {text}</div>
                                },
                                avatar: {
                                    render: (_, record) => record.isRead ? <Avatar icon={<MailOutlined />} /> : <Avatar icon={<MailOutlined />} className="bg-red-500" />,
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
                    <ProCard title={notification?.title || 'Nội dung thông báo'} headerBordered>
                        {notification ? (<div dangerouslySetInnerHTML={{ __html: notification?.content }} />) : (<Empty />)}
                    </ProCard>
                </div>
            </div>
        </PageContainer>
    );
};

export default NotificationPage;