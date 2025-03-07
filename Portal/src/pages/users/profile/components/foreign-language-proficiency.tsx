import { apiForeignLanguageProficiencyCreate, apiForeignLanguageProficiencyUpdate } from "@/services/user";
import { PlusOutlined } from "@ant-design/icons";
import { ProTable, ModalForm, ProFormText, ProFormInstance, ActionType } from "@ant-design/pro-components";
import { Button, message, Popconfirm } from "antd";
import { useEffect, useRef, useState } from "react";

const ForeignLanguageProficiency: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [language, setLanguage] = useState<any>();
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();

    useEffect(() => {
        if (open) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: language?.id
                },
                {
                    name: 'language',
                    value: language?.language
                },
                {
                    name: 'level',
                    value: language?.level
                },
                {
                    name: 'certificate',
                    value: language?.certificate
                }
            ])
        }
    }, [open]);

    const onFinish = async (values: any) => {
        if (values.id) {
           await apiForeignLanguageProficiencyUpdate(values);
        } else {
            await apiForeignLanguageProficiencyCreate(values);
        }
        message.success('Thành công');
        actionRef.current?.reload();
        setOpen(false);
        formRef.current?.resetFields();
    }

    return (
        <>
            <ProTable
                actionRef={actionRef}
                ghost
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Thêm mới</Button>}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30,
                        align: 'center'
                    },
                    {
                        title: 'Ngoại ngữ',
                        dataIndex: 'language'
                    },
                    {
                        title: 'Trình độ',
                        dataIndex: 'level'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, entity) => [
                            <Button type="primary" key="edit" onClick={() => {
                                setLanguage(entity);
                                setOpen(true);
                            }}>Chỉnh sửa</Button>,
                            <Popconfirm title="Bạn có chắc chắn muốn xóa?" okText="Có" cancelText="Không" key="delete">
                                <Button danger>Xóa</Button>
                            </Popconfirm>
                        ]
                    }
                ]}
                search={false}
            />
            <ModalForm title="Cài đặt" open={open} onOpenChange={setOpen} formRef={formRef} onFinish={onFinish}>
                <ProFormText name="id" label="ID" hidden />
                <ProFormText name="language" label="Ngoại ngữ" />
                <ProFormText name="level" label="Trình độ" />
                <ProFormText name="certificate" label="Chứng chỉ" />
            </ModalForm>
        </>
    )
}

export default ForeignLanguageProficiency;