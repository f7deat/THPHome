import { apiGetListAcademicProgram } from "@/services/admission/academic-program";
import { apiGetMajor } from "@/services/admission/major";
import { DeleteOutlined, EditOutlined, EyeOutlined, LeftOutlined, MoreOutlined } from "@ant-design/icons";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { history, useParams, useRequest } from "@umijs/max";
import { Button, Dropdown } from "antd";

const Center: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const { data } = useRequest(() => apiGetMajor(id))

    return (
        <PageContainer title={data?.name} extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProTable
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
                            <Button type="primary" size="small" danger icon={<DeleteOutlined />} key="delete" disabled />
                        ],
                        width: 60
                    }
                ]}
                search={{
                    layout: 'vertical'
                }}
            />
        </PageContainer>
    )
}

export default Center;