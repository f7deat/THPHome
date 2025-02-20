import { ProForm, ProFormText } from "@ant-design/pro-components";
import { useEffect } from "react";
import { BlockProps } from "./typings";

const DividerBlock: React.FC<BlockProps> = (props) => {

    const formRef = ProForm.useFormInstance();

    useEffect(() => {
        formRef.setFields([
            {
                name: 'label',
                value: props.data?.label
            },
            {
                name: 'className',
                value: props.data?.className
            }
        ]);
    }, [props.data])

    return (
        <>
            <ProFormText label="Label" name="label" />
        </>
    )
}

export default DividerBlock;