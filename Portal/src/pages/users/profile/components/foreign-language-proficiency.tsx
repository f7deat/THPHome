import { apiForeignLanguageProficiencyCreate, apiForeignLanguageProficiencyDelete, apiForeignLanguageProficiencyList, apiForeignLanguageProficiencyUpdate } from "@/services/user";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ProTable, ModalForm, ProFormText, ProFormInstance, ActionType } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Popconfirm } from "antd";
import { useEffect, useRef, useState } from "react";

const ForeignLanguageProficiency: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [language, setLanguage] = useState<any>();
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const { initialState } = useModel('@@initialState');

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

    const onConfirm = async (id: string) => {
        await apiForeignLanguageProficiencyDelete(id);
        message.success('Thành công');
        actionRef.current?.reload();
    }

    return (
        <>
            <ProTable
                actionRef={actionRef}
                ghost
                request={(params) => apiForeignLanguageProficiencyList({
                    ...params,
                    userName: initialState?.currentUser.userName
                })}
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
                        title: 'Chứng chỉ',
                        dataIndex: 'certificate'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, entity) => [
                            <Button type="primary" key="edit" onClick={() => {
                                setLanguage(entity);
                                setOpen(true);
                            }} icon={<EditOutlined />} size="small" />,
                            <Popconfirm title="Bạn có chắc chắn muốn xóa?" okText="Có" cancelText="Không" key="delete" onConfirm={() => onConfirm(entity.id)}>
                                <Button danger size="small" type="primary" icon={<DeleteOutlined />}></Button>
                            </Popconfirm>
                        ],
                        width: 60
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