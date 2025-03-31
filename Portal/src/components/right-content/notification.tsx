import { apiNotificationUnreadCount } from "@/services/notificaton";
import { apiUserListNotification } from "@/services/user";
import { NotificationType } from "@/utils/constants";
import { BellOutlined, CalendarTwoTone, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { FormattedDate, history, useRequest } from "@umijs/max";
import { Badge, Popover } from "antd";

const MyNotification: React.FC = () => {

    const { data } = useRequest(apiNotificationUnreadCount);
    const { data: notifications } = useRequest(() => apiUserListNotification({ page: 1, pageSize: 5 }));

    const content = (
        <div className="w-80">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                <span className="text-sm font-semibold">Thông báo</span>
                <span className="text-xs text-gray-500">{data} chưa đọc</span>
            </div>
            <div className="p-4">
                {data > 0 && notifications?.map((notification: any) => (
                    <div key={notification.id} className="mb-2 flex items-center">
                        {
                            (notification.type === NotificationType.General || notification.type === NotificationType.Private) && (
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                                    <Badge dot={!notification.isRead}>
                                        <MailOutlined className="text-white" />
                                    </Badge>
                                </div>
                            )
                        }
                        {
                            notification.type === NotificationType.System && (
                                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center mr-2">
                                    <Badge dot={!notification.isRead}>
                                        <SettingOutlined className="text-white" />
                                    </Badge>
                                </div>
                            )
                        }
                        <div className="flex-1">
                            <div className="font-semibold text-slate-900">{notification.title}</div>
                            <div className="text-xs text-gray-500"><CalendarTwoTone /> <FormattedDate value={notification.createdDate} /></div>
                        </div>
                    </div>
                ))}
                {/* Notification items can be mapped here */}
                {data === 0 && (<div className="text-sm text-gray-700">Không có thông báo mới</div>)}
            </div>
            <div className="flex items-center justify-center border-t border-gray-200 py-2">
                <button type="button" className="text-sm text-blue-500 hover:text-blue-700" onClick={() => history.push(`/account/notification`)}>Xem tất cả</button>
            </div>
        </div>
    );

    return (
        <>
            <Popover content={content} styles={{
                body: {
                    padding: 0
                }
            }}>
                <button type="button" className="h-10 w-10 flex items-center justify-center">
                    <Badge count={data} size="small">
                        <BellOutlined className="text-lg" />
                    </Badge>
                </button>
            </Popover>
        </>
    )
};

export default MyNotification;