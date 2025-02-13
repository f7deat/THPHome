import { apiExportProficiancy, apiGetProficiencyTypeOptions } from "@/services/onboard/proficiency";
import { FileExcelOutlined } from "@ant-design/icons";
import { ModalForm, ProFormSelect } from "@ant-design/pro-components"
import { useParams } from "@umijs/max";
import { Button } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const ExportPracticeModal: React.FC = () => {

    const { id } = useParams();
    const [open, setOpen] = useState<boolean>(false);
    const [typeOptions, setTypeOptions] = useState<any[]>([]);
    useEffect(() => {
        if (open) {
            apiGetProficiencyTypeOptions().then((response: any) => setTypeOptions(response))
        }
    }, [open]);

    const onFinish = async (values: any) => {
        const response = await apiExportProficiancy({
            ...values,
            batchId: id
        }) as any;
        const url = window.URL.createObjectURL(
            new Blob([response]),
        );
        const link = document.createElement('a');
        link.href = url;
        const type = typeOptions.find((x: any) => x.value === values.typeId);
        link.setAttribute('download', `${type.label}-${dayjs().year()}${dayjs().month()}${dayjs().day()}.xlsx`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode?.removeChild(link);

    }

    return (
        <>
            <Button icon={<FileExcelOutlined />} onClick={() => setOpen(true)}>Xuất dữ liệu</Button>
            <ModalForm open={open} onOpenChange={setOpen} title="Xuất dữ liệu" onFinish={onFinish}>
                <ProFormSelect options={typeOptions} label="Loại đăng ký" name="typeId" rules={[
                    {
                        required: true
                    }
                ]} />
            </ModalForm>
        </>
    )
}

export default ExportPracticeModal;