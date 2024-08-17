import { apiProgramApprove, apiProgramListApproval, apiProgramOptions, apiProgramReject } from "@/services/onboard/program";
import { CheckOutlined, DeleteOutlined, FileExcelOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, PageContainer, ProColumnType, ProFormInstance, ProFormTextArea, ProTable } from "@ant-design/pro-components"
import { Button, message, Popconfirm, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";

const OnboardPage: React.FC = () => {

    const [openReject, setOpenReject] = useState<boolean>(false);
    const [rowItem, setRowItem] = useState<any>();
    const formRef = useRef<ProFormInstance>();
    const [programs, setPrograms] = useState<any[]>([]);
    const actionRef = useRef<ActionType>();

    useEffect(() => {
        if (openReject && rowItem) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: rowItem.id
                }
            ])
        }
    }, [rowItem, openReject]);

    useEffect(() => {
        apiProgramOptions().then((response: any) => setPrograms(response));
    }, []);

    const columns: ProColumnType<any>[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 50
        },
        {
            title: 'Mã sinh viên',
            dataIndex: 'studentCode'
        },
        {
            title: 'Họ và tên',
            dataIndex: 'studentName'
        },
        {
            title: 'Chuyên ngành',
            dataIndex: 'programId',
            render: (_, entity) => entity.programName,
            valueType: 'select',
            fieldProps: {
                options: programs
            }
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'createdDate',
            valueType: 'dateTime',
            width: 180,
            search: false
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            valueEnum: {
                0: {
                    text: 'Đã đăng ký',
                    status: 'Default',

                },
                1: {
                    text: 'Đã duyệt',
                    status: 'Processing'
                },
                2: {
                    text: 'Từ chối',
                    status: 'Error'
                }
            },
            width: 120
        },
        {
            title: 'Ngày duyệt',
            dataIndex: 'modifiedDate',
            valueType: 'dateTime',
            width: 180,
            search: false
        },
        {
            title: 'Người duyệt',
            dataIndex: 'modifiedBy',
            width: 150,
            search: false
        },
        {
            title: 'Lý do',
            dataIndex: 'rejectReason',
            search: false
        },
        {
            title: 'Tác vụ',
            valueType: 'option',
            render: (_, entity) => [
                <Popconfirm key="approve" title="Xác nhận phê duyệt?" onConfirm={async () => {
                    await apiProgramApprove({
                        id: entity.id
                    });
                    message.success('Phê duyệt thành công!');
                    actionRef.current?.reload();
                }}>
                    <Tooltip title="Phê duyệt">
                        <Button type="primary" icon={<CheckOutlined />} size="small" hidden={entity.status !== 0} />
                    </Tooltip>
                </Popconfirm>,
                <Tooltip key="reject" title="Từ chối">
                    <Button type="primary" icon={<DeleteOutlined />} size="small" danger hidden={entity.status !== 0} onClick={() => {
                        setRowItem(entity);
                        setOpenReject(true);
                    }} />
                </Tooltip>
            ],
            width: 80
        }
    ]

    return (
        <PageContainer extra={<Button type="primary" icon={<FileExcelOutlined />}>Xuất Excel</Button>}>
            <ProTable
                actionRef={actionRef}
                search={{
                    layout: 'vertical'
                }}
                columns={columns}
                request={apiProgramListApproval}
            />
            <ModalForm open={openReject} onOpenChange={setOpenReject} title="Từ chối" formRef={formRef} onFinish={async (values) => {
                await apiProgramReject(values);
                message.success('Từ chối thành công!');
                actionRef.current?.reload();
                setOpenReject(false)
            }}>
                <ProFormTextArea label="Lý do" name="rejectReason" rules={[
                    {
                        required: true
                    }
                ]} />
            </ModalForm>
        </PageContainer>
    )
}

export default OnboardPage;