import { BellOutlined } from "@ant-design/icons";

const MyNotification: React.FC = () => {
    return (
        <>
            <button type="button" className="h-10 w-10 flex items-center justify-center">
                <BellOutlined className="text-lg" />
            </button>
        </>
    )
};

export default MyNotification;