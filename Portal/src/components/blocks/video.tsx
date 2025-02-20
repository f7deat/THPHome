import { ProForm, ProFormText } from "@ant-design/pro-components";
import { useEffect } from "react";
import { BlockProps } from "./typings";

const VideoBlock: React.FC<BlockProps> = (props) => {

    const formRef = ProForm.useFormInstance();

    useEffect(() => {
        formRef.setFields([
            {
                name: 'embedUrl',
                value: props.data?.embedUrl
            }
        ]);
    }, [props?.data])

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