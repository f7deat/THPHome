import { ProForm, ProFormTextArea } from "@ant-design/pro-components";
import { IBlock } from "./typings";
import { useEffect } from "react";
import { queryBlock } from "@/services/block";

const HtmlBlock: React.FC<IBlock> = ({ id }) => {
    const form = ProForm.useFormInstance();

    useEffect(() => {
        if (id) {
            queryBlock(id).then(response => {
                form.setFields([
                    {
                        name: 'className',
                        value: response.className
                    },
                    {
                        name: 'value',
                        value: response.value
                    }
                ]);
            })
        }
    }, [id]);

    return (
        <>
            <ProFormTextArea label="Html" name="value" />
        </>
    )
}

export default HtmlBlock;