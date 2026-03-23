import { apiCreateAcademicProgram, apiDeleteAcademicProgram, apiGetListAcademicProgram } from "@/services/admission/academic-program";
import { apiGetMajor } from "@/services/admission/major";
import { DeleteOutlined, EditOutlined, EyeOutlined, LeftOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, PageContainer, ProFormDigit, ProFormInstance, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components";
import { history, useParams, useRequest } from "@umijs/max";
import { Button, Dropdown, Popconfirm, message } from "antd";
import { useRef, useState } from "react";

const Center: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const { data } = useRequest(() => apiGetMajor(id))
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState(false);

    const onFinish = async (values: any) => {
        await apiCreateAcademicProgram({
            ...values,
            majorId: Number(id)
        });
        message.success('Thành công');
        setOpen(false);
        formRef.current?.resetFields();
        actionRef.current?.reload();
        return true;
    }

    const onDelete = async (academicProgramId: number) => {
        await apiDeleteAcademicProgram(academicProgramId);
        message.success('Xóa thành công');
        actionRef.current?.reload();
    }

    return (
        <PageContainer title={data?.name} extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProTable
                actionRef={actionRef}
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Thêm mới</Button>}
                request={(params) => apiGetListAcademicProgram({ ...params, majorId: id })}
                columns={[
                    {
                        title: 'TT',
                        dataIndex: 'sortOrder',
                        width: 30,
                        search: false
                    },
                    {
                        title: 'Mã CTĐT',
                        dataIndex: 'code',
                        width: 80
                    },
                    {
                        title: 'Tên CTĐT',
                        dataIndex: 'title'
                    },
                    {
                        title: 'Mô tả',
                        dataIndex: 'description',
                        search: false
                    },
                    {
                        title: 'Lượt xem',
                        dataIndex: 'view',
                        width: 80,
                        search: false,
                        valueType: 'digit'
                    },
                    {
                        title: 'Ngày tạo',
                        dataIndex: 'createdDate',
                        width: 120,
                        search: false,
                        valueType: 'fromNow' 
                    },
                    {
                        title: 'Ngày cập nhật',
                        dataIndex: 'modifiedDate',
                        width: 120,
                        search: false,
                        valueType: 'fromNow' 
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Dropdown key="more" menu={{
                                items: [
                                    {
                                        label: 'Xem',
                                        key: 'view',
                                        onClick: () => window.open(`https://tuyensinh.dhhp.edu.vn/academic-program/${record.url}`, '_blank'),
                                        icon: <EyeOutlined />
                                    },
                                    {
                                        label: 'Chỉnh sửa',
                                        key: 'edit',
                                        onClick: () => history.push(`/admission/training-group/major/setting/${record.postId}`),
                                        icon: <EditOutlined />
                                    }
                                ]
                            }}>
                                <Button type="dashed" size="small" icon={<MoreOutlined />} />
                            </Dropdown>,
                            <Popconfirm key="delete" title="Xác nhận xóa?" onConfirm={() => onDelete(record.id)}>
                                <Button type="primary" size="small" danger icon={<DeleteOutlined />} />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                search={{
                    layout: 'vertical'
                }}
            />
            <ModalForm
                open={open}
                onOpenChange={(visible) => {
                    setOpen(visible);
                    if (!visible) {
                        formRef.current?.resetFields();
                    }
                }}
                title="Thêm mới chương trình đào tạo"
                formRef={formRef}
                onFinish={onFinish}
            >
                <ProFormText
                    name="code"
                    label="Mã CTĐT"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                />
                <ProFormText
                    name="title"
                    label="Tên CTĐT"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                />
                <ProFormTextArea name="description" label="Mô tả" />
                <ProFormDigit name="sortOrder" label="Thứ tự" initialValue={0} />
            </ModalForm>
        </PageContainer>
    )
}

export default Center;