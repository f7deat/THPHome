import { Button, Col, DatePicker, Input, message, Row, Select, Space, Upload, UploadProps } from 'antd'
import axios from 'axios'
import {
    UploadOutlined,
    InboxOutlined
} from "@ant-design/icons";
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ListPostType } from '../../enum/post-enum'
import IPost from './interfaces/post-model'
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuillToolbar, { formats, modules } from '../../components/editor-toolbar';

const { Dragger } = Upload;

const PostSetting = () => {

    const { Option } = Select;

    const history = useHistory();
    const { id } = useParams<any>();
    const reactQuillRef = useRef<any>();

    const [value, setValue] = useState('');

    const [post, setPost] = useState<IPost>({})
    const [listCategory, setListCategory] = useState<any>()
    const [listCategoryId, setListCategoryId] = useState<any>([])
    const [defaultFileList, setDefaultFileList] = useState<any>([])

    const initCallback = useCallback(() => {
        if (id) {
            axios.get(`/api/post/get/${id}`).then(response => {
                setPost(response.data)
                setValue(response.data.content);
            })
            axios.get(`/api/post/get-list-category-id-in-post/${id}`).then(response => {
                setListCategoryId(response.data)
            })
            axios.get(`/api/post/attachment-list-in-post/${id}`).then(response => {
                let mapData = response.data.map(function (x: any) {
                    return {
                        uid: x.id,
                        name: x.name,
                        status: 'done',
                        url: `/files/${x.id}${x.extension}`
                    }
                });
                setDefaultFileList(mapData)
            })
        }
    }, [id])

    useEffect(() => {
        initCallback()
        axios.get('/api/category/get-list').then(response => {
            setListCategory(response.data);
        })
    }, [initCallback])

    const handleSave = () => {
        if (id) {
            handleEdit()
        } else {
            handleAdd()
        }
    }

    const handleAdd = () => {
        post.content = value;
        let attachments = defaultFileList.map(function (x: any) {
            return {
                id: x.uid
            }
        })
        axios.post('/api/post/add', {
            post,
            listCategoryId,
            attachments
        }).then(response => {
            if (response.data.succeeded) {
                history.push(`/admin/post/list?type=${post.type}`);
            } else {
                message.error('ERROR');
            }
        })
    }

    const handleEdit = () => {
        post.content = value;
        let attachments = defaultFileList.map(function (x: any) {
            return {
                id: x.uid
            }
        })
        axios.post(`/api/post/update`, {
            post,
            listCategoryId,
            attachments
        }).then(response => {
            if (response.data.succeeded) {
                history.push('/admin/post/list')
            } else {
                message.error('ERROR');
            }
        })
    }

    function handleChangeCategory(value: number[]) {
        setListCategoryId(value)
    }

    function handleChangeType(value: number) {
        setPost({ ...post, type: value })
    }

    const handleUpload = (info: any) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            setPost({ ...post, thumbnail: info.file.response.fileUrl })
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    const handleRemoveFile = (file: any) => {
        axios.delete(`/api/post/file/delete/${file.uid}`).then(x => {
            if (x.data.succeeded) {
                setDefaultFileList(defaultFileList.filter((x: any) => x.uid !== file.uid))
            } else {
                message.error(x.data.message)
            }
        })
    }

    const dummyRequest = async (file: any) => {
        let formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('/api/post/upload', formData);
        let mapData = {
            uid: response.data.attach.id,
            name: response.data.attach.name,
            status: 'done',
            url: `/files/${response.data.attach.id}${response.data.attach.extension}`
        }
        setDefaultFileList([...defaultFileList, mapData])
        message.success(`${file.name} file uploaded successfully.`);
    }

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        beforeUpload: dummyRequest,
        fileList: defaultFileList,
        onRemove: handleRemoveFile
    };

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

    return (
        <Row className="p-4 bg-white" gutter={16}>
            <Col span={18}>
                <div className="mb-1">Tiêu đề</div>
                <Input value={post.title} onChange={(e: any) => setPost({ ...post, title: e.target.value })} className="mb-2" />
                <div className="mb-1">Liên kết cố định <i>(tùy chọn)</i></div>
                <Input value={post.url} onChange={(e: any) => setPost({ ...post, url: e.target.value })} className="mb-2" />
                <div className="mb-1">Mô tả</div>
                <Input.TextArea value={post.description} onChange={(e: any) => setPost({ ...post, description: e.target.value })} className="mb-2" />
                <div className="mb-1">Nội dung</div>
                <div className="mb-2">
                    <QuillToolbar />
                    <ReactQuill
                        ref={reactQuillRef}
                        value={value}
                        onChange={setValue}
                        className="border"
                        theme="snow"
                        modules={{
                            toolbar: {
                                container: "#toolbar",
                                handlers: {
                                    image: imageHandler
                                },
                                history: {
                                    delay: 500,
                                    maxStack: 100,
                                    userOnly: true
                                }
                            }
                        }}
                        formats={formats}
                        style={{
                            height: 400
                        }}
                    />
                </div>
                <Space>
                    <Button type="primary" onClick={handleSave}>Lưu lại</Button>
                    <Button onClick={() => history.push('/admin/post/list')}>Hủy</Button>
                </Space>
            </Col>
            <Col span={6}>
                <div className="mb-1">Loại</div>
                <Select
                    placeholder="Vui lòng chọn"
                    onChange={handleChangeType}
                    className="w-full mb-2"
                    value={post.type}
                >
                    {
                        ListPostType.map((value, index) => (
                            <Option key={index} value={value.value}>{value.name}</Option>
                        ))
                    }
                </Select>

                <div className="mb-1">Danh mục</div>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Vui lòng chọn"
                    onChange={handleChangeCategory} className="mb-2"
                    value={listCategoryId} optionFilterProp="children" filterOption={(input, option: any) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        listCategory?.map((category: any) => (
                            <Option key={category.id} value={category.id}>{category.name}</Option>
                        ))
                    }
                </Select>

                <div className="mb-1">Ảnh đại diện</div>
                <div className="mb-2 flex">
                    <Input value={post?.thumbnail} onChange={(e: any) => setPost({ ...post, thumbnail: e.target.value })} className="flex-grow" />
                    <Upload action="/api/partner/upload" onChange={handleUpload} maxCount={1} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Tải lên</Button>
                    </Upload>
                </div>
                <img src={post?.thumbnail || 'https://placehold.jp/350x200.png'} alt="thumbnail" className="w-full object-fit-cover h-64" />

                <div className="mb-1">Ngày xuất bản</div>
                <div className="mb-2">
                    <DatePicker onChange={(date, dateString) => setPost({ ...post, modifiedDate: date?.toDate() })} value={moment(post?.modifiedDate)} />
                </div>

                <div className="mb-1">Tệp tin đính kèm</div>
                <div className="mb-2">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Chọn tệp tin đính kèm</p>
                        <p className="ant-upload-hint">Lựa chọn tệp tin để tải lên. Hỗ trợ các định dạng thông dụng .docx, .xlsx, .pdf</p>
                    </Dragger>
                </div>
            </Col>
        </Row >
    )
}

export default PostSetting