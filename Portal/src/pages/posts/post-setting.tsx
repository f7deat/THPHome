import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Space, Spin, Upload, UploadProps, Image, Empty } from 'antd'
import {
    UploadOutlined,
    InboxOutlined
} from "@ant-design/icons";
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ListPostType, PostType } from '../../enum/post-enum'
import IPost from './interfaces/post-model'
import MyEditor from '../../components/my-editor';
import { useParams, history, useIntl, getLocale } from '@umijs/max';
import { request } from '@umijs/max';
import dayjs from 'dayjs'
import { PageContainer } from '@ant-design/pro-components';
import { language } from '@/utils/format';

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
    const [previewImage, setPreviewImage] = useState<string>('');
    const intl = useIntl();

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
                    },
                    {
                        name: 'thumbnail',
                        value: response.thumbnail
                    },
                    {
                        name: 'language',
                        value: response.language
                    }
                ])
                setPreviewImage(response.thumbnail);
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
        request(`category/get-list?language=${language(intl.locale)}`).then(response => {
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
                history.push(`/post/list?type=${post.type}&language=${language(intl.locale)}`);
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
                history.push(`/post/list?type=${post.type}&language=${language(intl.locale)}`)
            } else {
                message.error('ERROR');
            }
            setLoading(false);
        })
    }

    function handleChangeCategory(value: number[]) {
        setListCategoryId(value)
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
        post.thumbnail = values.thumbnail;
        post.language = language(intl.locale);
        setLoading(true);
        if (id) {
            handleEdit()
        } else {
            handleAdd()
        }
    }

    return (
        <PageContainer>
            <Card>
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
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Loại" name="type" initialValue={PostType.NEWS} rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn loại bài viết'
                                        }
                                    ]}>
                                        <Select options={ListPostType} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Ngôn ngữ" tooltip="Chuyển ngôn ngữ trên thanh công cụ">
                                        <Input disabled value={getLocale()} />
                                    </Form.Item>
                                </Col>
                            </Row>

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

                            <div className='flex gap-2'>
                                <Form.Item label="Ảnh đại diện" name='thumbnail' style={{
                                    width: '100%'
                                }}>
                                    <Input suffix={<Upload beforeUpload={(file) => {
                                        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                                        if (!isJPG) {
                                            message.error('You can only upload JPG or PNG file!');
                                            return false;
                                        } else {
                                            const formData = new FormData();
                                            formData.append('file', file);
                                            request('file/image/upload', {
                                                method: 'POST',
                                                data: formData
                                            }).then(response => {
                                                if (!response.succeeded) {
                                                    message.error(response.message);
                                                    return false;
                                                }
                                                form.setFieldValue('thumbnail', response.url);
                                                setPreviewImage(response.url)
                                            })
                                            return false;
                                        }
                                    }} maxCount={1} showUploadList={false}>
                                        <Button icon={<UploadOutlined />} size='small'>Tải lên</Button>
                                    </Upload>} />
                                </Form.Item>

                            </div>
                            <div className='mb-4'>
                                {
                                    previewImage ? (
                                        <Image src={previewImage} height={180} wrapperClassName='w-full h-40' style={{
                                            width: '100%',
                                            objectFit: 'cover'
                                        }} />
                                    ) : (
                                        <div className='h-40 border flex items-center justify-center'>
                                            <Empty />
                                        </div>
                                    )
                                }
                            </div>

                            <div className="mb-1">Ngày xuất bản</div>
                            <div className="mb-2">
                                <DatePicker onChange={(date) => setPost({ ...post, modifiedDate: date?.toDate() })} value={dayjs(post?.modifiedDate)} />
                            </div>

                            <div className="mb-1">Tệp tin đính kèm</div>
                            <div className="mb-2">
                                <Dragger {...props}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Chọn tệp tin đính kèm</p>
                                    <p className="ant-upload-hint">Hỗ trợ các định dạng thông dụng .docx, .xlsx, .pdf</p>
                                </Dragger>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </PageContainer>
    )
}

export default PostSetting