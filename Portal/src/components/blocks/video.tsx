import { queryBlock } from "@/services/block";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { useEffect } from "react";

type Props = {
    id: string;
}

const VideoBlock: React.FC<Props> = ({ id }) => {

    const form = ProForm.useFormInstance();
    useEffect(() => {
        if (id) {
            queryBlock(id).then(response => {
                form.setFields([
                    {
                        name: 'embedUrl',
                        value: response.embedUrl
                    }
                ]);
            })
        }
    }, [id])

    return (
        <>
            <ProFormText label="Embed URL" name="embedUrl" rules={[
                {
                    required: true
                }
            ]} />
        </>
    )
}

export default VideoBlock;