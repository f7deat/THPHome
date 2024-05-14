import { queryBlock } from "@/services/block";
import { ProForm } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import MyEditor from "../my-editor";

type Props = {
    id: string;
}

const TinyMCEBlock: React.FC<Props> = ({ id }) => {

    const form = ProForm.useFormInstance();
    const [dataSource, setDataSource] = useState<any>();

    useEffect(() => {
        if (id) {
            queryBlock(id).then(response => {
                form.setFields([
                    {
                        name: 'raw',
                        value: response.raw
                    },
                    {
                        name: 'className',
                        value: response.className
                    }
                ]);
                setDataSource(response);
            });
        }
    }, [id])

    return (
        <>
            <MyEditor name="raw" label="Nội dung" initialValue={dataSource?.raw} />
        </>
    )
}

export default TinyMCEBlock;