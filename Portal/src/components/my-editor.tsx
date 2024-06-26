﻿import { message } from "antd";
import React, { useEffect, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { request } from "@umijs/max";
import { ProForm, ProFormItemProps } from "@ant-design/pro-components";

const MyEditor: React.FC<ProFormItemProps> = (props) => {

    const form = ProForm.useFormInstance();
    const editorRef = useRef<any>(null);

    const log = () => {
        if (editorRef.current) {
            form.setFieldValue(props.name, editorRef.current?.getContent())
        }
    };

    useEffect(() => {
        if (!props.initialValue && editorRef.current) {
            editorRef.current.setContent('')
        }
    }, [props.initialValue]);

    return (
        <>
            <div className="mb-4">
                <ProForm.Item hidden name={props.name} />
                <div className="mb-2">{props.label}</div>
                <Editor
                    onChange={log}
                    onInit={(evt, editor) => {
                        editorRef.current = editor;
                    }}
                    apiKey='mn4nbwhddqp9jr1g1c3w17dkdu96ji7lr2fmolsncez1k3ng'
                    init={{
                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                        file_picker_types: 'file image media',
                        file_picker_callback: (callback, value, meta) => {
                            // Provide file and text for the link dialog
                            if (meta.filetype === 'file') {
                                callback('mypage.html', { text: 'My text' });
                            }

                            // Provide image and alt text for the image dialog
                            if (meta.filetype === 'image') {
                                const input = document.createElement('input');
                                input.setAttribute('type', 'file');
                                input.setAttribute('accept', 'image/*');

                                input.addEventListener('change', async (e: any) => {
                                    const file = e.target.files[0];

                                    const formData = new FormData();
                                    formData.append("file", file);
                                    const response = await request('file/image/upload', {
                                        data: formData,
                                        method: 'POST'
                                    });
                                    if (response) {
                                        message.success('Tải lên thành công!');
                                        callback(response.url, { alt: 'My alt text' });
                                    }
                                });

                                input.click();

                            }

                            // Provide alternative source and posted for the media dialog
                            if (meta.filetype === 'media') {
                                callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
                            }
                        }
                    }}
                    initialValue={props.initialValue}
                />
            </div>
        </>
    )
}
export default MyEditor