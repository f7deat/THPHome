import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Space, Upload, UploadProps } from 'antd'
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
import MyEditor from '../../components/my-editor';
import request from '../../services/request';

const { Dragger } = Upload;

const PostSetting = () => {

    const { Option } = Select;
    const [form] = Form.useForm();

    const history = useHistory();
    const { id } = useParams<any>();

    const [post, setPost] = useState<IPost>({})
    const [listCategory, setListCategory] = useState<any>()
    const [listCategoryId, setListCategoryId] = useState<any>([])
    const [defaultFileList, setDefaultFileList] = useState<any>([])

    const initCallback = useCallback(() => {
        if (id) {
            axios.get(`/api/post/get/${id}`).then(response => {
                setPost(response.data);
                form.setFields([
                    {
                        name: 'content',
                        value: response.data.content
                    },
                    {
                        name: 'title',
                        value: response.data.title
                    },
                    {
                        name: 'type',
                        value: response.data.type
                    }
                ])
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

    const handleAdd = () => {
        let attachments = defaultFileList.map(function (x: any) {
            return {
                id: x.uid
            }
        })
        request.post('/api/post/add', {
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
                history.push(`/admin/post/list?type=${post.type}`)
            } else {
                message.error('ERROR');
            }
        })
    }

    function handleChangeCategory(value: number[]) {
        setListCategoryId(value)
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

    const onFinish = async (values: any) => {
        values.type = Number(values.type);
        post.content = values.content;
        post.type = values.type;
        post.title = values.title;
        if (id) {
            handleEdit()
        } else {
            handleAdd()
        }
    }

    return (
        <Card title="Bài viết">
            <Form onFinish={onFinish} layout="vertical" form={form}>
                <Row gutter={16}>
                    <Col span={18}>
                        <Form.Item name="title" label="Tiêu đề" rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tiêu đề bài viết'
                            }
                        ]}>
                            <Input />
                        </Form.Item>
                        <div className="mb-1">Mô tả</div>
                        <Input.TextArea value={post.description} onChange={(e: any) => setPost({ ...post, description: e.target.value })} className="mb-2" />

                        <Form.Item name="content" label="Nội dung">
                            <MyEditor name="content" />
                        </Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">Lưu lại</Button>
                            <Button onClick={() => history.push('/admin/post/list')}>Hủy</Button>
                        </Space>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Loại" name="type" rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn loại bài viết'
                            }
                        ]}>
                            <Select options={ListPostType} />
                        </Form.Item>

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
                </Row>
            </Form>
        </Card>
    )
}

export default PostSetting