import { apiJournalAdd, apiJournalDelete, apiJournalList, apiJournalUpdate } from "@/services/user";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, ProFormDatePicker, ProFormInstance, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, Col, message, Popconfirm, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

const JournalTab: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [open, setOpen] = useState<boolean>(false);
    const [journal, setJournal] = useState<any>();
    const { initialState } = useModel('@@initialState');

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
        </>
    )
}

export default JournalTab;