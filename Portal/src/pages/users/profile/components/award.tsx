import { apiAwardAdd, apiAwardDelete, apiAwardList, apiAwardUpdate } from "@/services/user";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormDatePicker, ProFormInstance, ProFormText, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const AwardTab: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [award, setAward] = useState<any>();
    const { initialState } = useModel('@@initialState');

    useEffect(() => {
        formRef.current?.setFields([
            {
                name: 'name',
                value: award?.name
            },
            {
                name: 'year',
                value: award?.year ? dayjs(`${award?.year}-01-01`) : null
            }
        ]);
    }, [open, award]);

    const onFinish = async (values: any) => {
        values.year = values.year ? Number(values.year) : null;
        if (values.id) {
            await apiAwardUpdate(values);
        } else {
            await apiAwardAdd(values);
        }
        setOpen(false);
        formRef.current?.resetFields();
        actionRef.current?.reload();
        setAward(null);
        message.success('Thành công');
    }

    const onDelete = async (id: string) => {
        await apiAwardDelete(id);
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
                        title: "Hình thức và nội dung giải thưởng",
                        dataIndex: "name"
                    },
                    {
                        title: 'Năm',
                        dataIndex: 'year',
                        width: 100
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => {
                                setAward(record);
                                setOpen(true);
                            }} key="edit" />,
                            <Popconfirm key="delete" title="Bạn có chắc chắn muốn xóa?" onConfirm={() => onDelete(record.id)}>
                                <Button danger type="primary" icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                request={(params) => apiAwardList({
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
                <div className="flex gap-4">
                    <div className="flex-1">
                        <ProFormText name="name" label="Hình thức và nội dung giải thưởng" rules={[
                            {
                                required: true
                            }
                        ]} />
                    </div>
                    <ProFormDatePicker.Year name="year" label="Năm" />
                </div>
            </ModalForm>
        </>
    )
}

export default AwardTab;