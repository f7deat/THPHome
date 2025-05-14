import { ActionType, PageContainer, ProTable } from "@ant-design/pro-components"
import { apiTaskBacklogs, apiTaskItemDelete, apiTaskItemPriorityOptions, apiTaskItemStatusOptions } from "../services/task-item";
import { CalendarOutlined, EyeOutlined, HistoryOutlined, SettingOutlined, MoreOutlined, DeleteOutlined, LeftOutlined } from "@ant-design/icons";
import { useAccess, useModel, FormattedNumber, history } from "@umijs/max";
import { Tag, Dropdown, Button, Popconfirm, message } from "antd";
import dayjs from "dayjs";
import { useRef, useState, useEffect } from "react";
import StatusChange from "../center/components/status";
import { TaskStatus } from "../constants";

const Index: React.FC = () => {

    const access = useAccess();
    const actionRef = useRef<ActionType>();
    const { initialState } = useModel('@@initialState');
    const [departmentId] = useState<number>(initialState?.currentUser.departmentId || 0);

    useEffect(() => {
        if (departmentId) {
            actionRef.current?.reload();
        }
    }, [departmentId]);

    const canDelete = (status: TaskStatus, assignedTo: string) => {
        if (access.admin || access.hod) return true;
        return status === TaskStatus.NeedsReview && assignedTo === initialState?.currentUser.userName;
    }
    
    return (
        <PageContainer extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProTable
                actionRef={actionRef}
                request={(params) => apiTaskBacklogs({
                    ...params,
                    departmentId: departmentId,
                    fromDate: params.startDate ? dayjs(params.startDate[0]).format('YYYY-MM-DD') : undefined,
                    toDate: params.startDate ? dayjs(params.startDate[1]).format('YYYY-MM-DD') : undefined
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
                                    <span className="mr-2"><EyeOutlined /> <FormattedNumber value={record.viewCount} /></span>
                                    <span className="mr-2" hidden={record.timeSpent === 0}><HistoryOutlined /> Giờ làm: <span className="text-red-500 font-medium">{record.timeSpentFormatted}</span></span>
                                    <span>
                                        {
                                            record.tags.map((tag: any) => <Tag key={tag.id} color="blue" className="mr-1">{tag}</Tag>)
                                        }
                                    </span>
                                </div>
                            </div>
                        ),
                        minWidth: 200
                    },
                    {
                        title: 'Thực hiện bởi',
                        dataIndex: 'assignedTo',
                        width: 120,
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        valueType: 'select',
                        request: apiTaskItemStatusOptions as any,
                        minWidth: 170,
                        render: (dom, record) => {
                            if (record.status === TaskStatus.Overdue) {
                                return dom;
                            }
                            if ((record.status === TaskStatus.Complete || record.status === TaskStatus.NeedsReview) && !access.admin) {
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
                        minWidth: 120,
                        search: false
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
        </PageContainer>
    )
}

export default Index;