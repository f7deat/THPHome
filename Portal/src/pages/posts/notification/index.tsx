import { PostType } from "@/enum/post-enum";
import PostList from "../post-list";

const NotificationPage : React.FC = () => {
    return <PostList type={PostType.NOTIFICATION} />
}

export default NotificationPage;