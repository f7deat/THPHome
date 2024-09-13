import { apiSendEmailByExcel } from "@/services/tool";
import { CloudUploadOutlined, DownloadOutlined, FileExcelOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { useState } from "react";

type Props = {
    reload: any;
}

const ExcelEmailComponent: React.FC<Props> = ({ reload }) => {

    const [open, setOpen] = useState<boolean>(false);
    const [file, setFile] = useState<any>();

    const onFinish = async () => {
        if (!file) {
            message.warning('Vui lòng chọn tệp tin!');
            return;
        }
        const formData = new FormData();
        formData.append('file', file[0]);
        await apiSendEmailByExcel(formData);
        message.success('Gửi thành công!');
        setOpen(false);
        reload();
    }

    return (
        <>
            <ModalForm open={open} onOpenChange={(visible) => {
                setFile(null);
                setOpen(visible);
            }} title="Gửi Email từ tệp tin Excel" onFinish={onFinish}>
                <div className="mt-4 flex justify-end">

                    <a href="https://docs.google.com/spreadsheets/d/1BMOP1QlxXuDwKN9kt4tk--SwKoFf5xblg8PYjCYzAjM/edit?usp=sharing" target="_blank" rel="noreferrer">
                        <div className="py-2 flex text-center justify-center items-center hover:text-blue-500 text-blue-700 cursor-pointer">
                            <div className="text-center font-medium"><DownloadOutlined /> Tải xuống tệp tin mẫu</div>
                        </div>
                    </a>
                </div>
                <label>
                    <div className="flex border border-dashed rounded cursor-pointer hover:border-blue-800">
                        <div className="flex-1 flex justify-center items-center h-32 text-center">
                            <div>
                                <div><CloudUploadOutlined className="text-2xl text-blue-500" /></div>
                                {
                                    file ? (
                                        <div className="p-2 text-gray-500">{file[0].name}</div>
                                    ) : (
                                        <div className="p-2 text-gray-500">Chọn tệp tin hoặc kéo thả từ máy tính của bạn</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <input type="file" hidden accept=".xls, .xlsx" onChange={(event) => {
                        setFile(event.currentTarget.files);
                    }} />
                </label>
            </ModalForm>
            <Button type="primary" icon={<FileExcelOutlined />} onClick={() => setOpen(true)}>Gửi từ Excel</Button>
        </>
    )
}

export default ExcelEmailComponent;