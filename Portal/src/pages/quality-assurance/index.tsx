import { apiCountProficiencyExamByStatus, apiTotalProficiencyExamAmount } from "@/services/quality-assurance/proficiency";
import { PageContainer, ProCard } from "@ant-design/pro-components"
import { Col, Row, Statistic } from "antd";
import { useRequest, FormattedNumber, Link } from "@umijs/max"

const Index: React.FC = () => {

    const { data: totalExam } = useRequest(() => apiCountProficiencyExamByStatus());
    const { data: newExam } = useRequest(() => apiCountProficiencyExamByStatus(0));
    const { data: finishExam } = useRequest(() => apiCountProficiencyExamByStatus(4));
    const { data: totalAmount } = useRequest(() => apiTotalProficiencyExamAmount());

    return (
        <PageContainer>
            <Row gutter={16}>
                <Col md={6} xs={12}>
                    <ProCard className="bg-white rounded mb-4" extra={<Link to={`/quality-assurance/proficiency-exam`}>chi tiết</Link>} size="small" headerBordered>
                        <Statistic
                            title="Lượt đăng ký thi"
                            value={finishExam}
                            className="p-4"
                            suffix={<span className="text-green-500">+ <FormattedNumber value={newExam} /></span>}
                        />
                        <div className="border-t px-4 py-2">
                            Tổng lượt đăng ký thi: <FormattedNumber value={totalExam} />
                        </div>
                    </ProCard>
                </Col>
                <Col md={6} xs={12}>
                    <ProCard className="bg-white rounded mb-4" size="small" headerBordered extra={<Link to={`/quality-assurance/proficiency-exam`}>chi tiết</Link>}>
                        <Statistic
                            title="Tổng số tiền thu"
                            value={totalAmount}
                            className="p-4"
                            suffix={<span className="underline">đ</span>}
                        />
                        <div className="border-t px-4 py-2">
                            Không bao gồm những đơn đăng ký đã hủy
                        </div>
                    </ProCard>
                </Col>
            </Row>
        </PageContainer>
    )
}

export default Index;