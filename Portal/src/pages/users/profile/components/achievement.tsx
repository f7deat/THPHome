import { apiAchievementAdd, apiAchievementDelete, apiAchievementList, apiAchievementUpdate } from "@/services/user";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormDatePicker, ProFormInstance, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Popconfirm } from "antd";
import { useEffect, useRef, useState } from "react";

const AchievementTab: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [achievement, setAchievement] = useState<any>();
    const { initialState } = useModel('@@initialState');

    useEffect(() => {
        if (open) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: achievement?.id
                },
                {
                    name: 'name',
                    value: achievement?.name
                },
                {
                    name: 'achievementDate',
                    value: achievement?.achievementDate
                }
            ]);
        }
    }, [open, achievement]);

    const onFinish = async (values: any) => {
        if (values.id) {
            await apiAchievementUpdate(values);
        } else {
            await apiAchievementAdd(values);
        }
        setOpen(false);
        formRef.current?.resetFields();
        actionRef.current?.reload();
        setAchievement(null);
        message.success('Thành công');
    }

    const onDelete = async (id: string) => {
        await apiAchievementDelete(id);
        actionRef.current?.reload();
        message.success('Thành công');
    }

    return (
        <>
            <ProTable
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: "Nội dung",
                        dataIndex: "name"
                    },
                    {
                        title: 'Thời gian đạt',
                        dataIndex: 'achievementDate',
                        valueType: 'date',
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => {
                                setAchievement(record);
                                setOpen(true);
                            }} key="edit" />,
                            <Popconfirm key="delete" title="Bạn có chắc chắn muốn xóa?" onConfirm={() => onDelete(record.id)}>
                                <Button danger type="primary" icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                request={(params) => apiAchievementList({
                    ...params,
                    userName: initialState?.currentUser?.userName
                })}
                actionRef={actionRef}
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Thêm mới</Button>}
                search={false}
                rowKey="id"
                ghost
            />
            <ModalForm title="Cài đặt" open={open} onOpenChange={setOpen} formRef={formRef} onFinish={onFinish}>
                <ProFormText name="id" hidden />
                <ProFormTextArea name="name" label="Nội dung" rules={[
                    {
                        required: true
                    }
                ]} />
                <ProFormDatePicker name="achievementDate" label="Thời gian đạt" width="xl" className="w-full" rootClassName="w-full" />
            </ModalForm>
        </>
    )
}

export default AchievementTab;