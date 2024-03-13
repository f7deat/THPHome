import { queryBlock } from "@/services/block";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import MyEditor from "../my-editor";
import { message } from "antd";
import { request } from "@umijs/max";
import { Editor } from "@tinymce/tinymce-react";

type Props = {
    id: string;
}

const TinyMCEBlock: React.FC<Props> = ({ id }) => {

    const form = ProForm.useFormInstance();

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
            })
        }
    }, [id])

    return (
        <ProForm.Item name="raw" label="Nội dung">
            <MyEditor name="raw" />
        </ProForm.Item>
    )
}

export default TinyMCEBlock;