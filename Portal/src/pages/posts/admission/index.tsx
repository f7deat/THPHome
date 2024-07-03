import { PostType } from "@/enum/post-enum";
import PostList from "../post-list";

const AdmissionPage: React.FC = () => {
    return <PostList type={PostType.ADMISSION} />
}

export default AdmissionPage;