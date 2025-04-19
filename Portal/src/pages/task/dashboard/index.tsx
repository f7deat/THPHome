import { CalendarOutlined, CheckCircleOutlined, ExclamationCircleOutlined, LoadingOutlined, StopOutlined } from "@ant-design/icons";
import { ActionType, PageContainer, ProCard, ProForm, ProFormSelect, ProList } from "@ant-design/pro-components";
import { useAccess, useModel, useRequest } from "@umijs/max";
import { Progress, Statistic } from "antd";
import { apiTaskItemCount, apiTaskItemHistoryList, apiTaskTeamWorkload } from "../services/task-item";
import { apiDepartmentOptions } from "@/services/department";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

const Index: React.FC = () => {

    const access = useAccess();
    const { initialState } = useModel('@@initialState');
    const [departmentId, setDepartmentId] = useState<number>(initialState?.currentUser.departmentId || 0);
    const { data, loading, refresh } = useRequest(() => apiTaskItemCount(departmentId));
    const workLoadRef = useRef<ActionType>();
    const historyRef = useRef<ActionType>();

    useEffect(() => {
        if (departmentId) {
            refresh();
            workLoadRef.current?.reload();
            historyRef.current?.reload();
        }
    }, [departmentId]);

    return (
        <PageContainer extra={(
            <ProForm layout="inline" submitter={false}>
                <ProFormSelect disabled={!access.admin} label="Đơn vị" initialValue={departmentId} name="departmentId" request={apiDepartmentOptions} showSearch placeholder="Chọn đơn vị" fieldProps={{
                    popupMatchSelectWidth: false
                }} onChange={(value: number) => setDepartmentId(value)} />
            </ProForm>
        )}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <ProCard>
                    <Statistic loading={loading} title="Tổng" value={data?.total} />
                </ProCard>
                <ProCard>
                    <Statistic loading={loading} title="Chưa bắt đầu" value={data?.notStarted} />
                </ProCard>
                <ProCard>
                    <Statistic loading={loading} title="Cần đánh giá" value={data?.needsReview} />
                </ProCard>
                <ProCard>
                    <Statistic loading={loading} title="Đã duyệt" value={data?.approved} />
                </ProCard>
                <ProCard>
                    <Statistic loading={loading} title="Đang thực hiện" value={data?.inProgress} prefix={<LoadingOutlined className="text-blue-500" />} />
                </ProCard>
                <ProCard>
                    <Statistic loading={loading} title="Hoàn thành" value={data?.complete} prefix={<CheckCircleOutlined className="text-green-500" />} />
                </ProCard>
                <ProCard>
                    <Statistic loading={loading} title="Tạm dừng" value={data?.onHold} prefix={<StopOutlined className="text-yellow-500" />} />
                </ProCard>
                <ProCard>
                    <Statistic loading={loading} title="Quá hạn" value={data?.overdue} prefix={<ExclamationCircleOutlined className="text-red-500" />} />
                </ProCard>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProCard title="Khối lượng công việc" headerBordered>
                    <ProList
                        actionRef={workLoadRef}
                        request={(params) => apiTaskTeamWorkload({
                            ...params,
                            departmentId: departmentId
                        })}
                        metas={{
                            title: {
                                dataIndex: 'name'
                            },
                            subTitle: {
                                dataIndex: 'userName'
                            },
                            description: {
                                dataIndex: 'taskCount',
                                render: (_, row) => <Progress percent={row?.totalTaskPercent} />
                            }
                        }}
                    />
                </ProCard>
                <ProCard title="Hoạt động gần đây" headerBordered>
                    <ProList 
                    actionRef={historyRef}
                    request={(params) => apiTaskItemHistoryList({
                        ...params,
                        departmentId: departmentId
                    })}
                        metas={{
                            title: {
                                dataIndex: 'title'
                            },
                            description: {
                                dataIndex: 'action',
                                render: (_, record) => (
                                    <div>
                                        <div><CalendarOutlined /> {dayjs(record.createdDate).format('DD/MM/YYYY HH:mm')}: {record.action} - {record.userName}</div>
                                    </div>
                                )
                            }
                        }}
                    />
                </ProCard>
            </div>
        </PageContainer>
    )
}

export default Index;