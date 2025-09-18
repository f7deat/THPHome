import { apiResearchProjectAdd, apiResearchProjectDelete, apiResearchProjectList, apiResearchProjectUpdate, apiResearchProjectUploadEvidence } from "@/services/user";
import { CloseOutlined, DeleteOutlined, EditOutlined, PictureOutlined, PlusOutlined, InboxOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProForm, ProFormDatePicker, ProFormInstance, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, Col, message, Modal, Popconfirm, Row, Space, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const { Dragger } = Upload;

const ResearchProjectTab: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [researchProject, setResearchProject] = useState<any>();
    const { initialState } = useModel('@@initialState');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            formRef.current?.setFields([
                { name: 'id', value: researchProject?.id },
                { name: 'name', value: researchProject?.name },
                { name: 'startYear', value: researchProject?.startYear ? dayjs(`${researchProject?.startYear}-01-01`) : null },
                { name: 'endYear', value: researchProject?.endYear ? dayjs(`${researchProject?.endYear}-01-01`) : null },
                { name: 'level', value: researchProject?.level },
                { name: 'role', value: researchProject?.role },
                { name: 'result', value: researchProject?.result },
                {
                    name: 'evidence',
                    value: researchProject?.evidenceUrl
                        ? [{
                            uid: '-1',
                            name: researchProject?.evidenceUrl.split('/').pop(),
                            status: 'done',
                            url: researchProject?.evidenceUrl,
                        }]
                        : [],
                },
            ]);
        }
    }, [open, researchProject]);

    const onFinish = async (values: any) => {
        let projectId = values.id;
        if (values.id) {
            await apiResearchProjectUpdate(values);
        } else {
            const newProject = await apiResearchProjectAdd(values);
            projectId = newProject?.id;
        }

        // upload minh chứng
        if (values?.evidence && values.evidence.length > 0) {
            const formData = new FormData();
            formData.append("ResearchProjectId", projectId);
            values.evidence.forEach((file: any) => {
                if (file.originFileObj) {
                    formData.append("File", file.originFileObj);
                }
            });
            await apiResearchProjectUploadEvidence(formData);
        }

        message.success('Thành công');
        setOpen(false);
        formRef.current?.resetFields();
        setResearchProject(null);
        actionRef.current?.reload();
        return true;
    };

    const onDelete = async (id: string) => {
        await apiResearchProjectDelete(id);
        actionRef.current?.reload();
        message.success('Thành công');
    };

    return (
        <>
            <ProTable
                columns={[
                    { title: '#', valueType: 'indexBorder', width: 30 },
                    { title: "Đề tài, dự án đã chủ trì hoặc tham gia", dataIndex: "name" },
                    { title: 'Thời gian', render: (_, record: any) => `${record.startYear} - ${record.endYear}` },
                    { title: 'Cấp quản lý', dataIndex: 'level' },
                    { title: 'Vai trò', dataIndex: 'role' },
                    { title: 'Kết quả', dataIndex: 'result' },
                    {
                        title: 'Minh chứng',
                        dataIndex: 'evidence',
                        render: (_, entity) => (
                            <Space>
                                {entity.evidenceUrl ? (
                                    <Button type="dashed" icon={<PictureOutlined />} size="small"
                                        onClick={() => { setPreviewUrl(entity.evidenceUrl); }}>
                                        Xem minh chứng
                                    </Button>
                                ) : (<span style={{ color: "#aaa" }}>Chưa có</span>)}
                            </Space>
                        ),
                        search: false,
                        width: 200,
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                size="small"
                                onClick={() => { setResearchProject(record); setOpen(true); }}
                                key="edit"
                            />,
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

            <ModalForm
                title="Cài đặt đề tài/dự án"
                open={open}
                onOpenChange={setOpen}
                formRef={formRef}
                onFinish={onFinish}
            >
                <ProFormText name="id" hidden />
                <ProFormTextArea
                    name="name"
                    label="Đề tài, dự án đã chủ trì hoặc tham gia"
                    rules={[{ required: true }]}
                />
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

                {/* Minh chứng */}
                <ProForm.Item
                    name="evidence"
                    label="Minh chứng"
                    valuePropName="fileList"
                    getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
                >
                    <Dragger
                        multiple={false}
                        maxCount={1}
                        accept=".jpg,.jpeg,.png,.gif,.pdf"
                        showUploadList={{ showRemoveIcon: false }}
                        beforeUpload={(file) => {
                            const isAllowed =
                                file.type === 'image/png' ||
                                file.type === 'image/jpeg' ||
                                file.type === 'image/gif' ||
                                file.type === 'application/pdf';
                            if (!isAllowed) {
                                message.error('Chỉ hỗ trợ ảnh (.png, .jpg, .gif) và PDF!');
                                return Upload.LIST_IGNORE;
                            }
                            return false;
                        }}
                    >
                        <p>
                            <InboxOutlined className="text-[20px] text-blue-500" />
                        </p>
                        <p className="text-gray-400 text-sm">Hỗ trợ 1 file ảnh / PDF</p>
                    </Dragger>
                </ProForm.Item>
            </ModalForm>

            <Modal
                open={!!previewUrl}
                onCancel={() => setPreviewUrl(null)}
                footer={null}
                width="60%"
                closeIcon={
                    <CloseOutlined
                        style={{
                            color: "black", fontWeight: "bold", border: "1px solid black",
                            borderRadius: "50%", padding: "2px", backgroundColor: "white", cursor: "pointer"
                        }}
                    />
                }
            >
                {previewUrl?.toLowerCase().endsWith(".pdf") ? (
                    <iframe src={previewUrl} style={{ width: "100%", height: "70vh", border: "none" }} />
                ) : (
                    <img src={previewUrl!} alt="evidence" style={{ width: "100%", height: "70vh" }} />
                )}
            </Modal>
        </>
    );
};

export default ResearchProjectTab;
