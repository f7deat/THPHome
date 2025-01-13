import { apiDeleteProficiency, apiExportProficiencyExam, apiProficiencyExamList, apiProficiencyTypeOptions } from "@/services/onboard/proficiency";
import { DeleteOutlined, EditOutlined, EyeOutlined, FileExcelOutlined, ManOutlined, WomanOutlined } from "@ant-design/icons";
import { ActionType, PageContainer, ProTable } from "@ant-design/pro-components"
import { Button, Image, message, Popconfirm, Popover, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

const ProficiencyExamPage: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const [typeOptions, setTypeOptions] = useState<any>([]);
    const [loadingExport, setLoadingExport] = useState<boolean>(false);

    useEffect(() => {
        apiProficiencyTypeOptions().then(response => setTypeOptions(response));
    }, []);

    const exportData = async () => {
        setLoadingExport(true);
        const response = await apiExportProficiencyExam() as any;
        const url = window.URL.createObjectURL(
            new Blob([response]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download',
            `proficiency-exam-${dayjs().year()}${dayjs().month()}${dayjs().day()}.xlsx`,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode?.removeChild(link);
        setLoadingExport(false);
    }

    return (
        <PageContainer extra={(
            <>
                <Button type="primary" icon={<FileExcelOutlined />} onClick={() => exportData()} loading={loadingExport}>Xuất dữ liệu</Button>
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
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        valueType: 'select',
                        valueEnum: {
                            0: <Tag color="orange">Chờ xác nhận</Tag>,
                            1: <Tag color="blue">Đã xác nhận</Tag>,
                            2: <Tag color="green">Đã thanh toán</Tag>,
                            3: <Tag color="error">Hủy đăng ký</Tag>,
                            4: <Tag color="success">Đã lên danh sách thi</Tag>
                        },
                        width: 100,
                        fieldProps: {
                            options: [
                                {
                                    label: 'Chờ xác nhận',
                                    value: 0
                                },
                                {
                                    label: 'Đã thanh toán',
                                    value: 2
                                },
                                {
                                    label: 'Hủy đăng ký',
                                    value: 3
                                },
                                {
                                    label: 'Đã lên danh sách thi',
                                    value: 4
                                }
                            ]
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
                        title: 'Ghi chú',
                        dataIndex: 'note'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, entity) => [
                            <Button type="primary" size="small" icon={<EditOutlined />} key="edit" disabled={entity.source === 0} />,
                            <Popconfirm key="delete" title="Xác nhận xóa?" onConfirm={async () => {
                                await apiDeleteProficiency(entity.id);
                                message.success('Xóa thành công!');
                                actionRef.current?.reload();
                            }}>
                                <Button type="primary" size="small" danger icon={<DeleteOutlined />} disabled={entity.source === 0} />
                            </Popconfirm>
                        ],
                        width: 50
                    }
                ]}
                request={apiProficiencyExamList}
            />

        </PageContainer>
    )
}

export default ProficiencyExamPage;