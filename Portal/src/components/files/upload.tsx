import { apiFileUpload } from "@/services/file";
import { CloudUploadOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Divider, GetProp, Input, Modal, UploadFile, UploadProps, message } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import { useState } from "react";

type Props = {
    open: boolean;
    onFinish: any;
    onCancel: any;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const FileUpload: React.FC<Props> = (props) => {
    const [url, setUrl] = useState<string>('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    function isValidHttpsUrl(input: string) {
        let url;
        try {
            url = new URL(input);
        } catch (_) {
            return false;
        }
        return url.protocol === "https:";
    }

    const onOk = async () => {
        if (fileList.length > 0) {
            const formData = new FormData();
            fileList.forEach((file) => {
                formData.append('file', file as FileType);
            });
            setUploading(true);
            // You can use any AJAX library you like
            const response = await apiFileUpload(formData);
            setUploading(false);
            if (!response.succeeded) {
                message.error(response.message);
                return;
            }
            setFileList([]);
            props.onFinish(response);
            props.onCancel();
            return;
        }
        if (!isValidHttpsUrl(url)) {
            message.error('Sorry, URL failed to upload.')
            return;
        }
        props.onFinish({
            url,
            succeeded: true
        });
        setUrl('');
        props.onCancel();
    }

    return (
        <Modal open={props.open} onCancel={() => props.onCancel()} centered title="Upload" onOk={onOk} confirmLoading={uploading}>
            <div className="mb-4">
                <Dragger
                    fileList={fileList}
                    onRemove={(file) => {
                        const index = fileList.indexOf(file);
                        const newFileList = fileList.slice();
                        newFileList.splice(index, 1);
                        setFileList(newFileList);
                    }}
                    beforeUpload={(file) => {
                        setFileList([...fileList, file]);
                        return false
                    }}
                    maxCount={1}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
            </div>
            <div className="text-center">
                <div className="font-medium flex items-center gap-2 justify-center text-blue-500 text-base"> <CloudUploadOutlined /> Choose from your computer</div>
            </div>
            <Divider>or</Divider>
            <Input placeholder="Paste image or URL" onChange={(e) => setUrl(e.currentTarget.value)} />
        </Modal >
    )
}

export default FileUpload;