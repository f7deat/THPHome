import { apiResearchProjectAdd, apiResearchProjectDelete, apiResearchProjectList, apiResearchProjectUpdate } from "@/services/user";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormDatePicker, ProFormInstance, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, Col, message, Popconfirm, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const ResearchProjectTab: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [researchProject, setresearchProject] = useState<any>();
    const { initialState } = useModel('@@initialState');

    useEffect(() => {
        if (open) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: researchProject?.id
                },
                {
                    name: 'name',
                    value: researchProject?.name
                },
                {
                    name: 'startYear',
                    value: researchProject?.startYear ? dayjs(`${researchProject?.startYear}-01-01`) : null
                },
                {
                    name: 'endYear',
                    value: researchProject?.endYear ? dayjs(`${researchProject?.endYear}-01-01`) : null
                },
                {
                    name: 'level',
                    value: researchProject?.level
                },
                {
                    name: 'role',
                    value: researchProject?.role
                },
                {
                    name: 'result',
                    value: researchProject?.result
                }
            ]);
        }
    }, [open, researchProject]);

    const onFinish = async (values: any) => {
        values.year = values.year ? Number(values.year) : null;
        if (values.id) {
            await apiResearchProjectUpdate(values);
        } else {
            await apiResearchProjectAdd(values);
        }
        setOpen(false);
        formRef.current?.resetFields();
        actionRef.current?.reload();
        setresearchProject(null);
        message.success('Thành công');
    }

    const onDelete = async (id: string) => {
        await apiResearchProjectDelete(id);
        actionRef.current?.reload();
        message.success('Thành công');
    }

    return (
        <>
            <ProTable
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    },
                    {
                        title: "Đề tài, dự án đã chủ trì hoặc tham gia",
                        dataIndex: "name"
                    },
                    {
                        title: 'Thời gian',
                        render: (_, record: any) => `${record.startYear} - ${record.endYear}`
                    },
                    {
                        title: 'Cấp quản lý',
                        dataIndex: 'level'
                    },
                    {
                        title: 'Vai trò',
                        dataIndex: 'role'
                    },
                    {
                        title: 'Kết quả',
                        dataIndex: 'result'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => {
                                setresearchProject(record);
                                setOpen(true);
                            }} key="edit" />,
                            <Popconfirm key="delete" title="Bạn có chắc chắn muốn xóa?" onConfirm={() => onDelete(record.id)}>
                                <Button danger type="primary" icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                request={(params) => apiResearchProjectList({
                    ...params,
                    userName: initialState?.currentUser?.userName
                })}
                actionRef={actionRef}
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Thêm mới</Button>}
                search={false}
                rowKey="id"
                ghost
            />
            <ModalForm title="Cài đặt" open={open} onOpenChange={setOpen} formRef={formRef} onFinish={onFinish}>
                <ProFormText name="id" hidden />
                <ProFormTextArea name="name" label="Đề tài, dự án đã chủ trì hoặc tham gia" rules={[
                    {
                        required: true
                    }
                ]} />
                <div className="md:flex gap-4">
                    <div className="flex-1">
                        <Row gutter={16}>
                            <Col md={12} xs={24}>
                                <ProFormText name="level" label="Cấp quản lý" />
                            </Col>
                            <Col md={12} xs={24}>
                                <ProFormText name="role" label="Vai trò" />
                            </Col>
                        </Row>
                    </div>
                    <ProFormDatePicker.Year name="startYear" label="Năm bắt đầu" />
                    <ProFormDatePicker.Year name="endYear" label="Năm hoàn thành" />
                </div>
                <ProFormTextArea name="result" label="Kết quả" />
            </ModalForm>
        </>
    )
}

export default ResearchProjectTab;