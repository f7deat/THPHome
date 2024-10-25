import { useParams, useRequest, Link, history } from "@umijs/max";
import { DeleteOutlined, EditOutlined, FolderOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, PageContainer, ProTable } from "@ant-design/pro-components"
import { Button, Popconfirm, Tooltip } from "antd";
import { useRef, useState } from "react";
import { apiGetExam, apiListExamVersion } from "@/services/exam/exam";
import ExamVersionForm from "./components/form";

const ExamVersionPage: React.FC = () => {

    const { id } = useParams();
    const actionRef = useRef<ActionType>();
    const [open, setOpen] = useState<boolean>(false);
    const { data } = useRequest(() => apiGetExam(id))

    return (
        <PageContainer title={data?.name} extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProTable
            headerTitle={<Button type="primary" icon={<PlusOutlined />}>Tạo đề thi</Button>}
                search={{
                    layout: 'vertical'
                }}
                actionRef={actionRef}
                request={(params) => apiListExamVersion({
                    ...params
                }, id)}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30,
                        align: 'center'
                    },
                    {
                        title: 'Đề thi',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Ngày tạo',
                        dataIndex: 'createdDate',
                        search: false,
                        valueType: 'dateTime',
                        width: 150
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, entity) => [
                            <Button icon={<EditOutlined />} size="small" key="edit" onClick={() => {
                                setOpen(true);
                            }} />,
                            <Tooltip key="answer" title="Câu hỏi">
                                <Link to={`/exam/version/question/${entity.id}`}>
                                    <Button type="primary" icon={<FolderOutlined />} size="small" disabled={entity.type === 3} />
                                </Link>
                            </Tooltip>,
                            <Popconfirm title="Xác nhận xóa?" key="delete">
                                <Button type="primary" danger size="small" icon={<DeleteOutlined />} />
                            </Popconfirm>
                        ],
                        width: 100
                    }
                ]}
            />
            <ExamVersionForm open={open} onOpenChange={setOpen}></ExamVersionForm>
        </PageContainer>
    )
}

export default ExamVersionPage;