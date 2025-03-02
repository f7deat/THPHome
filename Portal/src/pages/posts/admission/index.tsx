import PostList from "@/components/posts/list";
import { PostType } from "@/enum/post-enum";
import { PageContainer } from "@ant-design/pro-components";

const AdmissionPage: React.FC = () => {
    return (
        <PageContainer>
            <PostList type={PostType.ADMISSION} />
        </PageContainer>
    )
}

export default AdmissionPage;