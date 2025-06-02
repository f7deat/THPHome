import PostList from "@/components/posts/list";
import { PostType } from "@/enum/post-enum";
import { DeleteOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button } from "antd";

const ArticlePage: React.FC = () => {
    return (
        <PageContainer extra={<Button icon={<DeleteOutlined />} danger onClick={() => history.push(`/post/trash`)}>Thùng rác</Button>}>
            <PostList type={PostType.NEWS} />
        </PageContainer>
    )
}

export default ArticlePage;