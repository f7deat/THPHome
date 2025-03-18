import { apiWorkingExperienceAdd, apiWorkingExperienceDelete, apiWorkingExperienceList, apiWorkingExperienceUpdate } from "@/services/user";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormDatePicker, ProFormInstance, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const WorkingExperienceTab: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [workingExperience, setWorkingExperience] = useState<any>();
    const { initialState } = useModel('@@initialState');

    useEffect(() => {
        if (open) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: workingExperience?.id
                },
                {
                    name: 'companyName',
                    value: workingExperience?.companyName
                },
                {
                    name: 'startDate',
                    value: workingExperience?.startDate ? dayjs(workingExperience?.startDate) : null
                },
                {
                    name: 'endDate',
                    value: workingExperience?.endDate ? dayjs(workingExperience?.endDate) : null
                },
                {
                    name: 'position',
                    value: workingExperience?.position
                },
                {
                    name: 'description',
                    value: workingExperience?.description
                },
                {
                    name: 'workplace',
                    value: workingExperience?.workplace
                }
            ]);
        }
    }, [open, workingExperience]);

    const onFinish = async (values: any) => {
        if (values.id) {
            await apiWorkingExperienceUpdate(values);
        } else {
            await apiWorkingExperienceAdd(values);
        }
        setOpen(false);
        formRef.current?.resetFields();
        actionRef.current?.reload();
        setWorkingExperience(null);
        message.success('Thành công');
    }

    const onDelete = async (id: string) => {
        await apiWorkingExperienceDelete(id);
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
                        title: "Đơn vị công tác",
                        dataIndex: "companyName"
                    },
                    {
                        title: 'Thời gian bắt đầu',
                        dataIndex: 'startDate',
                        valueType: 'date'
                    },
                    {
                        title: 'Thời gian kết thúc',
                        dataIndex: 'endDate',
                        valueType: 'date'
                    },
                    {
                        title: 'Chức danh',
                        dataIndex: 'position'
                    },
                    {
                        title: 'Mô tả',
                        dataIndex: 'description'
                    },
                    {
                        title: 'Địa chỉ',
                        dataIndex: 'workplace'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => {
                                setWorkingExperience(record);
                                setOpen(true);
                            }} key="edit" />,
                            <Popconfirm key="delete" title="Bạn có chắc chắn muốn xóa?" onConfirm={() => onDelete(record.id)}>
                                <Button danger type="primary" icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                request={(params) => apiWorkingExperienceList({
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
                <ProFormText name="companyName" label="Đơn vị công tác" rules={[
                    {
                        required: true
                    }
                ]} />
                <div className="md:flex gap-4">
                    <div className="flex-1">
                        <ProFormText name="position" label="Chức danh" />
                    </div>
                    <ProFormDatePicker name="startDate" label="Thời gian bắt đầu" />
                    <ProFormDatePicker name="endDate" label="Thời gian kết thúc" />
                </div>
                <ProFormTextArea name="description" label="Mô tả" />
                <ProFormText name="workplace" label="Địa chỉ" />
            </ModalForm>
        </>
    )
}

export default WorkingExperienceTab;