import { apiGetListMajor, apiGetMajor } from "@/services/admission/major";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useParams, useRequest } from "@umijs/max";

const Index: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const { data } = useRequest(() => apiGetMajor(id))

    return (
        <PageContainer title={data?.name}>
            <ProTable
                request={(params) => apiGetListMajor({ ...params, trainingGroupId: id })}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30
                    }
                ]}
            />
        </PageContainer>
    )
}

export default Index;