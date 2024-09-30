import MyCkEditor from "@/components/my-ckeditor";
import { apiAnswerAdd, apiAnswerDelete, apiAnswerList, apiAnswerUpdate } from "@/services/exam/answer";
import { apiGetQuestion } from "@/services/exam/question";
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, PageContainer, ProCard, ProFormDigit, ProFormInstance, ProFormSelect, ProFormText, ProTable } from "@ant-design/pro-components"
import { history, useParams } from "@umijs/max";
import { Button, Col, message, Popconfirm, Row } from "antd";
import { useEffect, useRef, useState } from "react";

const ExamAnswerPage: React.FC = () => {

    const { id } = useParams();
    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<ProFormInstance>();
    const [answer, setAnswer] = useState<any>();
    const [question, setQuestion] = useState<any>();
    const actionRef = useRef<ActionType>();

    useEffect(() => {
        if (id) {
            apiGetQuestion(id).then(response => setQuestion(response));
        }
    }, [id]);

    useEffect(() => {
        if (answer) {
            formRef.current?.setFields([
                {
                    name: 'id',
                    value: answer.id
                },
                {
                    name: 'text',
                    value: answer.text
                },
                {
                    name: 'isCorrect',
                    value: answer.isCorrect
                },
                {
                    name: 'sortOrder',
                    value: answer.sortOrder
                }
            ])
        } else {
            formRef.current?.resetFields();
        }
    }, [answer]);

    const onFinish = async (values: any) => {
        values.questionId = id;
        if (values.id) {
            await apiAnswerUpdate(values);
        } else {
            await apiAnswerAdd(values);
            setAnswer(null);
        }
        message.success('Thành công!');
        setOpen(false);
        actionRef.current?.reload();
        formRef.current?.resetFields();
    }

    return (
        <PageContainer extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProCard className="mb-4">
                <div dangerouslySetInnerHTML={{ __html: question?.text }} />
            </ProCard>
            <ProTable
                headerTitle={(
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => {
                        setAnswer(null);
                        setOpen(true);
                    }}>Thêm câu trả lời</Button>
                )}
                actionRef={actionRef}
                search={{
                    layout: 'vertical'
                }}
                request={(params) => apiAnswerList({
                    ...params,
                    questionId: id
                })}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 40
                    },
                    {
                        title: 'Nội dung',
                        dataIndex: 'text',
                        render: (_, entity) => <div dangerouslySetInnerHTML={{ __html: entity.text }} />
                    },
                    {
                        title: 'Đáp án',
                        dataIndex: 'isCorrect',
                        render: (_, entity) => entity.isCorrect ? <CheckOutlined className="text-green-500" /> : <CloseOutlined className="text-red-500" />,
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: 'Tác vụ',
                        render: (dom, entity) => [
                            <Button key="edit" type="primary" icon={<EditOutlined />} size="small" onClick={() => {
                                setAnswer(entity);
                                setOpen(true);
                            }}></Button>,
                            <Popconfirm key="delete" title="Xác nhận xóa?" onConfirm={async () => {
                                await apiAnswerDelete(entity.id);
                                message.success('Xóa thành công!');
                                actionRef.current?.reload();
                            }}>
                                <Button type="primary" danger size="small" icon={<DeleteOutlined />} />
                            </Popconfirm>
                        ],
                        valueType: 'option',
                        width: 80
                    }
                ]}
            />
            <ModalForm open={open} onOpenChange={setOpen} title="Câu trả lời" formRef={formRef} onFinish={onFinish} width={1000}>
                <ProFormText name="id" hidden />
                <MyCkEditor name="text" label="Nội dung" />
                <Row gutter={16}>
                    <Col span={16}>
                        <ProFormDigit name="sortOrder" label="Thứ tự" />
                    </Col>
                    <Col span={8}>
                        <ProFormSelect name="isCorrect" label="Đáp án đúng"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                            options={[
                                {
                                    label: 'Đúng',
                                    value: true
                                },
                                {
                                    label: 'Sai',
                                    value: false
                                }
                            ]} />
                    </Col>
                </Row>
            </ModalForm>
        </PageContainer>
    )
}

export default ExamAnswerPage;