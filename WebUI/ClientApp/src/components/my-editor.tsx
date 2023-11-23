import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form, InputProps, message } from "antd";
import React, { useCallback, useRef } from "react";
import axios from 'axios';

const MyEditor: React.FC<InputProps> = (props) => {

    const form = Form.useFormInstance();
    const reactQuillRef = useRef<any>();

    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                const formData = new FormData();
                formData.append("file", file);
                const response = await axios({
                    url: '/api/file/image/upload',
                    data: formData,
                    method: 'POST'
                });
                if (response.data) {
                    message.success('Tải lên thành công!');
                    const quill = reactQuillRef.current;
                    if (quill) {
                        const range = quill?.getEditorSelection();
                        range && quill?.getEditor().insertEmbed(range.index, "image", response.data.url);
                    }
                    return response.data.url;
                }
                message.success('Tải lên thất bại!')
            }
        };
    }, []);

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block', 'video', 'image'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: ['red'] }, { background: ['red'] }],
        [{ font: ['500'] }],
        [{ 'align': ['', 'justify', 'right', 'center'] }],
        ['clean']
    ];

    return (
        <ReactQuill
            ref={reactQuillRef }
            theme="snow" modules={{
            toolbar: {
                container: toolbarOptions,
                handlers: {
                    image: imageHandler
                },
            }
        }}
            onChange={(value) => {
                form.setFieldValue(props.name, value);
            }}
        />
    )
}
export default MyEditor