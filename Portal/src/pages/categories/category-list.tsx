import { Button, Checkbox, Col, Drawer, Empty, Form, Input, message, Modal, Popconfirm, Row, Space, Switch } from "antd";
import { useRef, useState } from "react";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    FolderOutlined,
    ArrowLeftOutlined
} from "@ant-design/icons";
import { Link, request, useIntl } from "@umijs/max";
import { ActionType, PageContainer, ProColumnType, ProFormSelect, ProTable } from "@ant-design/pro-components";
import { language } from "@/utils/format";
import { apiGetCategories, apiGetParentCategoryOptions, apiGetPostsCategory } from "@/services/categoy";

const { TextArea } = Input;

const CategoryList = () => {
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [id, setId] = useState(0);
    const [category, setCategory] = useState<any>();
    const [displayOnHome, setDisplayOnHome] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const postActionRef = useRef<ActionType>();

    const intl = useIntl();

    function update(item: any) {
        request(`category/update`, {
            data: item,
            method: 'POST'
        }).then(response => {
            message.success(response.message);
            actionRef.current?.reload();
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
                    actionRef.current?.reload();
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
                actionRef.current?.reload();
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
        if (checked) {
            record.status = 1;
        } else {
            record.status = 0;
        }
        request(`category/active`, {
            method: 'POST',
            data: record
        }).then(response => {
            message.success(response.message);
            actionRef.current?.reload();
        })
    }

    const columns: ProColumnType<any>[] = [
        {
            title: "Tên danh mục",
            dataIndex: 'name'
        },
        {
            title: "Số bài đăng",
            dataIndex: 'count',
            search: false,
            width: 100,
            align: 'right',
            valueType: 'digit'
        },
        {
            title: "Trạng thái",
            render: (record: any) => (
                <Switch size="small" defaultChecked={record.status === 1} onChange={(e: boolean) => handleChangeStatus(record, e)} />
            ),
            width: 100,
            align: 'center',
            search: false
        },
        {
            title: "Tác vụ",
            valueType: 'option',
            render: (dom, record) => (
                <Space>
                    <Button
                        type="primary"
                        size="small"
                        icon={<FolderOutlined />}
                        onClick={() => {
                            setCategory(record);
                            setVisible(true);
                            postActionRef.current?.reload();
                        }}
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
            width: 100
        },
    ];

    const postColumns: ProColumnType<any>[] = [
        {
            title: "#",
            valueType: 'indexBorder',
            width: 50
        },
        {
            title: "Bài đăng",
            dataIndex: "title",
        },
        {
            title: "Tác vụ",
            render: (dom, record: any) => [
                <Link key="edit" to={`/post/setting/${record.id}`}>
                <Button type="primary" icon={<EditOutlined />} size="small"></Button>
                </Link>,
                <Popconfirm
                    key="delete"
                    title="Xác nhận xóa?"
                    onConfirm={() => handleRemoveFromCategory(id, record.id)}
                >
                    <Button type="primary" danger icon={<DeleteOutlined />} size="small"></Button>
                </Popconfirm>
            ],
            valueType: 'option'
        },
    ];

    return (
        <PageContainer extra={<Space className="mb-2">
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                Tạo mới
            </Button>
            <Button icon={<ArrowLeftOutlined />} onClick={() => setId(0)} hidden={id === 0}>
                Quay lại
            </Button>
        </Space>}>

            <ProTable
                search={{
                    layout: 'vertical'
                }}
                columns={columns}
                rowKey="id"
                request={(params) => apiGetCategories({
                    ...params,
                    language: language(intl.locale)
                })}
            />
            <Drawer
                title={category?.name}
                placement="right"
                closable={false}
                onClose={() => setVisible(!visible)}
                open={visible}
                width={960}
            >
                <ProTable
                    ghost
                    search={{
                        layout: 'vertical'
                    }}
                    actionRef={postActionRef}
                    request={(params) => apiGetPostsCategory({
                        ...params,
                        language: language(intl.locale),
                        categoryId: category?.id
                    })}
                    columns={postColumns}
                    rowKey="id"
                />
            </Drawer>
            <Modal
                title={category?.name || "Danh mục"}
                open={isModalVisible}
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
                            <ProFormSelect label="Danh mục cha" name="parentId"
                                request={(params) => apiGetParentCategoryOptions({
                                    ...params,
                                    language: language(intl.locale)
                                })}
                            />
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