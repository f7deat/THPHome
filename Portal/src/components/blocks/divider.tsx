import { queryBlock } from "@/services/block";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { useEffect } from "react";

type Props = {
    id: string;
}

const DividerBlock: React.FC<Props> = ({ id }) => {

    const form = ProForm.useFormInstance();
    useEffect(() => {
        if (id) {
            queryBlock(id).then(response => {
                form.setFields([
                    {
                        name: 'label',
                        value: response.label
                    },
                    {
                        name: 'className',
                        value: response.className
                    }
                ]);
            })
        }
    }, [id])

    return (
        <>
            <ProFormText label="Label" name="label" />
        </>
    )
}

export default DividerBlock;