import { PageContainer, ProFormSelect } from "@ant-design/pro-components"
import Board from "../components/board";
import { history, useModel, useRequest } from "@umijs/max";
import { apiTaskItemKanban } from "../services/task-item";
import { Button, Dropdown, Input, Segmented, Select } from "antd";
import { AppstoreOutlined, BarsOutlined, MoreOutlined, StopOutlined, TagOutlined } from "@ant-design/icons";
import { apiTaskTagOptions } from "../services/tag";

const Index: React.FC = () => {

    const { initialState } = useModel('@@initialState');
    const { data, loading } = useRequest(() => apiTaskItemKanban({ departmentId: initialState?.currentUser.departmentId }));

    return (
        <PageContainer loading={loading} extra={<Segmented
            defaultValue="Kanban"
            options={[
                { value: 'List', icon: <BarsOutlined /> },
                { value: 'Kanban', icon: <AppstoreOutlined /> },
            ]}
            onChange={(value) => {
                if (value === 'List') {
                    history.push('/task/board');
                } else {
                    history.push('/task/kanban');
                }
            }}
        />}>
            <div className="bg-white mb-2">
                <div className="flex items-center border-b font-medium uppercase">
                    <div className="p-2 border-b border-blue-500"><BarsOutlined /> Tổng quan</div>
                    <div className="p-2 hover:bg-slate-100 cursor-pointer"><StopOutlined /> Backlog</div>
                </div>
                <div className="flex p-2 gap-2">
                    <Select placeholder="CBVC - NLĐ" />
                    <ProFormSelect placeholder="Thẻ" request={apiTaskTagOptions as any} showSearch fieldProps={{ popupMatchSelectWidth: false }} formItemProps={{ className: 'mb-0' }} />
                    <div className="flex">
                        <Input.Search placeholder="Nhập từ khóa" />
                    </div>
                    <div className="flex-1 flex justify-end">
                        <Dropdown menu={{
                            items: [
                                {
                                    label: 'Tags',
                                    key: 'tags',
                                    icon: <TagOutlined />
                                }
                            ]
                        }}>
                            <Button icon={<MoreOutlined />} type="dashed" />
                        </Dropdown>
                    </div>
                </div>
            </div>
            <Board data={data} />
        </PageContainer>
    )
}

export default Index;