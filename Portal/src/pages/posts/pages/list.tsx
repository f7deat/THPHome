import { PostType } from "@/enum/post-enum";
import PostList from "../post-list";

const PagePage : React.FC = () => {
    return <PostList type={PostType.PAGE} />
}

export default PagePage;