import { useRef, useState } from "react";
import FormTask from "./form";
import { ActionType, ProTable } from "@ant-design/pro-components";
import { DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Popconfirm } from "antd";
import { apiTaskItemDelete, apiTaskItemList, apiTaskItemPriorityOptions, apiTaskItemStatusOptions } from "../services/task-item";
import { history, useAccess, useModel } from "@umijs/max";
import { TaskStatus } from "../constants";

const TaskTable: React.FC = () => {

    const access = useAccess();
    const actionRef = useRef<ActionType>();
    const [open, setOpen] = useState<boolean>(false);
    const { initialState } = useModel('@@initialState');
    const [taskItem, setTaskItem] = useState<any>(null);

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
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => {
                    setTaskItem(null);
                    setOpen(true);
                }}>Tạo mới</Button>}
                request={(params) => apiTaskItemList({
                    ...params,
                    departmentId: initialState?.currentUser.departmentId
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
                    },
                    {
                        title: 'Ngày bắt đầu',
                        dataIndex: 'startDate',
                        valueType: 'date',
                        search: false,
                        width: 110
                    },
                    {
                        title: 'Ngày hết hạn',
                        search: false,
                        dataIndex: 'dueDate',
                        valueType: 'date',
                        width: 110
                    },
                    {
                        title: 'Người thực hiện',
                        dataIndex: 'assignedTo',
                        search: false,
                        width: 140
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        valueType: 'select',
                        request: apiTaskItemStatusOptions as any,
                        width: 140
                    },
                    {
                        title: 'Độ ưu tiên',
                        dataIndex: 'priority',
                        valueType: 'select',
                        request: apiTaskItemPriorityOptions as any,
                        width: 120
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
            />
            <FormTask open={open} onOpenChange={setOpen} reload={() => actionRef.current?.reload()} id={taskItem?.id} />
        </div>
    );
}

export default TaskTable;