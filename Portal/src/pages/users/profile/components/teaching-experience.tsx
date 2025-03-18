import { apiMyTeachingExperiences, apiTeachingExperienceUpdate, apiTeachingExperienceAdd, apiTeachingExperienceDelete } from "@/services/user";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormInstance, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, Col, message, Popconfirm, Row } from "antd";
import { useEffect, useRef, useState } from "react";

const TeachingExperienceTab: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [teachingExperience, setTeachingExperience] = useState<any>();
    const { initialState } = useModel('@@initialState');

    useEffect(() => {
        if (open) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: teachingExperience?.id
                },
                {
                    name: 'courseCode',
                    value: teachingExperience?.courseCode
                },
                {
                    name: 'courseName',
                    value: teachingExperience?.courseName
                },
                {
                    name: 'level',
                    value: teachingExperience?.level
                },
                {
                    name: 'description',
                    value: teachingExperience?.description
                }
            ]);
        }
    }, [open, teachingExperience]);

    const onFinish = async (values: any) => {
        if (values.id) {
            await apiTeachingExperienceUpdate(values);
        } else {
            await apiTeachingExperienceAdd(values);
        }
        setOpen(false);
        formRef.current?.resetFields();
        actionRef.current?.reload();
        setTeachingExperience(null);
        message.success('Thành công');
    }

    const onDelete = async (id: string) => {
        await apiTeachingExperienceDelete(id);
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
                        title: "Học phần đã/đang giảng dạy",
                        dataIndex: "name",
                        render: (_, record: any) => `${record.courseCode} - ${record.courseName}`
                    },
                    {
                        title: 'Chương trình đào tạo/trình độ  ',
                        dataIndex: 'level'
                    },
                    {
                        title: 'Mô tả',
                        dataIndex: 'description'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => {
                                setTeachingExperience(record);
                                setOpen(true);
                            }} key="edit" />,
                            <Popconfirm key="delete" title="Bạn có chắc chắn muốn xóa?" onConfirm={() => onDelete(record.id)}>
                                <Button danger type="primary" icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                request={(params) => apiMyTeachingExperiences({
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
                <Row gutter={16}>
                    <Col md={8} xs={24}>
                        <ProFormText name="courseCode" label="Mã học phần" />
                    </Col>
                    <Col md={16} xs={24}>
                        <ProFormText name="courseName" label="Tên học phần" />
                    </Col>
                </Row>
                <ProFormText name="level" label="Chương trình đào tạo/trình độ" />
                <ProFormTextArea name="description" label="Mô tả" />
            </ModalForm>
        </>
    )
}

export default TeachingExperienceTab;