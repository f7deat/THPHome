import { apiNotificationUnreadCount } from "@/services/notificaton";
import { BellOutlined } from "@ant-design/icons";
import { useRequest } from "@umijs/max";
import { Badge } from "antd";

const MyNotification: React.FC = () => {

    const { data } = useRequest(apiNotificationUnreadCount);

    return (
        <>
            <Badge count={data}>
                <button type="button" className="h-10 w-10 flex items-center justify-center">
                    <BellOutlined className="text-lg" />
                </button>
            </Badge>
        </>
    )
};

export default MyNotification;