import { apiTrainingGroupList } from "@/services/admission/training-group";
import { DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { PageContainer, ProTable } from "@ant-design/pro-components"
import { history } from "@umijs/max";
import { Button, Dropdown, Switch } from "antd";

const TrainingGroup: React.FC = () => {
    return (
        <PageContainer>
            <ProTable
                headerTitle={<Button type="primary" icon={<PlusOutlined />}>Thêm mới</Button>}
                request={apiTrainingGroupList}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: 'Tên ngành/chuyên ngành',
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
                        render: (_, record) => <Switch size="small" checked={record.active} />,
                        width: 100,
                        search: false,
                        align: 'center'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        width: 80,
                        render: (_, entity) => [
                            <Dropdown key="more" menu={{
                                items: [
                                    {
                                        label: 'Xem chi tiết',
                                        key: 'view',
                                        icon: <EyeOutlined />
                                    },
                                    {
                                        label: 'Chỉnh sửa',
                                        key: 'edit',
                                        icon: <EditOutlined />,
                                        disabled: true
                                    }
                                ],
                                onClick: (info) => {
                                    if (info.key === 'view') {
                                        history.push(`/admission/training-group/center/${entity.id}`);
                                        return;
                                    }
                                }
                            }}>
                                <Button size="small" icon={<MoreOutlined />} />
                            </Dropdown>,
                            <Button key="delete" disabled size="small" type="primary" danger icon={<DeleteOutlined />}></Button>
                        ]
                    }
                ]}
                search={{
                    layout: 'vertical'
                }}
            />
        </PageContainer>
    )
}

export default TrainingGroup;