import { apiLeaveRequestUserList } from "@/services/leave";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import { ActionType, ProTable } from "@ant-design/pro-components";
import { Drawer, DrawerProps } from "antd";
import { useEffect, useRef } from "react";

type Props = DrawerProps & {
    deparment?: any;
    dateRange: string[];
}

const DetailByDepartment: React.FC<Props> = (props) => {

    const { deparment, dateRange } = props;
    const actionRef = useRef<ActionType>();

    useEffect(() => {
        if (props.open) {
            actionRef.current?.reload?.();
        }
    }, [dateRange, deparment]);

    return (
        <Drawer {...props} width={1000} title={deparment?.departmentName}>
            <ProTable
                actionRef={actionRef}
                request={(params) => apiLeaveRequestUserList({
                    ...params,
                    departmentId: deparment?.departmentId,
                    fromDate: dateRange[0],
                    toDate: dateRange[1]
                })}
                ghost
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
                        title: 'Họ tên',
                        dataIndex: 'fullName',
                        render: (dom, record) => {
                            if (record.gender) {
                                return <><WomanOutlined className="text-red-500" /> {dom}</>
                            }
                            return <><ManOutlined className="text-blue-500" /> {dom}</>
                        }
                    },
                    {
                        title: 'Ngày sinh',
                        dataIndex: 'dateOfBirth',
                        valueType: 'date',
                        width: 100,
                        search: false
                    },
                    {
                        title: 'Chờ duyệt',
                        dataIndex: 'pending',
                        valueType: 'digit',
                        search: false
                    },
                    {
                        title: 'Đã duyệt',
                        dataIndex: 'approved',
                        valueType: 'digit',
                        search: false
                    },
                    {
                        title: 'Từ chối',
                        dataIndex: 'rejected',
                        valueType: 'digit',
                        search: false
                    },
                    {
                        title: 'Tổng',
                        dataIndex: 'total',
                        valueType: 'digit',
                        search: false
                    }
                ]}
            />
        </Drawer>
    );
}

export default DetailByDepartment;