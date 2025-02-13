import { apiDeleteProficiency, apiGetProficiencyBatch, apiGetProficiencyStatusOptions, apiGetProficiencyTypeOptions, apiProficiencyList } from "@/services/onboard/proficiency";
import { DeleteOutlined, EditOutlined, EyeOutlined, ManOutlined, MoreOutlined, WomanOutlined } from "@ant-design/icons";
import { ActionType, PageContainer, ProTable } from "@ant-design/pro-components"
import { Button, Dropdown, Image, message, Popconfirm, Popover } from "antd";
import { useEffect, useRef, useState } from "react";
import ProFiciencyForm from "../components/form";
import { useParams, useRequest } from "@umijs/max";
import ProficiencyPracticeStatusForm from "./components/status-form";
import { useAccess } from "@umijs/max";
import ExportPracticeModal from "./components/export-practice";

const ProficiencyPracticePage: React.FC = () => {

    const { id } = useParams();

    const access = useAccess();

    const actionRef = useRef<ActionType>();

    const [openStatus, setOpenStatus] = useState<boolean>(false);
    const [proficiency, setProficiency] = useState<any>();
    const [statusOptions, setStatusOptions] = useState<any>();
    const [typeOptions, setTypeOptions] = useState<any>();

    useEffect(() => {
        apiGetProficiencyStatusOptions().then((response: any) => setStatusOptions(response));
        apiGetProficiencyTypeOptions().then((response: any) => setTypeOptions(response));
    }, []);

    const { data } = useRequest(() => apiGetProficiencyBatch(id));

    return (
        <PageContainer
            title={data?.name}
            extra={(
                <>
                    <ExportPracticeModal />
                    <ProFiciencyForm reload={() => {
                        actionRef.current?.reload();
                    }} />
                </>
            )}>
            <ProTable
                actionRef={actionRef}
                search={{
                    layout: 'vertical'
                }}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30,
                        align: 'center'
                    },
                    {
                        title: 'MC',
                        dataIndex: 'evidence',
                        render: (_, entity) => (
                            <Popover content={(
                                <div className="w-48">
                                    <Image src={entity.evidence} />
                                </div>
                            )}>
                                <Button type="primary" icon={<EyeOutlined />} size="small" />
                            </Popover>
                        ),
                        width: 50,
                        align: 'center',
                        search: false
                    },
                    {
                        title: 'Mã sinh viên',
                        dataIndex: 'userName',
                        width: 100
                    },
                    {
                        title: 'Họ và tên',
                        dataIndex: 'name',
                        render: (dom, entity) => {
                            if (entity.gender === 0) {
                                return <><ManOutlined className="text-blue-500" /> {dom}</>
                            }
                            if (entity.gender === 1) {
                                return <><WomanOutlined className="text-red-500" /> {dom}</>
                            }
                            return dom;
                        }
                    },
                    {
                        title: 'Ngày sinh',
                        dataIndex: 'dateOfBirth',
                        valueType: 'date',
                        width: 90,
                        search: false
                    },
                    {
                        title: 'SĐT',
                        dataIndex: 'phoneNumber',
                        width: 90
                    },
                    {
                        title: 'Loại',
                        dataIndex: 'typeId',
                        width: 90,
                        valueType: 'select',
                        fieldProps: {
                            options: typeOptions
                        }
                    },
                    {
                        title: 'Ngày đăng ký',
                        dataIndex: 'createdDate',
                        valueType: 'dateTime',
                        search: false,
                        width: 150
                    },
                    {
                        title: 'Lớp',
                        dataIndex: 'className',
                        width: 80
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        valueType: 'select',
                        width: 100,
                        fieldProps: {
                            options: statusOptions
                        }
                    },
                    {
                        title: 'Ngày thanh toán',
                        dataIndex: 'paymentDate',
                        valueType: 'date',
                        search: false,
                        width: 150
                    },
                    {
                        title: 'Nguồn',
                        dataIndex: 'source',
                        search: false,
                        valueEnum: {
                            0: 'Online',
                            1: 'Offline'
                        }
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, entity) => [
                            <Button type="primary" size="small" icon={<EditOutlined />} key="edit" disabled={entity.source === 0} />,
                            <Dropdown key="more" menu={{
                                items: [
                                    {
                                        key: 'status',
                                        label: 'Đổi trạng thái'
                                    },
                                    {
                                        key: 'move',
                                        label: 'Chuyển đợt ôn tập'
                                    }
                                ],
                                onClick: (info) => {
                                    if (info.key === 'status') {
                                        setProficiency(entity);
                                        setOpenStatus(true);
                                        return;
                                    }
                                }
                            }}>
                                <Button icon={<MoreOutlined />} size="small" />
                            </Dropdown>,
                            <Popconfirm key="delete" title="Xác nhận xóa?" onConfirm={async () => {
                                await apiDeleteProficiency(entity.id);
                                message.success('Xóa thành công!');
                                actionRef.current?.reload();
                            }}>
                                <Button type="primary" size="small" danger icon={<DeleteOutlined />} disabled={entity.source === 0} />
                            </Popconfirm>
                        ],
                        width: 50,
                        hideInTable: !access.canAdmin
                    }
                ]}
                request={(params) => {
                    return apiProficiencyList({
                        batchId: id,
                        ...params
                    });
                }}
            />

            <ProficiencyPracticeStatusForm open={openStatus} onOpenChange={setOpenStatus} data={proficiency} reload={() => actionRef.current?.reload()} />
        </PageContainer>
    )
}

export default ProficiencyPracticePage;