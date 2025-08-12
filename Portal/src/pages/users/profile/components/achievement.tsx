import { apiAchievementAdd, apiAchievementDelete, apiAchievementList, apiAchievementUpdate } from "@/services/user";
import { DeleteOutlined, EditOutlined, PictureOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormDatePicker, ProFormInstance, ProFormText, ProFormTextArea, ProFormUploadDragger, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, message, Popconfirm, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const AchievementTab: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [achievement, setAchievement] = useState<any>();
    const { initialState } = useModel('@@initialState');
    const [openEvidence, setOpenEvidence] = useState<boolean>(false);

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
                    name: 'year',
                    value: achievement?.year ? dayjs(`${achievement?.year}-01-01`) : null
                }
            ]);
        }
    }, [open, achievement]);

    const onFinish = async (values: any) => {
        values.year = values.year ? Number(values.year) : null;
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
                        title: 'Năm đạt',
                        dataIndex: 'year',
                        width: 100,
                        search: false
                    },
                    {
                        title: 'Minh chứng',
                        dataIndex: 'evidence',
                        render: (_, entity) => (
                            <Space>
                                <Button type="dashed" icon={<PictureOutlined />} size="small">Xem minh chứng</Button>
                                <Button size="small" type="dashed" icon={<UploadOutlined />} onClick={() => {
                                    setAchievement(entity);
                                    setOpenEvidence(true);
                                }}></Button>
                            </Space>
                        ),
                        search: false,
                        width: 250
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
                search={{
                    layout: 'vertical'
                }}
                rowKey="id"
            />
            <ModalForm title="Cài đặt" open={open} onOpenChange={setOpen} formRef={formRef} onFinish={onFinish} width={500}>
                <ProFormText name="id" hidden />
                <ProFormTextArea name="name" label="Nội dung" rules={[
                    {
                        required: true
                    }
                ]} />
                <ProFormDatePicker.Year name="year" label="Thời gian đạt" width="xl" />
            </ModalForm>
            <ModalForm open={openEvidence} onOpenChange={setOpenEvidence} title="Minh chứng">
                <ProFormUploadDragger />
            </ModalForm>
        </>
    )
}

export default AchievementTab;