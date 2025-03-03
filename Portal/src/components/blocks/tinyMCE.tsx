import { useEffect } from "react";
import { BlockProps } from "./typings";
import { ProForm } from "@ant-design/pro-components";
import MyCkEditor from "../my-ckeditor";

const TinyMCEBlock: React.FC<BlockProps> = (props) => {

    const formRef = ProForm.useFormInstance();

    useEffect(() => {
        formRef.setFields([
            {
                name: 'raw',
                value: props.data?.raw
            },
            {
                name: 'className',
                value: props.data?.className
            }
        ]);
    }, [props.data])

    return (
        <>
            <MyCkEditor name="raw" label="Nội dung" />
        </>
    )
}

export default TinyMCEBlock;