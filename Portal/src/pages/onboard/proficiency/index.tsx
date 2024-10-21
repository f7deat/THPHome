import { apiDeleteProficiency, apiProficiencyList } from "@/services/onboard/proficiency";
import { DeleteOutlined, EditOutlined, EyeOutlined, ManOutlined, WomanOutlined } from "@ant-design/icons";
import { ActionType, PageContainer, ProTable } from "@ant-design/pro-components"
import { Button, Image, message, Popconfirm, Popover, Tag } from "antd";
import ProFiciencyForm from "./components/form";
import { useRef } from "react";

const ProficiencyPage: React.FC = () => {

    const actionRef = useRef<ActionType>();

    return (
        <PageContainer extra={<ProFiciencyForm reload={() => {
            actionRef.current?.reload();
        }} />}>
            <ProTable
                actionRef={actionRef}
                search={{
                    layout: 'vertical'
                }}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30,
                        align: 'center'
                    },
                    {
                        title: 'MC',
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
                        width: 50,
                        align: 'center',
                        search: false
                    },
                    {
                        title: 'Mã sinh viên',
                        dataIndex: 'userName',
                        width: 100
                    },
                    {
                        title: 'Họ và tên',
                        dataIndex: 'name',
                        render: (dom, entity) => {
                            if (entity.gender === 0) {
                                return <><ManOutlined className="text-blue-500" /> {dom}</>
                            }
                            if (entity.gender === 1) {
                                return <><WomanOutlined className="text-red-500" /> {dom}</>
                            }
                            return dom;
                        }
                    },
                    {
                        title: 'Ngày sinh',
                        dataIndex: 'dateOfBirth',
                        valueType: 'date',
                        width: 90,
                        search: false
                    },
                    {
                        title: 'SĐT',
                        dataIndex: 'phoneNumber',
                        width: 90
                    },
                    {
                        title: 'Loại',
                        dataIndex: 'type',
                        valueEnum: {
                            0: 'Tiếng Anh',
                            2: 'Tiếng Trung',
                            3: 'Tiếng Nhật',
                            1: 'Tin Học'
                        },
                        width: 80
                    },
                    {
                        title: 'Ngày đăng ký',
                        dataIndex: 'createdDate',
                        valueType: 'dateTime',
                        search: false,
                        width: 150
                    },
                    {
                        title: 'Lớp',
                        dataIndex: 'className',
                        width: 80
                    },
                    {
                        title: 'Ngày cập nhật',
                        dataIndex: 'modifiedDate',
                        valueType: 'dateTime',
                        search: false,
                        width: 150
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        valueType: 'select',
                        valueEnum: {
                            0: <Tag color="orange">Chờ xác nhận</Tag>,
                            1: <Tag color="blue">Đã xác nhận</Tag>,
                            2: <Tag color="green">Đã thanh toán</Tag>
                        },
                        width: 100,
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
                        width: 150
                    },
                    {
                        title: 'Nguồn',
                        dataIndex: 'source',
                        search: false,
                        valueEnum: {
                            0: 'Online',
                            1: 'Offline'
                        }
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, entity) => [
                            <Button type="primary" size="small" icon={<EditOutlined />} key="edit" disabled={entity.source === 0} />,
                            <Popconfirm key="delete" title="Xác nhận xóa?" onConfirm={async () => {
                                await apiDeleteProficiency(entity.id);
                                message.success('Xóa thành công!');
                                actionRef.current?.reload();
                            }}>
                                <Button type="primary" size="small" danger icon={<DeleteOutlined />} disabled={entity.source === 0} />
                            </Popconfirm>
                        ],
                        width: 50
                    }
                ]}
                request={apiProficiencyList}
            />

        </PageContainer>
    )
}

export default ProficiencyPage;