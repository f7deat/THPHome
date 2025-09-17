import { apiMyTeachingExperiences, apiTeachingExperienceUpdate, apiTeachingExperienceAdd, apiTeachingExperienceDelete, apiTeachingExperienceUploadEvidence } from "@/services/user";
import { CloseOutlined, DeleteOutlined, EditOutlined, PictureOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormInstance, ProFormText, ProFormTextArea, ProFormUploadDragger, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, Col, message, Modal, Popconfirm, Row, Space, Upload } from "antd";
import { useEffect, useRef, useState } from "react";

const TeachingExperienceTab: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [teachingExperience, setTeachingExperience] = useState<any>();
    const { initialState } = useModel('@@initialState');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [openEvidence, setOpenEvidence] = useState<boolean>(false);
    const evidenceFormRef = useRef<ProFormInstance>();
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
                        title: 'Minh chứng',
                        dataIndex: 'evidence',
                        render: (_, entity) => (
                            <Space> {entity.evidenceUrl ? (
                                <Button type="dashed" icon={<PictureOutlined />} size="small"
                                    onClick={() => { setPreviewUrl(entity.evidenceUrl); }}>
                                    Xem minh chứng
                                </Button>
                            ) : (<span style={{ color: "#aaa" }}>Chưa có</span>)}
                                <Button
                                    size="small"
                                    type="dashed"
                                    icon={<UploadOutlined />}
                                    onClick={() => {
                                        setTeachingExperience(entity);
                                        setOpenEvidence(true);
                                        // reset danh sách file trước khi mở
                                        setTimeout(() => {
                                            evidenceFormRef.current?.setFieldValue("evidence", []);
                                        }, 0);
                                    }}
                                >
                                </Button>
                            </Space>
                        ),
                        search: false,
                        width: 200,
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
            <ModalForm
                formRef={evidenceFormRef}
                open={openEvidence}
                onOpenChange={setOpenEvidence}
                title="Minh chứng"
                onFinish={async (values) => {
                    if (!values?.evidence || values.evidence.length === 0) {
                        message.error("Vui lòng chọn file");
                        return false;
                    }
                    const formData = new FormData();
                    formData.append("TeachingExperienceId", teachingExperience?.id);
                    values.evidence.forEach((file: any) => {
                        formData.append("File", file.originFileObj);
                    });
                    await apiTeachingExperienceUploadEvidence(formData);
                    message.success("Tải minh chứng thành công");
                    actionRef.current?.reload();
                    return true;
                }}
            >
                <ProFormUploadDragger
                    name="evidence"
                    title="Tải lên minh chứng"
                    description="Chỉ hỗ trợ ảnh và PDF"
                    fieldProps={{
                        multiple: true,
                        accept: ".jpg,.jpeg,.png,.gif,.pdf",
                        beforeUpload: (file) => {
                            const isAllowed =
                                file.type === "image/png" ||
                                file.type === "image/jpeg" ||
                                file.type === "image/gif" ||
                                file.type === "application/pdf";

                            if (!isAllowed) {
                                message.error("Chỉ hỗ trợ ảnh (.png, .jpg, .gif) và PDF!");
                                return Upload.LIST_IGNORE;
                            }
                            return false;
                        },
                    }}
                />
            </ModalForm>
            <Modal open={!!previewUrl} onCancel={() => setPreviewUrl(null)} footer={null} width="60%" closeIcon={
                <CloseOutlined
                    style={{
                        color: "black", fontWeight: "bold", border: "1px solid black",
                        borderRadius: "50%", padding: "2px", backgroundColor: "white", cursor: "pointer"
                    }}
                />
            }>
                {previewUrl?.toLowerCase().endsWith(".pdf") ? (
                    <iframe src={previewUrl} style={{ width: "100%", height: "70vh", border: "none" }} />
                ) : (<img src={previewUrl!} alt="evidence" style={{ width: "100%", height: "70vh" }} />)}
            </Modal>
        </>
    )
}

export default TeachingExperienceTab;