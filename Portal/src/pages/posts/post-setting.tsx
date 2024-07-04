import { Button, Col, Form, Input, message, Row, Upload, UploadProps, Image, Empty, Switch } from 'antd'
import {
    UploadOutlined,
    InboxOutlined,
    LeftOutlined
} from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from 'react'
import { ListPostType, PostType } from '../../enum/post-enum'
import IPost from './interfaces/post-model'
import MyEditor from '../../components/my-editor';
import { useParams, useIntl, getLocale, history } from '@umijs/max';
import { request } from '@umijs/max';
import { PageContainer, ProCard, ProForm, ProFormDatePicker, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea, ProFormTreeSelect } from '@ant-design/pro-components';
import { language } from '@/utils/format';
import { apiCategoryTreeData } from '@/services/categoy';
import { PostStatus } from '@/utils/enum';

const { Dragger } = Upload;

const PostSetting = () => {

    const form = useRef<ProFormInstance>();

    const { id } = useParams<any>();

    const [post, setPost] = useState<IPost>({})
    const [defaultFileList, setDefaultFileList] = useState<any>([])
    const [previewImage, setPreviewImage] = useState<string>('https://dhhp.edu.vn/files/1a5acea5-4941-4140-a8f5-56a1d5e4eabd.jpg');
    const [loading, setLoading] = useState<boolean>(false);
    const intl = useIntl();

    const initCallback = useCallback(() => {
        if (id) {
            request(`post/get/${id}`).then(response => {
                setPost(response);
                form.current?.setFields([
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
                        name: 'modifiedDate',
                        value: response.modifiedDate
                    },
                    {
                        name: 'description',
                        value: response.description
                    },
                    {
                        name: 'status',
                        value: response.status
                    }
                ])
                setPreviewImage(response.thumbnail);
            })
            request(`post/get-list-category-id-in-post/${id}`).then(response => {
                form.current?.setFieldValue('categories', response);
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
        initCallback();
    }, []);

    const handleAdd = (values: any) => {
        let attachments = defaultFileList.map(function (x: any) {
            return {
                id: x.uid
            }
        })
        request('post/add', {
            method: 'POST',
            data: {
                post,
                listCategoryId: values.categories,
                attachments
            }
        }).then(response => {
            if (response.succeeded) {
                message.success('Lưu thành công!');
                if (values.type === PostType.NEWS) {
                    history.push(`/post/article`);
                }
                if (values.type === PostType.NOTIFICATION) {
                    history.push(`/post/notification`);
                }
                if (values.type === PostType.PAGE) {
                    history.push(`/post/page`);
                }
                if (values.type === PostType.ADMISSION) {
                    history.push(`/post/admission`);
                }
            } else {
                message.error('ERROR');
            }
            setLoading(false);
        })
    }

    const handleEdit = (values: any) => {
        let attachments = defaultFileList.map(function (x: any) {
            return {
                id: x.uid
            }
        })
        request(`post/update`, {
            method: 'POST',
            data: {
                post,
                listCategoryId: values.categories,
                attachments
            }
        }).then(response => {
            if (response.succeeded) {
                message.success('Lưu thành công!');
            } else {
                message.error('ERROR');
            }
            setLoading(false);
        })
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
        post.description = values.description;
        post.modifiedDate = values.modifiedDate;
        post.status = values.status;
        setLoading(true);
        if (id) {
            handleEdit(values);
        } else {
            handleAdd(values);
        }
    }

    return (
        <PageContainer extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProCard>
                <ProForm onFinish={onFinish} layout="vertical" formRef={form} loading={loading}>
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
                            <ProFormTextArea label="Mô tả" name="description" rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mô tả bài viết'
                                },
                                {
                                    max: 150,
                                    message: 'Mô tả tối đa 150 ký tự'
                                }
                            ]} />

                            <MyEditor name="content" label="Nội dung" initialValue={post?.content} rules={[{
                                required: true,
                                message: 'Vui lòng nhập nội dung bài viết'
                            }]} />
                        </Col>
                        <Col span={6}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <ProFormSelect allowClear={false} label="Loại" name="type" initialValue={PostType.NEWS} rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn loại bài viết'
                                        }
                                    ]} options={ListPostType} />
                                </Col>
                                <Col span={12}>
                                    <ProFormText label="Ngôn ngữ" tooltip="Chuyển ngôn ngữ trên thanh công cụ" initialValue={getLocale()} name="language" disabled />
                                </Col>
                            </Row>

                            <ProFormTreeSelect label="Danh mục" name="categories"
                                request={(params) => apiCategoryTreeData({
                                    ...params,
                                    language: language(intl.locale)
                                })}
                                fieldProps={{
                                    showSearch: true,
                                    filterTreeNode: (input, treeNode: any) =>
                                        (treeNode.label as string)?.toLowerCase().includes(input.toLowerCase()),
                                    multiple: true

                                }}
                            />

                            <ProFormText label="Ảnh đại diện" name='thumbnail' initialValue="https://dhhp.edu.vn/files/1a5acea5-4941-4140-a8f5-56a1d5e4eabd.jpg" rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn ảnh đại diện'
                                }
                            ]} fieldProps={{
                                suffix: <Upload beforeUpload={(file) => {
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
                                            form.current?.setFieldValue('thumbnail', response.url);
                                            setPreviewImage(response.url)
                                        })
                                        return false;
                                    }
                                }} maxCount={1} showUploadList={false}>
                                    <Button icon={<UploadOutlined />} size='small' type='dashed'>Tải lên</Button>
                                </Upload>
                            }} />

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
                            <Row gutter={16}>
                                <Col md={12}>
                                    <ProFormDatePicker name="modifiedDate" label="Ngày xuất bản" width="xl" />
                                </Col>
                                <Col md={12}>
                                    <ProFormSelect name="status" label="Trạng thái"
                                        required
                                        initialValue={PostStatus.DRAFT}
                                        allowClear={false}
                                        options={[
                                            {
                                                label: 'Bản nháp',
                                                value: PostStatus.DRAFT
                                            },
                                            {
                                                label: 'Xuất bản',
                                                value: PostStatus.PUBLISH
                                            }
                                        ]}
                                    />
                                </Col>
                            </Row>
                            <div className="mb-1">Tệp tin đính kèm</div>
                            <div className="mb-4">
                                <Dragger {...props}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Chọn tệp tin đính kèm</p>
                                    <p className="ant-upload-hint">Hỗ trợ các định dạng thông dụng .docx, .xlsx, .pdf</p>
                                </Dragger>
                            </div>
                            <div className='flex gap-2 items-center'><Switch checked /> Chia sẻ lên Zalo OA</div>
                        </Col>
                    </Row>
                </ProForm>
            </ProCard>
        </PageContainer>
    )
}

export default PostSetting