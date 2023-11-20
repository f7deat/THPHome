// @ts-ignore
import ClassicEditor from "ckeditor5-build-classic-plus";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Form, InputProps } from "antd";
import React from "react";
import { MyCustomUploadAdapterPlugin } from "./MyUploadAdapter";

const MyEditor: React.FC<InputProps> = (props) => {

    const form = Form.useFormInstance();

    return (
        <CKEditor
            editor={ClassicEditor as any}
            data={form.getFieldValue(props.name || 'content')}
            onChange={(event: any, editor: any) => {
                const data = editor.getData();
                form.setFieldValue(props.name || 'content', data)
            }}
            config={{
                extraPlugins: [MyCustomUploadAdapterPlugin]
            }}
            
        />
    )
}
export default MyEditor