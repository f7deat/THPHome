import { apiGetListAcademicProgram } from "@/services/admission/academic-program";
import { apiGetMajor } from "@/services/admission/major";
import { LeftOutlined } from "@ant-design/icons";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { history, useParams, useRequest } from "@umijs/max";
import { Button } from "antd";

const Center: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const { data } = useRequest(() => apiGetMajor(id))

    return (
        <PageContainer title={data?.name} extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProTable
                request={(params) => apiGetListAcademicProgram({ ...params, majorId: id })}
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

export default Center;