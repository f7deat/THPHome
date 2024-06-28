import { PostType } from "@/enum/post-enum";
import PostList from "../post-list";

const ArticlePage : React.FC = () => {
    return <PostList type={PostType.NEWS} />
}

export default ArticlePage;