import { Button, Checkbox, Col, Drawer, Empty, Input, message, Modal, Popconfirm, Row, Select, Space, Switch, Table, } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    FolderOutlined,
    ArrowLeftOutlined,
    SearchOutlined
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

export const CategoryList = () => {
    const [categories, setCategories] = useState<any>([]);
    const [visible, setVisible] = useState(false);
    const [posts, setPosts] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [id, setId] = useState(0);
    const [category, setCategory] = useState<any>();
    const [displayOnHome, setDisplayOnHome] = useState<boolean>(false);

    const getList = (id: number) => {
        axios.get(`/api/category/get-list/${id}`).then((response) => {
            setCategories(response.data);
        });
    }

    useEffect(() => {
        getList(id)
    }, [id]);

    function drawPosts(record: any) {
        setCategory(record);
        axios
            .get(`/api/post/get-in-category/${record.id}`)
            .then((response) => {
                setPosts(response.data);
                setVisible(!visible);
            });
    }

    function update(item:any) {
        axios.post(`/api/category/update`, item).then(response => {
            message.success(response.data.message);
            getList(id);
            setIsModalVisible(false);
        })
    }

    const handleOk = () => {
        category.isDisplayOnHome = displayOnHome;
        if (category.id) {
            update(category);
        } else {
            axios.post(`/api/category/add`, category).then((response) => {
                if (response.data.succeeded) {
                    message.success(response.data.message);
                    getList(id);
                    setIsModalVisible(false);
                } else {
                    message.error(response.data.error);
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
        axios.post(`/api/category/delete/${id}`).then(response => {
            if (response.data.succeeded) {
                getList(0);
                message.success('Success!');
            } else {
                message.error(response.data.message)
            }
        })
    }

    function handleRemoveFromCategory(categoryId: number, postId: number) {
        axios.post(`/api/category/remove-post`, { categoryId, postId }).then(response => {
            if (response.data.succeeded) {
                message.success('succeeded!');
            }
        })
    }

    function handleChangeStatus(record: any, checked: boolean) {
        checked ? record.status = 1 : record.status = 0;
        update(record);
    }

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: "Name",
            render: (record: any) => (
                <div>
                    <div onClick={() => setId(record.id)} className="font-bold cursor-pointer">
                        {record.name}
                    </div>
                    <div className="text-gray-500">
                        {record.description}
                    </div>
                </div>
            ),
            width: '50%'
        },
        {
            title: "Status",
            render: (record: any) => (
                <Switch defaultChecked={record.status === 1} onChange={(e: boolean) => handleChangeStatus(record, e)}/>
            ),
        },
        {
            title: "",
            render: (record: any) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<FolderOutlined />}
                        onClick={() => drawPosts(record)}
                    ></Button>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    ></Button>
                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleRemove(record.id)}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />}></Button>
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
        <div className="p-4 bg-white">
            <Space className="mb-2">
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    New Category
                </Button>
                <Button icon={<ArrowLeftOutlined />} onClick={() => setId(0)} hidden={id === 0}>
                    Back
                </Button>
            </Space>
            <Table
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
                    <Table
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
                <Row gutter={16}>
                    <Col span={12}>
                        <div>Name:</div>
                        <Input className="mb-2" value={category?.name} onChange={(e: any) => setCategory((prevState: any) => ({ ...prevState, name: e.target.value }))} />
                        <div>Icon:</div>
                        <Input className="mb-2" value={category?.icon} onChange={(e: any) => setCategory((prevState: any) => ({ ...prevState, icon: e.target.value }))} />
                        <div>Normalize Name:</div>
                        <Input className="mb-2" value={category?.url} onChange={(e: any) => setCategory((prevState: any) => ({ ...prevState, normalizeName: e.target.value }))} />
                        <div>Parrent:</div>
                        <Select
                            showSearch
                            placeholder="Select category"
                            optionFilterProp="children"
                            onChange={onChange}
                            filterOption={(input, option) =>
                                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            className="w-full mb-2"
                            value={category?.parrentId}
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
                        <div>Description:</div>
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
            </Modal>
        </div>
    );
};
