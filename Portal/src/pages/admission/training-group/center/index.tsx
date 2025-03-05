import { apiGetListMajor, apiGetMajor, apiUpdateMajor } from "@/services/admission/major";
import { apiTrainingGroupDetail } from "@/services/admission/training-group";
import { DeleteOutlined, EditOutlined, EyeOutlined, LeftOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, PageContainer, ProFormDigit, ProFormInstance, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components"
import { history, useParams } from "@umijs/max"
import { Button, Dropdown, message } from "antd";
import { useEffect, useRef, useState } from "react";

const TrainingGroupCenter: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [open, setOpen] = useState<boolean>(false);
    const [major, setMajor] = useState<any>(null);
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const [data, setData] = useState<any>();

    useEffect(() => {
        apiTrainingGroupDetail(id).then(response => {
            setData(response);
        });
        if (major) {
            apiGetMajor(major.id).then(response => {
                const res = response.data;
                formRef.current?.setFields([
                    {
                        name: 'id',
                        value: res.id
                    },
                    {
                        name: 'sortOrder',
                        value: res.sortOrder
                    },
                    {
                        name: 'code',
                        value: res.code
                    },
                    {
                        name: 'name',
                        value: res.name
                    },
                    {
                        name: 'description',
                        value: res.description
                    },
                    {
                        name: 'thumbnail',
                        value: res.thumbnail
                    }
                ])
            });
        }
    }, [major]);

    const onFinish = async (values: any) => {
        if (values.id) {
            // Update
            await apiUpdateMajor(values);
        }
        message.success('Thành công');
        actionRef.current?.reload();
        setOpen(false);
    }

    return (
        <PageContainer title={data?.name} extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProTable
                actionRef={actionRef}
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Thêm mới</Button>}
                request={(params) => apiGetListMajor({
                    ...params,
                    trainingGroupId: id
                })}
                columns={[
                    {
                        title: 'TT',
                        dataIndex: 'sortOrder',
                        width: 30,
                        search: false
                    },
                    {
                        title: 'Mã',
                        dataIndex: 'code',
                        width: 80
                    },
                    {
                        title: 'Tên chuyên ngành',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Mô tả',
                        dataIndex: 'description',
                        search: false
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'active',
                        render: (_, record) => record.active ? 'Đang hoạt động' : 'Ngưng hoạt động',
                        width: 120,
                        search: false
                    },
                    {
                        title: "Tác vụ",
                        valueType: 'option',
                        render: (_, record) => [
                            <Dropdown key="more" menu={{
                                items: [
                                    {
                                        key: 'view',
                                        label: 'Xem chi tiết',
                                        icon: <EyeOutlined />,
                                        onClick: () => {
                                            history.push(`/admission/training-group/major/center/${record.id}`);
                                        }
                                    },
                                    {
                                        key: 'edit',
                                        label: 'Chỉnh sửa',
                                        onClick: () => {
                                            setMajor(record);
                                            setOpen(true);
                                        },
                                        icon: <EditOutlined />
                                    }
                                ]
                            }}>
                                <Button size="small" type="dashed" icon={<MoreOutlined />} />
                            </Dropdown>,
                            <Button type="primary" size="small" danger icon={<DeleteOutlined />} key="delete" disabled />
                        ],
                        width: 60
                    }
                ]}
                search={{
                    layout: 'vertical'
                }}
            />
            <ModalForm open={open} onOpenChange={setOpen} title="Cài đặt" formRef={formRef} onFinish={onFinish}>
                <ProFormText name="id" hidden />
                <ProFormText name="code" label="Mã" rules={[
                    {
                        required: true
                    }
                ]} />
                <ProFormText name="name" label="Tên chuyên ngành" rules={[
                    {
                        required: true
                    }
                ]} />
                <ProFormTextArea name="description" label="Mô tả" />
                <ProFormDigit name="sortOrder" label="Thứ tự" />
            </ModalForm>
        </PageContainer>
    )
}

export default TrainingGroupCenter