import { ProForm, ProFormTextArea } from "@ant-design/pro-components";
import { useEffect } from "react";
import { BlockProps } from "./typings";

const HtmlBlock: React.FC<BlockProps> = (props) => {

    const formRef = ProForm.useFormInstance();

    useEffect(() => {
        if (props.data) {
            formRef.setFields([
                {
                    name: 'className',
                    value: props.data?.className
                },
                {
                    name: 'value',
                    value: props.data?.value
                }
            ]);
        }
    }, [props.data]);

    return (
        <>
            <ProFormTextArea label="Html" name="value" />
        </>
    )
}

export default HtmlBlock;