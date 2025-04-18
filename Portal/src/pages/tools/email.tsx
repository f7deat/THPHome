import MyCkEditor from "@/components/my-ckeditor";
import { apiCountUser } from "@/services/authen/user";
import { apiGetUserTypeOptions } from "@/services/user";
import { ReloadOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
import { ActionType, DrawerForm, PageContainer, ProFormSelect, ProFormText, ProTable } from "@ant-design/pro-components"
import { Badge, Button, Col, Row, Space, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import ExcelEmailComponent from "./emails/excel";
import { apiGetListEmailLog } from "@/services/tool";
import { apiDepartmentOptions } from "@/services/department";

const EmailToolPage: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [totalRecipient, setTotalRecipient] = useState<number>(0);
    const [userType, setUserType] = useState<number>();
    const [departmentId, setDepartmentId] = useState<number>();
    const actionRef = useRef<ActionType>();

    useEffect(() => {
        if (open) {
            apiCountUser({
                userType, departmentId
            }).then((response: any) => setTotalRecipient(response.data));
        } else {
            setTotalRecipient(0);
        }
    }, [userType, departmentId, open]);

    return (
        <PageContainer extra={(
            <Space>
                <ExcelEmailComponent reload={() => {
                    actionRef.current?.reload();
                }} />
                <Button icon={<SendOutlined />} type="primary" danger onClick={() => setOpen(true)}>Soạn Email</Button>
            </Space>
        )}>
            <ProTable
                search={{
                    layout: 'vertical'
                }}
                request={apiGetListEmailLog}
                actionRef={actionRef}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 40,
                        align: 'center'
                    },
                    {
                        title: 'Tiêu đề',
                        dataIndex: 'subject'
                    },
                    {
                        title: 'Nội dung',
                        dataIndex: 'body',
                        search: false
                    },
                    {
                        title: 'Ngày gửi',
                        dataIndex: 'sendDate',
                        valueType: 'dateTime',
                        width: 150
                    },
                    {
                        title: 'Người nhận',
                        dataIndex: 'recipientEmail',
                        width: 200
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        valueEnum: {
                            0: {
                                text: 'Thành công',
                                status: 'Processing'
                            },
                            1: {
                                text: 'Thất bại',
                                status: 'Error'
                            }
                        },
                        width: 120
                    },
                    {
                        title: 'Số lần mở',
                        dataIndex: 'openNumber',
                        width: 90,
                        valueType: 'digit',
                        search: false
                    },
                    {
                        title: 'Mở lúc',
                        dataIndex: 'openDate',
                        valueType: 'dateTime',
                        width: 150
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: () => [
                            <Tooltip key="resend" title="Gửi lại">
                                <Button type="primary" size="small" icon={<ReloadOutlined />} />
                            </Tooltip>
                        ],
                        width: 80
                    }
                ]}
            />
            <DrawerForm open={open} onOpenChange={setOpen} title="Soạn Email" submitter={false}>
                <Row gutter={16}>
                    <Col md={8}>
                        <ProFormSelect label="User Type" name="userType" showSearch
                            request={apiGetUserTypeOptions}
                            onChange={(value: number) => setUserType(value)}
                        />
                    </Col>
                    <Col md={16}>
                        <ProFormSelect label="Đơn vị" name="departmentId" showSearch
                            request={apiDepartmentOptions}
                            onChange={(value: number) => setDepartmentId(value)}
                        />
                    </Col>
                </Row>
                <ProFormText label="Tiêu đề" name="subject" rules={[
                    {
                        required: true
                    }
                ]} />
                <MyCkEditor label="Nội dung" name="content" rules={[
                    {
                        required: true
                    }
                ]} />
                <Space>
                    <Button type="primary" htmlType="submit" icon={<SendOutlined />}>Gửi</Button>
                    <Badge count={totalRecipient}>
                        <Button icon={<UserOutlined />}>Danh sách người nhận</Button>
                    </Badge>
                </Space>
            </DrawerForm>
        </PageContainer>
    )
}

export default EmailToolPage;