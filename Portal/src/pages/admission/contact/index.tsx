import { apiListContact, apiUpdateContactStatus } from "@/services/contact";
import { CheckOutlined, CloseOutlined, RightOutlined } from "@ant-design/icons";
import { ActionType, PageContainer, ProTable } from "@ant-design/pro-components"
import { Button, message, Popconfirm, Tag, Tooltip } from "antd";
import { ContactStatus } from "./constants";
import { useRef } from "react";

const Index: React.FC = () => {

    const actionRef = useRef<ActionType>();

    const updateStatus = async (id: string, status: ContactStatus) => {
        await apiUpdateContactStatus({ id, status });
        message.success('Cập nhật thành công!');
        actionRef.current?.reload();
    }

    return (
        <PageContainer>
            <ProTable
                actionRef={actionRef}
                request={apiListContact}
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
                        title: 'Họ và tên',
                        dataIndex: 'fullName'
                    },
                    {
                        title: 'SDT',
                        dataIndex: 'phoneNumber'
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email'
                    },
                    {
                        title: 'Trường học',
                        dataIndex: 'school'
                    },
                    {
                        title: 'Địa chỉ',
                        dataIndex: 'address',
                        search: false
                    },
                    {
                        title: 'Ngày liên hệ',
                        dataIndex: 'createdDate',
                        valueType: 'fromNow',
                        width: 120
                    },
                    {
                        title: 'Ghi chú',
                        dataIndex: 'note',
                        search: false
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        valueEnum: {
                            0: <Tag color="warning">Pending</Tag>,
                            1: <Tag color="processing">Processing</Tag>,
                            2: <Tag color="success">Completed</Tag>,
                            3: <Tag color="error">Rejected</Tag>
                        },
                        search: false
                    },
                    {
                        title: 'Người tiếp nhận',
                        dataIndex: 'userName',
                        search: false
                    },
                    {
                        title: 'Ngày cập nhật',
                        dataIndex: 'modifiedDate',
                        valueType: 'fromNow'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, entity) => [
                            <Tooltip key="approve" title="Hoàn thành">
                                <Popconfirm title="Xác nhận hoàn thành?" onConfirm={() => updateStatus(entity.id, ContactStatus.Completed)}>
                                    <Button type="primary" size="small" icon={<CheckOutlined />} hidden={entity.status !== ContactStatus.Processing} />
                                </Popconfirm>
                            </Tooltip>,
                            <Tooltip key="approve" title="Tiếp nhận">
                                <Popconfirm title="Xác nhận tiếp nhận?" onConfirm={() => updateStatus(entity.id, ContactStatus.Processing)}>
                                    <Button type="primary" size="small" icon={<RightOutlined />} hidden={entity.status !== ContactStatus.Pending} />
                                </Popconfirm>
                            </Tooltip>,
                            <Popconfirm key="reject" title="Xác nhận loại bỏ?" onConfirm={() => updateStatus(entity.id, ContactStatus.Rejected)}>
                                <Tooltip title="Loại bỏ">
                                    <Button type="primary" danger size="small" icon={<CloseOutlined />} hidden={entity.status !== ContactStatus.Pending} />
                                </Tooltip>
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
            />
        </PageContainer>
    )
}

export default Index;