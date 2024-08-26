import { apiExportMajor, apiGetMajorGroup } from "@/services/onboard/major";
import { FileExcelOutlined } from "@ant-design/icons";
import { ProFormSelect } from "@ant-design/pro-components";
import { Alert, Button, Form, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const ExportUserMajor: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const onFinish = async (values: any) => {
        const response = await apiExportMajor(values) as any;
        const url = window.URL.createObjectURL(
            new Blob([response]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download',
            `data-onboard-${dayjs().year()}${dayjs().month()}${dayjs().day()}.xlsx`,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode?.removeChild(link);
    }

    return (
        <>
            <Button type="primary" icon={<FileExcelOutlined />} onClick={() => setOpen(true)}>Xuất dữ liệu</Button>
            <Modal open={open} onCancel={() => setOpen(false)} title="Xuất dữ liệu" centered footer={false}>
                <Alert type="info" showIcon closable message="Để trống nếu xuất tất cả" className="my-4" />
                <Form layout="vertical" onFinish={onFinish}>
                    <ProFormSelect request={apiGetMajorGroup} label="Khối ngành" name="group" />

                    <div className="flex justify-center">
                        <Button type="primary" htmlType="submit" icon={<FileExcelOutlined />}>Xuất dữ liệu</Button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default ExportUserMajor;