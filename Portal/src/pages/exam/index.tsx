import { apiListExam } from "@/services/exam/exam";
import { DeleteOutlined, EditOutlined, FolderOutlined, PlusOutlined } from "@ant-design/icons";
import { PageContainer, ProTable } from "@ant-design/pro-components"
import { Button, Popconfirm } from "antd";
import { useState } from "react";
import ExamFormModal from "./components/exam-form";
import { Link } from "@umijs/max";

const ExamPage: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <PageContainer extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>Tạo kỳ thi</Button>}>
            <ProTable
                request={apiListExam}
                search={{
                    layout: 'vertical'
                }}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30,
                        align: 'center'
                    },
                    {
                        title: 'Kỳ thi',
                        dataIndex: 'name'
                    },
                    {
                        title: 'Ngày tạo',
                        dataIndex: 'createdDate',
                        valueType: 'dateTime',
                        width: 150,
                        search: false
                    },
                    {
                        title: 'Ngày bắt đầu',
                        dataIndex: 'startDate',
                        valueType: 'dateTime',
                        width: 150,
                        search: false
                    },
                    {
                        title: 'Ngày kết thúc',
                        dataIndex: 'endDate',
                        valueType: 'dateTime',
                        width: 150,
                        search: false
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'active',
                        valueEnum: {
                            true: {
                                text: 'Active',
                                status: 'Processing'
                            },
                            false: {
                                text: 'Draft',
                                status: 'Default'
                            }
                        },
                        width: 100
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, entity) => [
                            <Button size="small" icon={<EditOutlined />} key="edit" />,
                            <Link key="detail" to={`/exam/version/${entity.id}`}>
                            <Button type="primary" size="small" icon={<FolderOutlined />} />
                            </Link>,
                            <Popconfirm key="delete" title="Xác nhận xóa?">
                                <Button type="primary" size="small" icon={<DeleteOutlined />} danger />
                            </Popconfirm>
                        ],
                        width: 80
                    }
                ]}
            />
            <ExamFormModal open={open} onOpenChange={setOpen} />
        </PageContainer>
    )
}

export default ExamPage;