import { PostType } from "@/enum/post-enum";
import { apiCategoryTreeData } from "@/services/categoy";
import { apiNewPost } from "@/services/post";
import { ModalForm, ProFormInstance, ProFormText, ProFormTextArea, ProFormTreeSelect } from "@ant-design/pro-components"
import { Button, message } from "antd";
import { useRef, useState } from "react";

type Props = {
    type: PostType;
}

const NewPost: React.FC<Props> = ({ type }) => {

    const [open, setOpen] = useState<boolean>(false);
    const formRef = useRef<ProFormInstance>();

    const onFinish = async (values: any) => {
        values.type = type;
        await apiNewPost(values);
        message.success('Thêm mới thành công!');
        setOpen(false);
        formRef.current?.resetFields();
    }

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>Thêm mới</Button>
            <ModalForm open={open} onOpenChange={setOpen} title="Thêm mới" formRef={formRef} onFinish={onFinish}>
                <ProFormText name="title" label="Tiêu đề" rules={[
                    {
                        required: true
                    }
                ]} />
                <ProFormTextArea name="description" label="Mô tả" rules={[
                    {
                        required: true
                    }
                ]} />
                <ProFormTreeSelect name="categoryId" label="Danh mục" request={apiCategoryTreeData} />
            </ModalForm>
        </>
    )
}

export default NewPost;