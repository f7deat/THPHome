import { apiGetZaloArtices, apiVerifyZaloArticle } from "@/services/setting";
import { ReloadOutlined } from "@ant-design/icons";
import { ActionType, PageContainer, ProColumnType, ProTable } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { useRef } from "react";

const ZaloArticlePage : React.FC = () => {

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
            title: 'Tác vụ',
            valueType: 'option',
            render: (dom, entity) => [
                <Button type="primary" icon={<ReloadOutlined />} key="reload" size="small" onClick={() => {
                    apiVerifyZaloArticle(entity.id).then(response => {
                        if (response.succeecced) {
                            message.success('Kiểm tra thành công!');
                        }
                        actionRef.current?.reload();
                    })
                }} />
            ]
        }
    ]

    return (
        <PageContainer>
            <ProTable
                actionRef={actionRef}
                request={apiGetZaloArtices}
                columns={columns}
            />
        </PageContainer>
    )
}

export default ZaloArticlePage;