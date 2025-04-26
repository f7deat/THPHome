import { PlusOutlined } from "@ant-design/icons";
import { ProFormSelect } from "@ant-design/pro-components";
import { message, Tag } from "antd";
import { useState } from "react";
import { apiAddTagToTask, apiTaskTagOptions } from "../../services/tag";
import { useParams, useRequest } from "@umijs/max";
import { apiTaskTags } from "../../services/task-item";

const Tags: React.FC = () => {

    const [visible, setVisible] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const { data, refresh } = useRequest(() => apiTaskTags({ taskItemId: id}));

    const onChange = async (value: number) => {
        await apiAddTagToTask({ taskItemId: id, tagId: value });
        message.success('Thêm tag thành công!');
        setVisible(false);
        refresh();
    }

    return (
        <div className="flex flex-wrap gap-1 items-center">
            {
                data?.map((item: any) => (
                    <Tag key={item.id} color="blue" className="mb-6">{item.name}</Tag>
                ))
            }
            <Tag className="cursor-pointer mb-6" hidden={visible} onClick={() => setVisible(!visible)}><PlusOutlined /> Thêm Tag</Tag>
            <ProFormSelect onChange={onChange} name="tag" hidden={!visible} fieldProps={{ size: 'small', popupMatchSelectWidth: false }} showSearch request={apiTaskTagOptions as any} />
        </div>
    )
}

export default Tags;