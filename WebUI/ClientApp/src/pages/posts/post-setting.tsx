import { Button, Col, Input, message, Row, Select, Space } from 'antd'
import axios from 'axios'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ListPostType } from '../../enum/post-enum'
import PostTag from './components/post-tag'
import IPost from './interfaces/post-model'

const PostSetting = () => {

    const { Option } = Select;

    const history = useHistory();
    const { id } = useParams<any>()

    const [editorState, setEditorState] = useState<any>(null)
    const [post, setPost] = useState<IPost>({})
    const [listCategory, setListCategory] = useState<any>()
    const [listCategoryId, setListCategoryId] = useState<any>([])
    const [tags, setTags] = useState<string[]>([])

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
        axios.post('/api/post/add', {
            post,
            listCategoryId
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
        axios.post(`/api/post/update`, {
            post,
            listCategoryId
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
        setPost({...post, type: value})
    }

    return (
        <Row className="p-4 bg-white" gutter={16}>
            <Col span={18}>
                <div className="mb-1">Title</div>
                <Input value={post.title} onChange={(e: any) => setPost({ ...post, title: e.target.value })} className="mb-2" />
                <div className="mb-1">Url</div>
                <Input value={post.url} onChange={(e: any) => setPost({ ...post, url: e.target.value })} className="mb-2" />
                <div className="mb-1">Description</div>
                <Input.TextArea value={post.description} onChange={(e: any) => setPost({ ...post, description: e.target.value })} className="mb-2" />
                <div className="mb-1">Content</div>
                <div className="mb-2">
                    <BraftEditor
                        value={editorState}
                        onChange={handleEditorChange}
                        className="border"
                    />
                </div>
                <Space>
                    <Button type="primary" onClick={handleSave}>Save</Button>
                    <Button onClick={() => history.push('/admin/post/list')}>Cancel</Button>
                </Space>
            </Col>
            <Col span={6}>
                <div className="mb-1">Type</div>
                <Select
                    placeholder="Please select"
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
                
                <div className="mb-1">Category</div>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={handleChangeCategory} className="mb-2"
                    value={listCategoryId}
                >
                    {
                        listCategory?.map((category: any) => (
                            <Option key={category.id} value={category.id}>{category.name}</Option>
                        ))
                    }
                </Select>
                
                <div className="mb-1">Thumbnail</div>
                <Input value={post.thumbnail} onChange={(e: any) => setPost({ ...post, thumbnail: e.target.value })} className="mb-2" />

                {
                    post.thumbnail && <img src={post.thumbnail} alt="thumbnail" className="w-full object-fit-cover h-64"/>
                }

                <div className="py-4">
                    <PostTag setTags={setTags} tags={tags} />
                </div>
            </Col>
        </Row >
    )
}

export default PostSetting