import { apiLeaveBalanceByType, apiLeaveRequestApprove, apiLeaveRequestCreate, apiLeaveRequestDelete, apiLeaveRequestList, apiLeaveRequestReject, apiLeaveRequestUpdate, apiLeaveTypeOptions } from "@/services/leave"
import { DeleteOutlined, ManOutlined, MoreOutlined, PlusOutlined, WomanOutlined } from "@ant-design/icons"
import { ActionType, ModalForm, ProFormDatePicker, ProFormDigit, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components"
import { useAccess, useModel } from "@umijs/max"
import { Alert, Button, Dropdown, message, Popconfirm } from "antd"
import { useEffect, useRef, useState } from "react"

const LeaveRequest: React.FC = () => {

    const access = useAccess();
    const [open, setOpen] = useState<boolean>(false);
    const [openApprove, setOpenApprove] = useState<boolean>(false);
    const [openReject, setOpenReject] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [leaveRequest, setLeaveRequest] = useState<any>();
    const [leaveTypeOptions, setLeaveTypeOptions] = useState<any[]>([]);
    const { initialState } = useModel('@@initialState');
    const [balance, setBalance] = useState<any>();

    useEffect(() => {
        apiLeaveTypeOptions().then(res => setLeaveTypeOptions(res));
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
        setLeaveRequest(null);
        setBalance(null);
    }

    const onApprove = async (values: any) => {
        values.id = leaveRequest?.id;
        await apiLeaveRequestApprove(values);
        message.success('Thành công');
        setOpenApprove(false);
        actionRef.current?.reload();
    }

    const onReject = async (values: any) => {
        values.id = leaveRequest?.id;
        await apiLeaveRequestReject(values);
        message.success('Thành công');
        setOpenReject(false);
        actionRef.current?.reload();
    }

    return (
        <div>
            <ProTable
                scroll={{ x: true }}
                request={apiLeaveRequestList}
                actionRef={actionRef}
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)} hidden={access.admin}>Đăng ký nghỉ phép</Button>}
                rowKey="id"
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: 'Người nghỉ',
                        dataIndex: 'userName',
                        search: false,
                        hideInTable: initialState?.currentUser.userType === 1,
                        render: (_, record: any) => {
                            if (!record.gender) {
                                return <><ManOutlined className="text-blue-500" /> {record.fullName}</>
                            }
                            return <><WomanOutlined className="text-red-500" /> {record.fullName}</>
                        },
                        width: 160
                    },
                    {
                        title: 'Loại nghỉ phép',
                        dataIndex: 'leaveTypeId',
                        valueType: 'select',
                        fieldProps: {
                            options: leaveTypeOptions
                        },
                        minWidth: 150
                    },
                    {
                        title: 'Từ ngày',
                        dataIndex: 'startDate',
                        valueType: 'date',
                        search: false,
                        minWidth: 100
                    },
                    {
                        title: 'Số ngày',
                        dataIndex: 'totalDays',
                        valueType: 'digit',
                        minWidth: 80,
                        search: false
                    },
                    {
                        title: 'Ca',
                        dataIndex: 'sectionType',
                        valueEnum: {
                            0: 'Cả ngày',
                            1: 'Buổi sáng',
                            2: 'Buổi chiều'
                        },
                        search: false,
                        minWidth: 80
                    },
                    {
                        title: 'Lý do',
                        dataIndex: 'reason',
                        search: false,
                        minWidth: 200
                    },
                    {
                        title: 'Ngày tạo',
                        dataIndex: 'createdDate',
                        valueType: 'fromNow',
                        minWidth: 140,
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
                        minWidth: 100
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
                        minWidth: 120
                    },
                    {
                        title: 'Ghi chú',
                        dataIndex: 'comments',
                        search: false,
                        minWidth: 200
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record: any) => [
                            <Dropdown key="more" menu={{
                                items: [
                                    {
                                        key: 'edit',
                                        label: 'Chỉnh sửa',
                                        disabled: record.status !== 0 || initialState?.currentUser.userName !== record.userName
                                    },
                                    {
                                        key: 'approve',
                                        label: 'Phê duyệt',
                                        disabled: initialState?.currentUser.userType === 1 || record.status !== 0
                                    },
                                    {
                                        key: 'reject',
                                        label: 'Từ chối',
                                        danger: true,
                                        disabled: initialState?.currentUser.userType === 1 || record.status !== 0
                                    }
                                ],
                                onClick: (info) => {
                                    setLeaveRequest(record);
                                    if (info.key === 'edit') {
                                        setOpen(true);
                                        return;
                                    }
                                    if (info.key === 'approve') {
                                        setOpenApprove(true);
                                        return;
                                    }
                                    if (info.key === 'reject') {
                                        setOpenReject(true);
                                        return;
                                    }
                                }
                            }}>
                                <Button type="dashed" size="small" icon={<MoreOutlined />} />
                            </Dropdown>,
                            <Popconfirm title="Xác nhận xóa?" key="delete" onConfirm={async () => {
                                await apiLeaveRequestDelete(record.id);
                                actionRef.current?.reload();
                                message.success('Thành công');
                            }}>
                                <Button danger type="primary" size="small" icon={<DeleteOutlined />} disabled={initialState?.currentUser.userName !== record.userName || record.status !== 0} />
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
                <div className="md:flex gap-4">
                    <div className="flex-1">
                        <ProFormSelect name="leaveTypeId" label="Loại nghỉ phép" className="w-full" request={apiLeaveTypeOptions} rules={[
                            {
                                required: true
                            }
                        ]} onChange={(value: number) => {
                            apiLeaveBalanceByType(value).then(res => setBalance(res));
                        }} />
                    </div>
                    <ProFormDatePicker name="startDate" label="Từ ngày" rules={[
                        {
                            required: true
                        }
                    ]} />
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <ProFormSelect name="sectionType" label="Ca" options={[
                                {
                                    label: 'Cả ngày',
                                    value: 0
                                },
                                {
                                    label: 'Buổi sáng',
                                    value: 1
                                },
                                {
                                    label: 'Buổi chiều',
                                    value: 2
                                }
                            ]} />
                        </div>
                        <div className="flex-1">
                            <ProFormDigit name="totalDays" label="Số ngày" tooltip="Nhập 0.5 nếu nghỉ nửa ngày" rules={[
                                {
                                    required: true
                                }
                            ]} fieldProps={{
                                step: 0.5
                            }} />
                        </div>
                    </div>
                </div>
                <ProFormTextArea name="reason" label="Lý do" />
                {balance && <Alert message={<div>Số ngày còn lại: <b>{balance?.availableDays}</b></div>} type="warning" showIcon />}
            </ModalForm>
            <ModalForm open={openApprove} onOpenChange={setOpenApprove} title="Phê duyệt" onFinish={onApprove} formRef={formRef}>
                <ProFormTextArea name="comments" label="Ghi chú" />
            </ModalForm>
            <ModalForm open={openReject} onOpenChange={setOpenReject} title="Từ chối" onFinish={onReject} formRef={formRef}>
                <ProFormTextArea name="comments" label="Ghi chú" />
            </ModalForm>
        </div>
    )
}

export default LeaveRequest