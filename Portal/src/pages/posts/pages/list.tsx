import { PostType } from "@/enum/post-enum";
import { PageContainer } from "@ant-design/pro-components";
import PostList from "@/components/posts/list";

const PagePage : React.FC = () => {
    
    return (
        <PageContainer>
            <PostList type={PostType.PAGE} />
        </PageContainer>
    )
}

export default PagePage;