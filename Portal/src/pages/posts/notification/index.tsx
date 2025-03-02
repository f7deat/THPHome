import PostList from "@/components/posts/list";
import { PostType } from "@/enum/post-enum";
import { PageContainer } from "@ant-design/pro-components";

const NotificationPage : React.FC = () => {
    return (
        <PageContainer>
            <PostList type={PostType.NOTIFICATION} />
        </PageContainer>
    )
}

export default NotificationPage;