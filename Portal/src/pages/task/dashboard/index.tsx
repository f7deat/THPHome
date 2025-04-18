import { CheckCircleOutlined, ExclamationCircleOutlined, LoadingOutlined, StopOutlined } from "@ant-design/icons";
import { PageContainer, ProCard, ProForm, ProFormSelect, ProList } from "@ant-design/pro-components";
import { useModel, useRequest } from "@umijs/max";
import { Progress, Statistic } from "antd";
import { apiTaskItemCount, apiTaskTeamWorkload } from "../services/task-item";
import { apiDepartmentOptions } from "@/services/department";

const Index: React.FC = () => {

    const { initialState } = useModel('@@initialState');
    const { data, loading } = useRequest(apiTaskItemCount);

    return (
        <PageContainer extra={(
            <ProForm layout="inline" submitter={false}>
                <ProFormSelect label="Đơn vị" initialValue={initialState?.currentUser.departmentId} name="departmentId" request={apiDepartmentOptions} showSearch placeholder="Chọn đơn vị" fieldProps={{
                    popupMatchSelectWidth: false
                }} />
            </ProForm>
        )}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <ProCard>
                    <Statistic loading={loading} title="Tổng" value={data?.notStarted + data?.needsReview + data?.approved + data?.inProgress + data?.complete + data?.onHold + data?.overdue} />
                </ProCard>
                <ProCard>
                    <Statistic loading={loading} title="Chưa bắt đầu" value={data?.notStarted} />
                </ProCard>
                <ProCard>
                    <Statistic loading={loading} title="Chờ duyệt" value={data?.needsReview} />
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
                        request={(params) => apiTaskTeamWorkload({
                            ...params,
                            departmentId: initialState?.currentUser.departmentId
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
                                render: (text, row) => {
                                    return (
                                        <div>
                                            <div className="flex gap-2 mb-2">
                                                <div className="text-gray-500 w-32">Chưa bắt đầu:</div>
                                                <Progress percent={row?.notStartedPercent} />
                                            </div>
                                            <div className="flex gap-2 mb-2">
                                                <div className="text-gray-500 w-32">Đang thực hiện:</div>
                                                <Progress percent={row?.inProgressPercent} />
                                            </div>
                                            <div className="flex gap-2 mb-2">
                                                <div className="text-gray-500 w-32">Đã hoàn thành:</div>
                                                <Progress percent={row?.completePercent} />
                                            </div>
                                            <div className="flex gap-2 mb-2">
                                                <div className="text-gray-500 w-32">Cần đánh giá:</div>
                                                <Progress percent={row?.needsReviewPercent} />
                                            </div>
                                            <div className="flex gap-2 mb-2">
                                                <div className="text-gray-500 w-32">Đã duyệt:</div>
                                                <Progress percent={row?.approvedPercent} />
                                            </div>
                                            <div className="flex gap-2 mb-2">
                                                <div className="text-gray-500 w-32">Quá hạn:</div>
                                                <Progress percent={row?.overduePercent} />
                                            </div>
                                            <div className="flex gap-2 mb-2">
                                                <div className="text-gray-500 w-32">Tạm dừng:</div>
                                                <Progress percent={row?.onHoldPercent} />
                                            </div>
                                        </div>
                                    )
                                }
                            }
                        }}
                    />
                </ProCard>
                <ProCard title="Hoạt động gần đây" headerBordered>
                </ProCard>
            </div>
        </PageContainer>
    )
}

export default Index;