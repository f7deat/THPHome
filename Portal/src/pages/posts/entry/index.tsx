import { PostType } from "@/enum/post-enum";
import PostList from "../post-list";

const EntryPage : React.FC = () => {
    return <PostList type={PostType.DEFAULT} />
}

export default EntryPage;