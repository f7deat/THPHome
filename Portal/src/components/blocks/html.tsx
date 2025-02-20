import { DrawerForm, ProFormInstance, ProFormTextArea } from "@ant-design/pro-components";
import { useEffect, useRef } from "react";
import { BlockProps } from "./typings";

const HtmlBlock: React.FC<BlockProps> = (props) => {
    
    const formRef = useRef<ProFormInstance>();

    useEffect(() => {
        if (props.data) {
            formRef.current?.setFields([
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
        <DrawerForm {...props} formRef={formRef}>
            <ProFormTextArea label="Html" name="value" />
        </DrawerForm>
    )
}

export default HtmlBlock;