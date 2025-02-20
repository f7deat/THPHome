import { ProForm, ProFormSelect, ProFormTextArea } from "@ant-design/pro-components";
import { useEffect } from "react";
import { BlockProps } from "./typings";

const TextBlock: React.FC<BlockProps> = (props) => {

    const formRef = ProForm.useFormInstance();

    useEffect(() => {
        formRef.setFields([
            {
                name: 'type',
                value: props.data?.type
            },
            {
                name: 'value',
                value: props.data?.value
            },
            {
                name: 'className',
                value: props.data?.className
            }
        ]);
    }, [props.data])

    return (
        <>
            <ProFormSelect label="Loại" name="type" options={[
                {
                    label: 'H1',
                    value: 'h1'
                },
                {
                    label: 'H2',
                    value: 'h2'
                },
                {
                    label: 'H3',
                    value: 'h3'
                },
                {
                    label: 'Paragraph',
                    value: 'paragraph'
                }
            ]} />
            <ProFormTextArea label="Nội dung" name="value" />
        </>
    )
}

export default TextBlock;