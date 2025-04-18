import { useRef, useState } from "react";
import FormTask from "./form";
import { ActionType, ProTable } from "@ant-design/pro-components";
import { DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Popconfirm } from "antd";
import { apiTaskItemDelete, apiTaskItemList } from "../services/task-item";
import { history, useModel } from "@umijs/max";

const TaskTable: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const [open, setOpen] = useState<boolean>(false);
    const { initialState } = useModel('@@initialState');
    const [taskItem, setTaskItem] = useState<any>(null);

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
                        valueEnum: {
                            0: { text: 'Chưa bắt đầu', status: 'Default' },
                            1: { text: 'Đang thực hiện', status: 'Processing' },
                            2: { text: 'Hoàn thành', status: 'Success' },
                            3: { text: 'Chờ duyệt', status: 'Warning' },
                            4: { text: 'Đã duyệt', status: 'Success' },
                            5: { text: 'Quá hạn', status: 'Error' },
                            6: { text: 'Tạm dừng', status: 'Warning' }
                        },
                        width: 120
                    },
                    {
                        title: 'Độ ưu tiên',
                        dataIndex: 'priority',
                        valueType: 'select',
                        valueEnum: {
                            0: { text: '📌 Thấp' },
                            1: { text: '⏳ Trung bình' },
                            2: { text: '⚠️ cao' },
                            3: { text: '🔥 Khẩn cấp' },
                        },
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
                                        }
                                    },
                                    {
                                        key: 'delete',
                                        label: 'Xóa',
                                        danger: true,
                                        icon: <DeleteOutlined />,
                                        onClick: () => {

                                        }
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
                                <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        ]
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