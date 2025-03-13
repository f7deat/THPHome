import { apiEducationHistoryAdd, apiEducationHistoryList, apiEducationHistoryUpdate } from "@/services/user";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormDatePicker, ProFormInstance, ProFormText, ProTable } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { useRef, useState } from "react";

const EducationHistoryTab: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();

    const onFinish = async (values: any) => {
        if (values.id) {
            await apiEducationHistoryUpdate(values);
        } else {
            await apiEducationHistoryAdd(values);
        }
        message.success('Thành công!');
        formRef.current?.resetFields();
        actionRef.current?.reload();
        setOpen(false);
    }

    return (
        <>
            <ProTable
                request={apiEducationHistoryList}
                actionRef={actionRef}
                headerTitle={<Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>Thêm mới</Button>}
                search={false}
                ghost
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: 'Bậc đào tạo',
                        dataIndex: 'degree'
                    },
                    {
                        title: 'Nơi đào tạo',
                        dataIndex: 'institution'
                    },
                    {
                        title: 'Chuyên ngành',
                        dataIndex: 'major'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: () => [
                            <Button key="edit" size="small" type="primary" icon={<EditOutlined />} />
                        ],
                        width: 60
                    }
                ]}
            />
            <ModalForm open={open} onOpenChange={setOpen} title="Cài đặt" onFinish={onFinish} formRef={formRef}>
                <ProFormText name="id" hidden />
                <ProFormText name="degree" label="Bậc đào tạo" />
                <ProFormText name="institution" label="Nơi đào tạo" />
                <div className="flex gap-4">
                    <div className="flex-1">
                        <ProFormText name="major" label="Chuyên ngành" />
                    </div>
                    <ProFormDatePicker.Year name="graduationYear" label="Năm tốt nghiệp" />
                </div>
            </ModalForm>
        </>
    )
}

export default EducationHistoryTab;