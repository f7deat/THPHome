import { FolderOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";

type Props = {
    onSelect: (url: string) => void;
}

const Thumbnail: React.FC<Props> = ({ onSelect }) => {

    const [open, setOpen] = useState<boolean>(false);

    const handleSelect = (url: string) => {
        onSelect(url);
        setOpen(false);
    }

    return (
        <>
            <Modal open={open} onCancel={() => setOpen(false)} onOk={() => setOpen(false)} title="Chọn ảnh đại diện" centered footer={false}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-md p-2 hover:border-blue-500 cursor-pointer"
                        onClick={() => handleSelect("https://dhhp.edu.vn/img/thumbnail/default.png")}>
                        <img src="https://dhhp.edu.vn/img/thumbnail/default.png" alt="placeholder" className="h-40 object-cover" />
                    </div>
                    <div className="border border-gray-200 rounded-md p-2 hover:border-blue-500 cursor-pointer"
                        onClick={() => handleSelect("https://dhhp.edu.vn/img/thumbnail/notification.png")}>
                        <img src="https://dhhp.edu.vn/img/thumbnail/notification.png" alt="placeholder" className="h-40 object-cover w-full" />
                    </div>
                </div>
            </Modal>
            <Button icon={<FolderOutlined />} onClick={() => setOpen(true)} type="dashed">Chọn</Button>
        </>
    )
}

export default Thumbnail;