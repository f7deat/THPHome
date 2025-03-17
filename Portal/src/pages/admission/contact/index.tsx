import { apiContactStatusOptions, apiDeleteContact, apiListContact, apiUpdateContactStatus } from "@/services/contact";
import {  DeleteOutlined, EditOutlined, ExportOutlined, SettingOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, PageContainer, ProFormInstance, ProFormSelect, ProTable } from "@ant-design/pro-components"
import { Button, message, Popconfirm, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { history } from "@umijs/max";
import { apiContactExport } from "@/services/admission/contact";

const Index: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [statusOptions, setStatusOptions] = useState<any>();
    const [open, setOpen] = useState<boolean>(false);
    const [contact, setContact] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        apiContactStatusOptions().then(response => setStatusOptions(response));
    }, []);

    useEffect(() => {
        formRef.current?.setFieldValue('contactStatusId', contact?.contactStatusId);
    }, [contact]);

    const updateStatus = async (values: any) => {
        values.id = contact?.id;
        await apiUpdateContactStatus(values);
        message.success('Cập nhật thành công!');
        actionRef.current?.reload();
    }

    const onDelete = async (id: string) => {
        await apiDeleteContact(id);
        message.success('Xóa thành công!');
        actionRef.current?.reload();
    }
    
    const exportData = async () => {
        setLoading(true);
        const response = await apiContactExport();
        setLoading(false);
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'contact.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    return (
        <PageContainer extra={<Button icon={<SettingOutlined />} onClick={() => history.push('/admission/contact/status')}>Cấu hình trạng thái</Button>}>
            <ProTable
                headerTitle={<Button type="primary" icon={<ExportOutlined />} loading={loading} onClick={exportData}>Xuất dữ liệu</Button>}
                actionRef={actionRef}
                request={apiListContact}
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
                        title: 'Họ và tên',
                        dataIndex: 'fullName',
                        width: 160
                    },
                    {
                        title: 'SDT',
                        dataIndex: 'phoneNumber'
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        width: 160,
                        valueType: 'email'
                    },
                    {
                        title: 'Trường học',
                        dataIndex: 'school'
                    },
                    {
                        title: 'Địa chỉ',
                        dataIndex: 'address',
                        search: false
                    },
                    {
                        title: 'Ngày liên hệ',
                        dataIndex: 'createdDate',
                        valueType: 'fromNow',
                        width: 120,
                        search: false
                    },
                    {
                        title: 'Ghi chú',
                        dataIndex: 'note',
                        search: false
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'contactStatusId',
                        valueType: 'select',
                        fieldProps: {
                            options: statusOptions
                        },
                        width: 100
                    },
                    {
                        title: 'Nguồn',
                        dataIndex: 'source',
                        search: false,
                        render: (_, entity) => entity.source === 1 ? 'Holland' : 'Website',
                        width: 70
                    },
                    {
                        title: 'Người tiếp nhận',
                        dataIndex: 'userName',
                        search: false
                    },
                    {
                        title: 'Ngày cập nhật',
                        dataIndex: 'modifiedDate',
                        valueType: 'fromNow',
                        search: false
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, entity) => [
                            <Tooltip key="approve" title="Cập nhật trạng thái">
                                <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => {
                                    setContact(entity);
                                    setOpen(true);
                                }} />
                            </Tooltip>,
                            <Popconfirm key="reject" title="Xác nhận loại xóa?" onConfirm={() => onDelete(entity.id)}>
                                <Tooltip title="Xóa">
                                    <Button type="primary" danger size="small" icon={<DeleteOutlined />} />
                                </Tooltip>
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
            />
            <ModalForm title={`Cập nhật trạng thái của ${contact?.fullName}`} open={open} onOpenChange={setOpen} onFinish={updateStatus} formRef={formRef}>
                <ProFormSelect name="contactStatusId" label="Trạng thái" showSearch options={statusOptions} rules={[
                    {
                        required: true
                    }
                ]} allowClear={false} />
            </ModalForm>
        </PageContainer>
    )
}

export default Index;