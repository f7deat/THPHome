import { apiLeaveRequestCreate, apiLeaveRequestList, apiLeaveRequestUpdate, apiLeaveTypeOptions } from "@/services/leave"
import { DeleteOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons"
import { ActionType, ModalForm, ProFormDatePicker, ProFormDigit, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components"
import { Button, Dropdown, message, Popconfirm } from "antd"
import { useEffect, useRef, useState } from "react"

const LeaveRequest: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [leaveRequest, setLeaveRequest] = useState<any>();
    const [leaveTypeOptions, setLeaveTypeOptions] = useState<any[]>([]);

    useEffect(() => {
        apiLeaveTypeOptions().then(res => setLeaveTypeOptions(res))
    }, []);

    useEffect(() => {
        formRef.current?.setFields([
            {
                name: 'id',
                value: leaveRequest?.id
            },
            {
                name: 'leaveTypeId',
                value: leaveRequest?.leaveTypeId
            },
            {
                name: 'startDate',
                value: leaveRequest?.startDate
            },
            {
                name: 'totalDays',
                value: leaveRequest?.totalDays
            },
            {
                name: 'reason',
                value: leaveRequest?.reason
            }
        ])
    }, [leaveRequest]);

    const onFinish = async (values: any) => {
        if (values.id) {
            await apiLeaveRequestUpdate(values);
        } else {
            await apiLeaveRequestCreate(values);
        }
        message.success('Thành công');
        setOpen(false);
        actionRef.current?.reload();
        formRef.current?.resetFields();
        setLeaveRequest(null)
    }

    return (
        <div>
            <ProTable
                request={apiLeaveRequestList}
                actionRef={actionRef}
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Đăng ký nghỉ phép</Button>}
                rowKey="id"
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: 'Loại nghỉ phép',
                        dataIndex: 'leaveTypeId',
                        valueType: 'select',
                        fieldProps: {
                            options: leaveTypeOptions
                        }
                    },
                    {
                        title: 'Từ ngày',
                        dataIndex: 'startDate',
                        valueType: 'date',
                        width: 100,
                        search: false
                    },
                    {
                        title: 'Số ngày',
                        dataIndex: 'totalDays',
                        valueType: 'digit',
                        width: 80,
                        search: false
                    },
                    {
                        title: 'Lý do',
                        dataIndex: 'reason',
                        search: false
                    },
                    {
                        title: 'Ngày tạo',
                        dataIndex: 'createdDate',
                        valueType: 'fromNow',
                        width: 140,
                        search: false
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        valueType: 'select',
                        valueEnum: {
                            0: {
                                text: 'Chờ duyệt',
                                status: 'Processing'
                            },
                            1: {
                                text: 'Đã duyệt',
                                status: 'Success'
                            },
                            2: {
                                text: 'Từ chối',
                                status: 'Error'
                            }
                        },
                        width: 100
                    },
                    {
                        title: 'Người duyệt',
                        dataIndex: 'approvedBy',
                        search: false,
                        width: 120
                    },
                    {
                        title: 'Ngày duyệt',
                        dataIndex: 'approvedAt',
                        valueType: 'date',
                        search: false,
                        width: 120
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Dropdown key="more" menu={{
                                items: [
                                    {
                                        key: 'edit',
                                        label: 'Chỉnh sửa',
                                    },
                                    {
                                        key: 'approve',
                                        label: 'Phê duyệt',
                                    },
                                    {
                                        key: 'reject',
                                        label: 'Từ chối',
                                        danger: true
                                    }
                                ],
                                onClick: (info) => {
                                    setLeaveRequest(record);
                                    if (info.key === 'edit') {
                                        setOpen(true);
                                        return;
                                    }
                                }
                            }}>
                                <Button type="dashed" size="small" icon={<MoreOutlined />} />
                            </Dropdown>,
                            <Popconfirm title="Xác nhận xóa?" key="delete">
                                <Button danger type="primary" size="small" icon={<DeleteOutlined />} />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                search={{
                    layout: 'vertical'
                }}
            />
            <ModalForm open={open} onOpenChange={setOpen} title="Nghỉ phép" onFinish={onFinish} formRef={formRef}>
                <ProFormText name="id" hidden />
                <div className="flex gap-4">
                    <div className="flex-1">
                        <ProFormSelect name="leaveTypeId" label="Loại nghỉ phép" className="w-full" request={apiLeaveTypeOptions} rules={[
                            {
                                required: true
                            }
                        ]} />
                    </div>
                    <ProFormDatePicker name="startDate" label="Từ ngày" rules={[
                        {
                            required: true
                        }
                    ]} />
                    <ProFormDigit name="totalDays" label="Số ngày" tooltip="Nhập 0.5 nếu nghỉ nửa ngày" rules={[
                        {
                            required: true
                        }
                    ]} fieldProps={{
                        step: 0.5
                    }} />
                </div>
                <ProFormTextArea name="reason" label="Lý do" />
            </ModalForm>
        </div>
    )
}

export default LeaveRequest