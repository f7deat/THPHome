import { useEffect, useState } from "react";
import MyEditor from "../my-editor";
import { BlockProps } from "./typings";
import { ProForm } from "@ant-design/pro-components";

const TinyMCEBlock: React.FC<BlockProps> = (props) => {

    const formRef = ProForm.useFormInstance();
    const [dataSource, setDataSource] = useState<any>();

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
        setDataSource(props.data);
    }, [props.data])

    return (
        <>
            <MyEditor name="raw" label="Nội dung" initialValue={dataSource?.raw} />
        </>
    )
}

export default TinyMCEBlock;