import { apiNotificationUnreadCount } from "@/services/notificaton";
import { BellOutlined } from "@ant-design/icons";
import { history, useRequest } from "@umijs/max";
import { Badge, Popover } from "antd";

const MyNotification: React.FC = () => {

    const { data } = useRequest(apiNotificationUnreadCount);

    const content = (
        <div className="w-80">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                <span className="text-sm font-semibold">Thông báo</span>
                <span className="text-xs text-gray-500">{data} chưa đọc</span>
            </div>
            <div className="p-4">
                {/* Notification items can be mapped here */}
                <div className="text-sm text-gray-700">Không có thông báo mới</div>
            </div>
            <div className="flex items-center justify-center border-t border-gray-200 py-2">
                <button className="text-sm text-blue-500 hover:text-blue-700" onClick={() => history.push(`/account/notification`)}>Xem tất cả</button>
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