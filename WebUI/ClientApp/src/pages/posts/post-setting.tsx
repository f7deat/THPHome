import { Button, Col, DatePicker, Input, message, Row, Select, Space, Upload } from 'antd'
import axios from 'axios'
import {
    UploadOutlined,
    InboxOutlined
} from "@ant-design/icons";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ListPostType } from '../../enum/post-enum'
import PostTag from './components/post-tag'
import IPost from './interfaces/post-model'
import moment from 'moment';
import Dragger from 'antd/lib/upload/Dragger';

const PostSetting = () => {

    const { Option } = Select;

    const history = useHistory();
    const { id } = useParams<any>()

    const [editorState, setEditorState] = useState<any>(null)
    const [post, setPost] = useState<IPost>({})
    const [listCategory, setListCategory] = useState<any>()
    const [listCategoryId, setListCategoryId] = useState<any>([])
    const [tags, setTags] = useState<string[]>([])
    const [defaultFileList, setDefaultFileList] = useState<any>([])

    const initCallback = useCallback(() => {
        if (id) {
            axios.get(`/api/post/get/${id}`).then(response => {
                setPost(response.data)
                setEditorState(BraftEditor.createEditorState(response.data.content));
                if (response.data.tags) {
                    setTags((response.data.tags).split(','))
                }
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

    const handleEditorChange = (editorState: any) => {
        setEditorState(editorState)
    }

    const handleSave = () => {
        if (id) {
            handleEdit()
        } else {
            handleAdd()
        }
    }

    const handleAdd = () => {
        const htmlContent = editorState?.toHTML();
        post.content = htmlContent;
        if (tags.length > 0) {
            post.tags = tags.join(',');
        }
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
                history.push('/admin/post/list')
            } else {
                message.error('ERROR');
            }
        })
    }

    const handleEdit = () => {
        post.content = editorState?.toHTML();
        if (tags.length > 0) {
            post.tags = tags.join(',')
        }
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

    const handleAttachFile = (info: any) => {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            let mapData = {
                uid: info.file.response.attach.id,
                name: info.file.response.attach.name,
                status: 'done',
                url: `/files/${info.file.response.attach.id}${info.file.response.attach.extension}`
            }
            setDefaultFileList([...defaultFileList, mapData])
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
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
                    <BraftEditor
                        value={editorState}
                        onChange={handleEditorChange}
                        className="border"
                        language="vi-vn"
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

                <div className="mb-1">Thumbnail</div>
                <div className="mb-2 flex">
                    <Input value={post?.thumbnail} onChange={(e: any) => setPost({ ...post, thumbnail: e.target.value })} className="flex-grow" />
                    <Upload action="/api/partner/upload" onChange={handleUpload} maxCount={1} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
                <img src={post?.thumbnail || 'https://placehold.jp/350x200.png'} alt="thumbnail" className="w-full object-fit-cover h-64" />

                <div className="mb-1">Ngày xuất bản</div>
                <div className="mb-2">
                    <DatePicker onChange={(date, dateString) => setPost({ ...post, modifiedDate: date?.toDate() })} value={moment(post?.modifiedDate)} />
                </div>

                <div className="mb-1">Tệp tin đính kèm</div>
                <div className="mb-2">
                    <Dragger action="/api/post/upload" onChange={handleAttachFile} fileList={defaultFileList} onRemove={handleRemoveFile}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Chọn tệp tin đính kèm</p>
                        <p className="ant-upload-hint">Lựa chọn tệp tin để tải lên. Hỗ trợ các định dạng thông dụng .docx, .xlsx, .pdf</p>
                    </Dragger>
                </div>

                <div className="py-4">
                    <PostTag setTags={setTags} tags={tags} />
                </div>
            </Col>
        </Row >
    )
}

export default PostSetting