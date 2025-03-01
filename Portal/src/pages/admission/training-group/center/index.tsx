import { apiGetListMajor, apiGetMajor } from "@/services/admission/major";
import { apiUploadImage } from "@/services/file";
import { EditOutlined, EyeOutlined, LeftOutlined, MoreOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, PageContainer, ProFormDigit, ProFormInstance, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components"
import { history, useParams } from "@umijs/max"
import { Button, Dropdown, message, Upload } from "antd";
import { useEffect, useRef, useState } from "react";

const TrainingGroupCenter: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [open, setOpen] = useState<boolean>(false);
    const [major, setMajor] = useState<any>(null);
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();

    useEffect(() => {
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

    return (
        <PageContainer extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProTable
                actionRef={actionRef}
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Thêm mới</Button>}
                request={(params) => apiGetListMajor({
                    ...params,
                    trainingGroupId: id
                })}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
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
                            </Dropdown>
                        ],
                        width: 60
                    }
                ]}
                search={{
                    layout: 'vertical'
                }}
            />
            <ModalForm open={open} onOpenChange={setOpen} title="Cài đặt" formRef={formRef}>
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

                <ProFormText label="Ảnh đại diện" name='thumbnail' rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn ảnh đại diện'
                    }
                ]} fieldProps={{
                    suffix: <Upload beforeUpload={async (file) => {
                        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                        if (!isJPG) {
                            message.error('You can only upload JPG or PNG file!');
                            return false;
                        } else {
                            const formData = new FormData();
                            formData.append('file', file);
                            const response = await apiUploadImage(formData);
                            formRef.current?.setFieldValue('thumbnail', response.url);
                            return false;
                        }
                    }} maxCount={1} showUploadList={false}>
                        <Button icon={<UploadOutlined />} size='small' type='dashed'>Tải lên</Button>
                    </Upload>
                }} />
            </ModalForm>
        </PageContainer>
    )
}

export default TrainingGroupCenter