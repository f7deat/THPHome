import { PlusOutlined } from "@ant-design/icons";
import { ModalForm, ProFormText, ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { useState } from "react";

const EducationHistoryTab: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <ProTable
                headerTitle={<Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>Thêm mới</Button>}
                search={false}
                ghost
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    }
                ]}
            />
            <ModalForm open={open} onOpenChange={setOpen} title="Cài đặt">
                <ProFormText name="id" hidden />
                
             </ModalForm>
        </>
    )
}

export default EducationHistoryTab;