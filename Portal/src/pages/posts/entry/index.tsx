import PostList from "@/components/posts/list";
import { PostType } from "@/enum/post-enum";
import { LeftOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button } from "antd";

const EntryPage : React.FC = () => {
    return (
        <PageContainer extra={<Button onClick={() => history.back()} icon={<LeftOutlined />}>Quay lại</Button>}>
            <PostList type={PostType.DEFAULT} />
        </PageContainer>
    )
}

export default EntryPage;