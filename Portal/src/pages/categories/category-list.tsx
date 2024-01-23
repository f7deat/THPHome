import { Button, Checkbox, Col, Drawer, Empty, Form, Input, message, Modal, Popconfirm, Row, Select, Space, Switch, Table, } from "antd";
import React, { useEffect, useState } from "react";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    FolderOutlined,
    ArrowLeftOutlined,
    SearchOutlined
} from "@ant-design/icons";
import { request, useIntl } from "@umijs/max";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { language } from "@/utils/format";

const { TextArea } = Input;
const { Option } = Select;

const CategoryList = () => {
    const [categories, setCategories] = useState<any>([]);
    const [visible, setVisible] = useState(false);
    const [posts, setPosts] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [id, setId] = useState(0);
    const [category, setCategory] = useState<any>();
    const [displayOnHome, setDisplayOnHome] = useState<boolean>(false);

    const intl = useIntl();

    const getList = (id: number) => {
        request(`category/get-list/${id}?language=${language(intl.locale)}`).then((response) => {
            setCategories(response);
        });
    }

    useEffect(() => {
        getList(id)
    }, [id]);

    function drawPosts(record: any) {
        setCategory(record);
        request(`post/get-in-category/${record.id}`)
            .then((response) => {
                setPosts(response);
                setVisible(!visible);
            });
    }

    function update(item: any) {
        request(`category/update`, {
            data: item,
            method: 'POST'
        }).then(response => {
            message.success(response.message);
            getList(id);
            setIsModalVisible(false);
        })
    }

    const handleOk = () => {
        category.language = language(intl.locale)
        category.isDisplayOnHome = displayOnHome;
        if (category.id) {
            update(category);
        } else {
            request(`category/add`, {
                method: 'POST',
                data: category
            }).then((response) => {
                if (response.succeeded) {
                    message.success(response.message);
                    getList(id);
                    setIsModalVisible(false);
                } else {
                    message.error(response.message);
                }
            });
        }
    };

    const handleAdd = () => {
        setDisplayOnHome(false)
        setIsModalVisible(true);
        setCategory({})
    };

    const handleEdit = (category: any) => {
        setDisplayOnHome(category.isDisplayOnHome)
        setCategory(category);
        setIsModalVisible(true);
    };

    function handleRemove(id: number) {
        request(`category/delete/${id}`, {
            method: 'POST'
        }).then(response => {
            if (response.succeeded) {
                getList(0);
                message.success('Success!');
            } else {
                message.error(response.message)
            }
        })
    }

    function handleRemoveFromCategory(categoryId: number, postId: number) {
        request(`category/remove-post`, {
            method: 'POST',
            data: { categoryId, postId }
        }).then(response => {
            if (response.succeeded) {
                message.success('succeeded!');
            }
        })
    }

    function handleChangeStatus(record: any, checked: boolean) {
        checked ? record.status = 1 : record.status = 0;
        request(`category/active`, {
            method: 'POST',
            data: record
        }).then(response => {
            message.success(response.message);
            getList(id);
        })
    }

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: "Tên danh mục",
            render: (record: any) => (
                <div>
                    <div onClick={() => setId(record.id)} className="font-bold cursor-pointer">
                        {record.name}
                    </div>
                    <div className="text-gray-500">
                        {record.description}
                    </div>
                </div>
            )
        },
        {
            title: 'Normalized Name',
            dataIndex: 'normalizeName'
        },
        {
            title: "Status",
            render: (record: any) => (
                <Switch size="small" defaultChecked={record.status === 1} onChange={(e: boolean) => handleChangeStatus(record, e)} />
            ),
        },
        {
            title: "",
            render: (record: any) => (
                <Space>
                    <Button
                        type="primary"
                        size="small"
                        icon={<FolderOutlined />}
                        onClick={() => drawPosts(record)}
                    ></Button>
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    ></Button>
                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleRemove(record.id)}
                    >
                        <Button type="primary"
                        size="small" danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const postColumns = [
        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "",
            render: (record: any) => (
                <Space>
                    <Button type="primary" icon={<EditOutlined />}></Button>
                    <Popconfirm
                        title="Are you sure to delete from this category?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleRemoveFromCategory(id, record.id)}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    function onChange(value: any) {
        setCategory((prevState: any) => ({ ...prevState, parrentId: value }));
    }

    return (
        <PageContainer extra={<Space className="mb-2">
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                Tạo mới
            </Button>
            <Button icon={<ArrowLeftOutlined />} onClick={() => setId(0)} hidden={id === 0}>
                Back
            </Button>
        </Space>}>

            <ProTable
                search={{
                    layout: 'vertical'
                }}
                dataSource={categories}
                columns={columns}
                rowKey="id"
                rowSelection={{}}
            />
            <Drawer
                title={category?.name}
                placement="right"
                closable={false}
                onClose={() => setVisible(!visible)}
                visible={visible}
                width={960}
            >
                <Space className="mb-3">
                    <Input />
                    <Button type="primary" icon={<SearchOutlined />}></Button>
                </Space>
                {
                    <ProTable
                        dataSource={posts}
                        columns={postColumns}
                        rowSelection={{}}
                        rowKey="id"
                    />
                }
            </Drawer>
            <Modal
                title={category?.name || "New Category"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
                width={600}
            >
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <div>Tên danh mục:</div>
                            <Input className="mb-2" value={category?.name} onChange={(e: any) => setCategory((prevState: any) => ({ ...prevState, name: e.target.value }))} />
                            <div>Icon:</div>
                            <Input className="mb-2" value={category?.icon} onChange={(e: any) => setCategory((prevState: any) => ({ ...prevState, icon: e.target.value }))} />
                            <Form.Item label="Normalize Name" tooltip="Dùng làm key cho đa ngôn ngữ" rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập!'
                                }
                            ]}>
                                <Input className="mb-2" value={category?.url} onChange={(e: any) => setCategory((prevState: any) => ({ ...prevState, normalizeName: e.target.value }))} />
                            </Form.Item>
                            <div>Danh mục cha:</div>
                            <Select
                                showSearch
                                placeholder="Select category"
                                optionFilterProp="children"
                                onChange={onChange}
                                className="w-full mb-2"
                                value={category?.parrentId}
                                allowClear
                            >
                                <Option value={-1} key={-1}>Trống</Option>
                                {
                                    categories && categories?.map((value: any) => (
                                        <Option value={value.id} key={value.id}>
                                            {value.name}
                                        </Option>
                                    ))
                                }
                            </Select>
                            <div>Mô tả:</div>
                            <TextArea className="mb-2" value={category?.description} onChange={(e: any) => setCategory((prevState: any) => ({ ...prevState, description: e.target.value }))} />
                        </Col>
                        <Col span={12}>
                            <div>Thumbnail:</div>
                            <Input className="mb-2" value={category?.thumbnail} onChange={(e: any) => setCategory((prevState: any) => ({ ...prevState, thumbnail: e.target.value }))} />
                            {category?.thumbnail ? (
                                <img
                                    src={category?.thumbnail}
                                    alt={category?.name}
                                    className="w-full object-fit-cover"
                                    height={138}
                                />
                            ) : (
                                <Empty />
                            )}
                            <div>
                                <Checkbox onChange={(e) => setDisplayOnHome(e.target.checked)} checked={displayOnHome}>Hiển thị trên trang chủ</Checkbox>
                            </div>

                        </Col>
                    </Row>
                </Form>
            </Modal>
        </PageContainer>
    );
};
export default CategoryList