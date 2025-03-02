import PostList from "@/components/posts/list";
import { PostType } from "@/enum/post-enum";
import { PageContainer } from "@ant-design/pro-components";

const ArticlePage: React.FC = () => {
    return (
        <PageContainer>
            <PostList type={PostType.NEWS} />
        </PageContainer>
    )
}

export default ArticlePage;