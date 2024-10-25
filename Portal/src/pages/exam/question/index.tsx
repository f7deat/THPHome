import { useParams, history } from "@umijs/max";
import MyCkEditor from "@/components/my-ckeditor";
import { apiGetExamVersion } from "@/services/exam/exam";
import { apiQuestionAdd, apiQuestionList, apiQuestionOptions, apiQuestionUpdate } from "@/services/exam/question";
import { DeleteOutlined, EditOutlined, FolderOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, PageContainer, ProFormDigit, ProFormInstance, ProFormSelect, ProFormText, ProTable } from "@ant-design/pro-components"
import { Button, Col, message, Popconfirm, Row, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";

const ExamQuestionPage: React.FC = () => {

    const { id } = useParams();
    const [examVersion, setExamVersion] = useState<any>();
    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const [question, setQuestion] = useState<any>();

    useEffect(() => {
        if (id) {
            apiGetExamVersion(id).then(response => setExamVersion(response.data));
        }
    }, [id]);

    useEffect(() => {
        if (question) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: question.id
                },
                {
                    name: 'text',
                    value: question.text
                },
                {
                    name: 'type',
                    value: question.type
                },
                {
                    name: 'sortOrder',
                    value: question.sortOrder
                },
                {
                    name: 'parentId',
                    value: question.parentId
                },
                {
                    name: 'audio',
                    value: question.audio
                }
            ])
        } else {
            formRef.current?.resetFields();
        }
    }, [question]);

    const onFinish = async (values: any) => {
        values.examVersionId = id;
        if (values.id) {
            await apiQuestionUpdate(values);
        } else {
            await apiQuestionAdd(values);
        }
        message.success('Thành công!');
        actionRef.current?.reload();
        formRef.current?.resetFields();
        setOpen(false);
    }

    return (
        <PageContainer title={examVersion?.name} extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProTable
                headerTitle={<Button type="primary" icon={<PlusOutlined />} onClick={() => {
                    setQuestion(null);
                    setOpen(true);
                }}>Tạo câu hỏi</Button>}
                search={{
                    layout: 'vertical'
                }}
                actionRef={actionRef}
                request={(params) => apiQuestionList({
                    ...params,
                    examVersionId: id
                })}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30,
                        align: 'center'
                    },
                    {
                        title: 'Nội dung',
                        dataIndex: 'text',
                        render: (_, entity) => <div dangerouslySetInnerHTML={{ __html: entity.text }} />
                    },
                    {
                        title: 'Số câu trả lời',
                        dataIndex: 'totalAnswer',
                        width: 100,
                        search: false,
                        align: 'center'
                    },
                    {
                        title: 'Thứ tự',
                        dataIndex: 'sortOrder',
                        width: 60,
                        search: false,
                        align: 'center'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, entity) => [
                            <Button type="primary" icon={<EditOutlined />} size="small" key="edit" onClick={() => {
                                setQuestion(entity);
                                setOpen(true);
                            }} />,
                            <Tooltip key="answer" title="Câu trả lời">
                                <Button icon={<FolderOutlined />} size="small" disabled={entity.type === 3} onClick={() => history.push(`/exam/version/answer/${entity.id}`)} />
                            </Tooltip>,
                            <Popconfirm title="Xác nhận xóa?" key="delete">
                                <Button type="primary" danger size="small" icon={<DeleteOutlined />} />
                            </Popconfirm>
                        ],
                        width: 100
                    }
                ]}
            />
            <ModalForm open={open} onOpenChange={setOpen} title="Cài đặt" formRef={formRef} onFinish={onFinish} width={1000}>
                <MyCkEditor name="text" label="Nội dung" rules={[
                    {
                        required: true
                    }
                ]} />
                <ProFormText label="Audio" name="audio" />
                <ProFormText name="id" hidden />
                <Row gutter={16}>
                    <Col span={12}>
                        <ProFormSelect name="type" label="Loại" options={[
                            {
                                label: 'Single Choice',
                                value: 0
                            },
                            {
                                label: 'Multiple Choice',
                                value: 1
                            },
                            {
                                label: 'True False',
                                value: 2
                            },
                            {
                                label: 'Group',
                                value: 3
                            },
                            {
                                label: 'Image (Single Choice)',
                                value: 4
                            },
                            {
                                label: 'Image (Multiple Choice)',
                                value: 5
                            },
                            {
                                label: 'Table (Single Choice)',
                                value: 6
                            },
                            {
                                label: 'Survey (Khảo sát)',
                                value: 7
                            }
                        ]} />
                    </Col>
                    <Col span={12}>
                        <ProFormDigit name="sortOrder" label="Thứ tự" />
                    </Col>
                </Row>
                <ProFormSelect label="Thuộc nhóm" name="parentId" request={async () => apiQuestionOptions(id)} />
            </ModalForm>
        </PageContainer>
    )
}

export default ExamQuestionPage;