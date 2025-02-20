import { DrawerForm, ProFormInstance, ProFormText } from "@ant-design/pro-components";
import { useEffect, useRef } from "react";
import { BlockProps } from "./typings";

const DividerBlock: React.FC<BlockProps> = (props) => {

    const formRef = useRef<ProFormInstance>();

    useEffect(() => {
        formRef.current?.setFields([
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
        <DrawerForm {...props} formRef={formRef}>
            <ProFormText label="Label" name="label" />
        </DrawerForm>
    )
}

export default DividerBlock;