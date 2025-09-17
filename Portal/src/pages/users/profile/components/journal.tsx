import { apiJournalAdd, apiJournalDelete, apiJournalList, apiJournalUpdate, apiJournalUploadEvidence } from "@/services/user";
import { CloseOutlined, DeleteOutlined, EditOutlined, PictureOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormDatePicker, ProFormInstance, ProFormText, ProFormTextArea, ProFormUploadDragger, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, Col, message, Modal, Popconfirm, Row, Space, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const JournalTab: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [journal, setJournal] = useState<any>();
    const { initialState } = useModel('@@initialState');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [openEvidence, setOpenEvidence] = useState<boolean>(false);
    const evidenceFormRef = useRef<ProFormInstance>();
    useEffect(() => {
        if (open) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: journal?.id
                },
                {
                    name: 'name',
                    value: journal?.name
                },
                {
                    name: 'publishYear',
                    value: journal?.publishYear ? dayjs(`${journal?.publishYear}-01-01`) : null
                },
                {
                    name: 'volume',
                    value: journal?.volume
                },
                {
                    name: 'issue',
                    value: journal?.issue
                },
                {
                    name: 'page',
                    value: journal?.page
                },
                {
                    name: 'issn',
                    value: journal?.issn
                }
            ]);
        }
    }, [open, journal]);

    const onFinish = async (values: any) => {
        values.year = values.year ? Number(values.year) : null;
        if (values.id) {
            await apiJournalUpdate(values);
        } else {
            await apiJournalAdd(values);
        }
        setOpen(false);
        formRef.current?.resetFields();
        actionRef.current?.reload();
        setJournal(null);
        message.success('Thành công');
    }

    const onDelete = async (id: string) => {
        await apiJournalDelete(id);
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
                        title: "Tên bài báo",
                        dataIndex: "name"
                    },
                    {
                        title: 'Tên tạp chí/ ISSN',
                        dataIndex: 'issn'
                    },
                    {
                        title: 'Tác giả',
                        dataIndex: 'authors'
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
                                        setJournal(entity);
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
                        title: 'Tập',
                        dataIndex: 'volume',
                        width: 80
                    },
                    {
                        title: 'Số',
                        dataIndex: 'issue',
                        width: 80
                    },
                    {
                        title: 'Trang',
                        dataIndex: 'page',
                        width: 80
                    },
                    {
                        title: 'Năm công bố',
                        dataIndex: 'publishYear',
                        width: 120
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, record) => [
                            <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => {
                                setJournal(record);
                                setOpen(true);
                            }} key="edit" />,
                            <Popconfirm key="delete" title="Bạn có chắc chắn muốn xóa?" onConfirm={() => onDelete(record.id)}>
                                <Button danger type="primary" icon={<DeleteOutlined />} size="small" />
                            </Popconfirm>
                        ],
                        width: 60
                    }
                ]}
                request={(params) => apiJournalList({
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
                <ProFormTextArea name="name" label="Tên bài báo" rules={[
                    {
                        required: true
                    }
                ]} />
                <div className="md:flex gap-4">
                    <div className="flex-1">
                        <Row gutter={16}>
                            <Col md={8} xs={24}>
                                <ProFormText name="issn" label="Tên tạp chí / ISSN" />
                            </Col>
                            <Col md={8} xs={24}>
                                <ProFormText name="volume" label="Tập" />
                            </Col>
                            <Col md={4} xs={24}>
                                <ProFormText name="issue" label="Số" />
                            </Col>
                            <Col md={4} xs={24}>
                                <ProFormText name="page" label="Trang" />
                            </Col>
                        </Row>
                    </div>
                    <ProFormDatePicker.Year name="publishYear" label="Năm công bố" />
                </div>
                <ProFormText name="authors" label="Tác giả" />
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
                    formData.append("JournalId", journal?.id);
                    values.evidence.forEach((file: any) => {
                        formData.append("File", file.originFileObj);
                    });
                    await apiJournalUploadEvidence(formData);
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

export default JournalTab;