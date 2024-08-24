import { apiMajorList } from "@/services/onboard/major";
import { EyeOutlined } from "@ant-design/icons";
import { PageContainer, ProColumnType, ProTable } from "@ant-design/pro-components"
import { Button } from "antd";

const MajorPage: React.FC = () => {

    const columns: ProColumnType<any>[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 40
        },
        {
            title: 'Chuyên ngành',
            dataIndex: 'name'
        },
        {
            title: 'Số SV',
            dataIndex: 'total',
            valueType: 'digit',
            width: 80,
            search: false
        },
        {
            title: 'Tác vụ',
            valueType: 'option',
            render: () => [
                <Button type="primary" key="view" size="small" icon={<EyeOutlined />} />
            ],
            width: 60
        }
    ]

    return (
        <PageContainer>
            <ProTable
                search={{
                    layout: 'vertical'
                }}
                columns={columns}
                request={apiMajorList} />
        </PageContainer>
    )
}

export default MajorPage;