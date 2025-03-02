import PostList from "@/components/posts/list";
import { PostType } from "@/enum/post-enum";
import { PageContainer } from "@ant-design/pro-components";

const EntryPage : React.FC = () => {
    return (
        <PageContainer>
            <PostList type={PostType.DEFAULT} />
        </PageContainer>
    )
}

export default EntryPage;