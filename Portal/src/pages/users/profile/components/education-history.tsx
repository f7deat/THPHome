import { apiEducationHistoryAdd, apiEducationHistoryDelete, apiEducationHistoryList, apiEducationHistoryUpdate } from "@/services/user";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormDatePicker, ProFormInstance, ProFormText, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const EducationHistoryTab: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const [educationHistory, setEducationHistory] = useState<any>();
    const { initialState } = useModel('@@initialState');

    useEffect(() => {
        formRef.current?.setFields([
            {
                name: 'id',
                value: educationHistory?.id
            },
            {
                name: 'degree',
                value: educationHistory?.degree
            },
            {
                name: 'institution',
                value: educationHistory?.institution
            },
            {
                name: 'major',
                value: educationHistory?.major
            },
            {
                name: 'graduationYear',
                value: educationHistory?.graduationYear ? dayjs(`${educationHistory.graduationYear}-01-01`) : null
            }
        ])
    }, [educationHistory, open])

    const onFinish = async (values: any) => {
        if (values.id) {
            await apiEducationHistoryUpdate(values);
        } else {
            await apiEducationHistoryAdd(values);
        }
        message.success('Thành công!');
        formRef.current?.resetFields();
        setEducationHistory(null);
        actionRef.current?.reload();
        setOpen(false);
    }

    const onDelete = async (id: string) => {
        await apiEducationHistoryDelete(id);
        message.success('Thành công!');
        actionRef.current?.reload();
    }

    return (
        <>
            <ProTable
                request={(params) => apiEducationHistoryList({
                    ...params,
                    userName: initialState?.currentUser?.userName
                })}
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
                        title: 'Năm tốt nghiệp',
                        dataIndex: 'graduationYear'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button key="edit" size="small" type="primary" icon={<EditOutlined />} onClick={() => {
                                setEducationHistory(record);
                                setOpen(true);
                            }} />,
                            <Popconfirm key="delete" title="Xác nhận xóa?" onConfirm={() => onDelete(record.id)} okText="Xóa" cancelText="Hủy">
                                <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
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