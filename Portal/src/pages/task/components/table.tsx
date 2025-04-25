import { useEffect, useRef, useState } from "react";
import FormTask from "./form";
import { ActionType, ProForm, ProFormSelect, ProTable } from "@ant-design/pro-components";
import { CalendarOutlined, DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Popconfirm, Space } from "antd";
import { apiTaskItemDelete, apiTaskItemList, apiTaskItemPriorityOptions, apiTaskItemStatusOptions } from "../services/task-item";
import { FormattedNumber, history, useAccess, useModel } from "@umijs/max";
import { TaskStatus } from "../constants";
import { apiDepartmentOptions } from "@/services/department";
import StatusChange from "../center/components/status";
import dayjs from "dayjs";

const TaskTable: React.FC = () => {

    const access = useAccess();
    const actionRef = useRef<ActionType>();
    const [open, setOpen] = useState<boolean>(false);
    const { initialState } = useModel('@@initialState');
    const [taskItem, setTaskItem] = useState<any>(null);
    const [departmentId, setDepartmentId] = useState<number>(initialState?.currentUser.departmentId || 0);

    useEffect(() => {
        if (departmentId) {
            actionRef.current?.reload();
        }
    }, [departmentId]);

    const canDelete = (status: TaskStatus, assignedTo: string) => {
        if (access.admin || access.hod) return true;
        return status === TaskStatus.NeedsReview && assignedTo === initialState?.currentUser.userName;
    }

    const canEdit = (status: TaskStatus, assignedTo: string) => {
        if (access.admin || access.hod) return true;
        return status !== TaskStatus.Complete && assignedTo === initialState?.currentUser.userName;
    }

    return (
        <div>
            <ProTable
                actionRef={actionRef}
                headerTitle={(
                    <Space>
                        <ProForm layout="inline" submitter={false}>
                            <ProFormSelect
                                width="lg"
                                onChange={(value: number) => setDepartmentId(value)}
                                hidden={!access.admin} name="departmentId" placeholder="Phòng ban" initialValue={departmentId} request={apiDepartmentOptions} />
                        </ProForm>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                            setTaskItem(null);
                            setOpen(true);
                        }}>Tạo mới</Button>
                    </Space>
                )}
                request={(params) => apiTaskItemList({
                    ...params,
                    departmentId: departmentId
                })}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30,
                    },
                    {
                        title: 'Nhiệm vụ',
                        dataIndex: 'title',
                        render: (dom, record) => (
                            <div>
                                <div className="font-medium hover:text-blue-500 text-slate-800 mb-1 cursor-pointer" onClick={() => history.push(`/task/board/${record.id}`)}>{dom}</div>
                                <div className="text-gray-500 text-xs">
                                    <span className="mr-2"><CalendarOutlined /> {dayjs(record.createdDate).format('DD/MM/YYYY HH:mm')}</span>
                                    <span><EyeOutlined /> <FormattedNumber value={record.viewCount} /></span>
                                </div>
                            </div>
                        ),
                        minWidth: 200
                    },
                    {
                        title: 'Ngày hết hạn',
                        search: false,
                        dataIndex: 'dueDate',
                        valueType: 'date',
                        minWidth: 110
                    },
                    {
                        title: 'Người thực hiện',
                        dataIndex: 'assignedTo',
                        search: false,
                        width: 120,
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        valueType: 'select',
                        request: apiTaskItemStatusOptions as any,
                        minWidth: 170,
                        render: (dom, record) => {
                            if (record.status === TaskStatus.Complete || record.status === TaskStatus.Overdue) {
                                return dom;
                            }
                            return (
                                <div className="flex items-center gap-1">
                                    {dom}
                                    <StatusChange refresh={() => actionRef.current?.reload()} taskItemId={record.id} />
                                </div>
                            );
                        }
                    },
                    {
                        title: 'Độ ưu tiên',
                        dataIndex: 'priority',
                        valueType: 'select',
                        request: apiTaskItemPriorityOptions as any,
                        minWidth: 120
                    },
                    {
                        title: <SettingOutlined />,
                        valueType: 'option',
                        width: 50,
                        render: (_, record) => [
                            <Dropdown key="more" menu={{
                                items: [
                                    {
                                        key: 'view',
                                        label: 'Chi tiết',
                                        icon: <EyeOutlined />,
                                        onClick: () => history.push(`/task/board/${record.id}`)
                                    },
                                    {
                                        key: 'edit',
                                        label: 'Chỉnh sửa',
                                        icon: <EditOutlined />,
                                        onClick: () => {
                                            setTaskItem(record);
                                            setOpen(true);
                                        },
                                        disabled: !canEdit(record.status, record.assignedTo)
                                    }
                                ]
                            }}>
                                <Button type="dashed" icon={<MoreOutlined />} size="small" />
                            </Dropdown>,
                            <Popconfirm key="delete" title="Bạn có chắc chắn muốn xóa nhiệm vụ này không?" onConfirm={async () => {
                                await apiTaskItemDelete(record.id);
                                message.success('Xóa nhiệm vụ thành công!');
                                actionRef.current?.reload();
                            }}>
                                <Button type="primary" danger icon={<DeleteOutlined />} size="small" disabled={!canDelete(record.status, record.assignedTo)} />
                            </Popconfirm>
                        ],
                        align: 'center'
                    }
                ]}
                search={{
                    layout: 'vertical'
                }}
                scroll={{
                    x: true
                }}
            />
            <FormTask open={open} onOpenChange={setOpen} reload={() => actionRef.current?.reload()} id={taskItem?.id} />
        </div>
    );
}

export default TaskTable;