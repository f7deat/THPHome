import { queryBlock } from "@/services/block";
import { ProForm, ProFormSelect, ProFormTextArea } from "@ant-design/pro-components";
import { useEffect } from "react";

type Props = {
    id: string;
}

const TextBlock: React.FC<Props> = ({ id }) => {

    const form = ProForm.useFormInstance();
    useEffect(() => {
        if (id) {
            queryBlock(id).then(response => {
                form.setFields([
                    {
                        name: 'type',
                        value: response.type
                    },
                    {
                        name: 'value',
                        value: response.value
                    }
                ]);
            })
        }
    }, [id])

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