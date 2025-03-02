import { apiListNotification } from "@/services/notificaton";
import { DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { PageContainer, ProTable } from "@ant-design/pro-components"
import { Button, Dropdown, Popconfirm } from "antd";
import { useState } from "react";
import NotificationForm from "./components/form";

const NotificationPage: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [notification, setNotification] = useState<any>();

    return (
        <PageContainer extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Thêm mới</Button>}>
            <ProTable
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
                        title: 'Lượt gửi',
                        dataIndex: 'sentCount',
                        valueType: 'digit',
                        search: false
                    },
                    {
                        title: 'Xem',
                        dataIndex: 'readCount',
                        valueType: 'digit',
                        search: false
                    },
                    {
                        title: 'Người gửi',
                        dataIndex: 'createdBy'
                    },
                    {
                        title: 'Ngày gửi',
                        dataIndex: 'createdDate',
                        valueType: 'fromNow'
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
                            <Popconfirm key="delete" title="Xác nhận xóa?">
                                <Button type="primary" danger size="small" icon={<DeleteOutlined />}></Button>
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
            />
            <NotificationForm open={open} onOpenChange={setOpen} notificationId={notification?.id} />
        </PageContainer>
    )
}

export default NotificationPage;