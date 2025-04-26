import { ActionType, ProTable } from "@ant-design/pro-components";
import { apiLogWorkApprove, apiLogWorkDelete, apiLogWorkList } from "../../services/work-log";
import { useAccess, useParams } from "@umijs/max";
import { Button, Dropdown, message, Popconfirm } from "antd";
import { CheckOutlined, DeleteOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import WorkLog from "./work-log-form";

const WorkLogList: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const actionRef = useRef<ActionType>();
    const access = useAccess();
    const [openWork, setOpenWork] = useState(false);

    return (
        <div>
            <ProTable
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenWork(true)}>Log công việc</Button>}
                request={(params) => apiLogWorkList({
                    ...params,
                    taskItemId: id,
                })}
                actionRef={actionRef}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: 'Người log',
                        dataIndex: 'createdBy',
                    },
                    {
                        title: 'Ngày log',
                        dataIndex: 'logDate',
                        valueType: 'date'
                    },
                    {
                        title: 'Thời gian (giờ)',
                        dataIndex: 'timeSpent'
                    },
                    {
                        title: 'Mô tả công việc',
                        dataIndex: 'note'
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        valueEnum: {
                            0: { text: 'Chờ duyệt', status: 'Warning' },
                            1: { text: 'Đã duyệt', status: 'Success' },
                            2: { text: 'Từ chối', status: 'Error' }
                        }
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Dropdown key="more" menu={{
                                items: [
                                    {
                                        key: 'approve',
                                        label: 'Phê duyệt',
                                        icon: <CheckOutlined />,
                                        onClick: async () => {
                                            await apiLogWorkApprove(record.id);
                                            actionRef.current?.reload();
                                            message.success('Phê duyệt log thành công!');
                                        },
                                        disabled: record.status !== 0 || (!access.hod && !access.admin),
                                    }
                                ]
                            }}>
                                <Button type="dashed" size="small" icon={<MoreOutlined />} />
                            </Dropdown>,
                            <Popconfirm key="delete" title="Bạn có chắc chắn muốn xóa log này không?" onConfirm={async () => {
                                await apiLogWorkDelete(record.id);
                                message.success('Xóa log thành công!');
                                actionRef.current?.reload();
                            }}>
                                <Button danger size="small" icon={<DeleteOutlined />} type="primary" />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                search={false}
                ghost
            />
            <WorkLog open={openWork} onOpenChange={setOpenWork} reload={() => actionRef.current?.reload()} />
        </div>
    );
}

export default WorkLogList;