import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Space, Spin, Upload, UploadProps } from 'antd'
import axios from 'axios'
import {
    UploadOutlined,
    InboxOutlined
} from "@ant-design/icons";
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ListPostType } from '../../enum/post-enum'
import IPost from './interfaces/post-model'
import MyEditor from '../../components/my-editor';
import { useParams, history } from '@umijs/max';
import { request } from '@umijs/max';
import dayjs from 'dayjs'

const { Dragger } = Upload;

const PostSetting = () => {

    const { Option } = Select;
    const [form] = Form.useForm();

    const { id } = useParams<any>();

    const [post, setPost] = useState<IPost>({})
    const [listCategory, setListCategory] = useState<any>()
    const [listCategoryId, setListCategoryId] = useState<any>([])
    const [defaultFileList, setDefaultFileList] = useState<any>([])
    const [loading, setLoading] = useState<boolean>();

    const initCallback = useCallback(() => {
        if (id) {
            request(`post/get/${id}`).then(response => {
                setPost(response);
                form.setFields([
                    {
                        name: 'content',
                        value: response.content
                    },
                    {
                        name: 'title',
                        value: response.title
                    },
                    {
                        name: 'type',
                        value: response.type
                    }
                ])
            })
            request(`post/get-list-category-id-in-post/${id}`).then(response => {
                setListCategoryId(response)
            })
            request(`post/attachment-list-in-post/${id}`).then(response => {
                let mapData = response.map(function (x: any) {
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
        request('category/get-list').then(response => {
            setListCategory(response);
        })
    }, [initCallback])

    const handleAdd = () => {
        let attachments = defaultFileList.map(function (x: any) {
            return {
                id: x.uid
            }
        })
        request('post/add', {
            method: 'POST',
            data: {
                post,
                listCategoryId,
                attachments
            }
        }).then(response => {
            if (response.succeeded) {
                history.push(`/post/list?type=${post.type}`);
            } else {
                message.error('ERROR');
            }
            setLoading(false);
        })
    }

    const handleEdit = () => {
        let attachments = defaultFileList.map(function (x: any) {
            return {
                id: x.uid
            }
        })
        request(`post/update`, {
            method: 'POST',
            data: {
                post,
                listCategoryId,
                attachments
            }
        }).then(response => {
            if (response.succeeded) {
                history.push(`/post/list?type=${post.type}`)
            } else {
                message.error('ERROR');
            }
            setLoading(false);
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
        request(`post/file/delete/${file.uid}`, {
            method: 'DELETE'
        }).then(x => {
            if (x.succeeded) {
                setDefaultFileList(defaultFileList.filter((x: any) => x.uid !== file.uid))
            } else {
                message.error(x.message)
            }
        })
    }

    const dummyRequest = async (file: any) => {
        let formData = new FormData();
        formData.append('file', file);
        const response = await request('post/upload', {
            method: 'POST',
            data: formData
        });
        let mapData = {
            uid: response.attach.id,
            name: response.attach.name,
            status: 'done',
            url: `/files/${response.attach.id}${response.attach.extension}`
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
        setLoading(true);
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
                            <Button type="primary" htmlType="submit" loading={loading}>Lưu lại</Button>
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
                            <DatePicker onChange={(date, dateString) => setPost({ ...post, modifiedDate: date?.toDate() })} value={dayjs(post?.modifiedDate)} />
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