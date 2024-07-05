import { apiGetZaloArtices, apiVerifyZaloArticle } from "@/services/setting";
import { EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { ActionType, PageContainer, ProColumnType, ProTable } from "@ant-design/pro-components";
import { Button, message, Tooltip } from "antd";
import { useRef } from "react";

const ZaloArticlePage: React.FC = () => {

    const actionRef = useRef<ActionType>();

    const columns: ProColumnType<any>[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 50,
            align: 'center'
        },
        {
            title: 'Bài viết',
            dataIndex: 'title'
        },
        {
            title: 'Ghi chú',
            dataIndex: 'message'
        },
        {
            title: 'Tác vụ',
            valueType: 'option',
            render: (dom, entity) => [
                <Tooltip title="Chia sẻ lại" key="reload">
                    <Button type="primary" icon={<ReloadOutlined />} size="small" onClick={() => {
                        apiVerifyZaloArticle(entity.id).then(response => {
                            if (response.succeecced) {
                                message.success('Kiểm tra thành công!');
                            }
                            actionRef.current?.reload();
                        })
                    }} />
                </Tooltip>,
                <Tooltip key="check" title="Kiểm tra tiến trình chia sẻ">
                    <Button icon={<EyeOutlined />} size="small" />
                </Tooltip>
            ],
            width: 100
        }
    ]

    return (
        <PageContainer>
            <ProTable
                actionRef={actionRef}
                request={apiGetZaloArtices}
                columns={columns}
                search={{
                    layout: 'vertical'
                }}
            />
        </PageContainer>
    )
}

export default ZaloArticlePage;