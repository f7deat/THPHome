import { useParams } from "@/.umi/exports";
import { apiGetExamVersion } from "@/services/exam/exam";
import { PageContainer } from "@ant-design/pro-components"
import { useEffect, useState } from "react";

const ExamQuestionPage: React.FC = () => {

    const { id } = useParams();
    const [examVersion, setExamVersion] = useState<any>();

    useEffect(() => {
        if (id) {
            apiGetExamVersion(id).then(response => setExamVersion(response.data));
        }
    }, [id]);

    return (
        <PageContainer title={examVersion?.name}>

        </PageContainer>
    )
}

export default ExamQuestionPage;