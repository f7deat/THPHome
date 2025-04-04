import DepartmentUsers from "@/pages/users/profile/components/department";
import { PlusOutlined } from "@ant-design/icons";
import { PageContainer, ProTable } from "@ant-design/pro-components"
import { useModel } from "@umijs/max"
import { Button } from "antd";

const Index: React.FC = () => {

    const { initialState } = useModel('@@initialState');

    return (
        <PageContainer>
            <div className="flex gap-4">
                <div className="md:w-2/3">
                    <ProTable
                        headerTitle={<Button type="primary" icon={<PlusOutlined />}>Bài viết mới</Button>}
                        search={{
                            layout: 'vertical'
                        }}
                        columns={[
                            {
                                title: '#',
                                dataIndex: 'avatar',
                                valueType: 'indexBorder',
                                width: 30,
                                align: 'center'
                            },
                            {
                                title: 'Tiêu đề',
                                dataIndex: 'title',
                            },
                            {
                                title: 'Người đăng',
                                dataIndex: 'userName',
                            },
                            {
                                title: 'Thời gian',
                                dataIndex: 'createdD ate',
                                valueType: 'fromNow'
                            }
                        ]}
                    />
                </div>
                <div className="md:w-1/3">
                    <DepartmentUsers />
                </div>
            </div>
        </PageContainer>
    )
}

export default Index