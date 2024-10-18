import { apiProficiencyList } from "@/services/onboard/proficiency";
import { EyeOutlined } from "@ant-design/icons";
import { PageContainer, ProTable } from "@ant-design/pro-components"
import { Button, Image, Popover, Tag } from "antd";

const ProficiencyPage: React.FC = () => {
    return (
        <PageContainer>
            <ProTable
                search={{
                    layout: 'vertical'
                }}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: 'Minh chứng',
                        dataIndex: 'evidence',
                        render: (_, entity) => (
                            <Popover content={(
                                <div className="w-48">
                                    <Image src={entity.evidence} />
                                </div>
                            )}>
                                <Button type="primary" icon={<EyeOutlined />} size="small" />
                            </Popover>
                        ),
                        width: 100,
                        align: 'center',
                        search: false
                    },
                    {
                        title: 'Mã sinh viên',
                        dataIndex: 'userName'
                    },
                    {
                        title: 'Họ và tên',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Loại',
                        dataIndex: 'type',
                        valueEnum: {
                            0: 'Tiếng Anh',
                            2: 'Tiếng Trung',
                            3: 'Tiếng Nhật',
                            1: 'Tin Học'
                        }
                    },
                    {
                        title: 'Ngày đăng ký',
                        dataIndex: 'createdDate',
                        valueType: 'dateTime',
                        search: false,
                        width: 160
                    },
                    {
                        title: 'Ngày cập nhật',
                        dataIndex: 'modifiedDate',
                        valueType: 'dateTime',
                        search: false,
                        width: 160
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        valueType: 'select',
                        valueEnum: {
                            0: <Tag color="orange">Chờ xác nhận</Tag>,
                            2: <Tag color="green">Đã thanh toán</Tag>
                        },
                        width: 120,
                        fieldProps: {
                            options: [
                                {
                                    label: 'Chờ xác nhận',
                                    value: 0
                                },
                                {
                                    label: 'Đã thanh toán',
                                    value: 2
                                }
                            ]
                        }
                    },
                    {
                        title: 'Ngày thanh toán',
                        dataIndex: 'paymentDate',
                        valueType: 'dateTime',
                        search: false,
                        width: 160
                    }
                ]}
                request={apiProficiencyList}
            />

        </PageContainer>
    )
}

export default ProficiencyPage;