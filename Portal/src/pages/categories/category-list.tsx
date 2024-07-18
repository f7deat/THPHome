import { Button, Col, Drawer, Empty, Image, message, Popconfirm, Row, Space, Switch, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    FolderOutlined,
    ArrowLeftOutlined,
    CheckOutlined
} from "@ant-design/icons";
import { Link, request, useIntl } from "@umijs/max";
import { ActionType, ModalForm, PageContainer, ProColumnType, ProFormCheckbox, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components";
import { language } from "@/utils/format";
import { apiGetCategories, apiGetCategory, apiGetParentCategoryOptions, apiGetPostsCategory } from "@/services/categoy";

const CategoryList = () => {
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [id, setId] = useState<number>(0);
    const [category, setCategory] = useState<any>();
    const actionRef = useRef<ActionType>();
    const postActionRef = useRef<ActionType>();
    const formRef = useRef<ProFormInstance>();
    const [thumbnail, setThumbnail] = useState<string>('');

    useEffect(() => {
        if (id) {
            apiGetCategory(id).then(response => {
                formRef.current?.setFields([
                    {
                        name: 'id',
                        value: response.id
                    },
                    {
                        name: 'name',
                        value: response.name
                    },
                    {
                        name: 'icon',
                        value: response.icon
                    },
                    {
                        name: 'description',
                        value: response.description
                    },
                    {
                        name: 'parentId',
                        value: response.description
                    },
                    {
                        name: 'thumbnail',
                        value: response.thumbnail
                    },
                    {
                        name: 'isDisplayOnHome',
                        value: response.isDisplayOnHome
                    }
                ]);
                setThumbnail(response.thumbnail);
            });
        }
    }, [id]);

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

    const handleOk = async (values: any) => {
        values.language = language(intl.locale)
        if (values.id) {
            update(values);
        } else {
            request(`category/add`, {
                method: 'POST',
                data: values
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
        setIsModalVisible(true);
        setCategory({})
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
            title: "Hiển thị trên trang chủ",
            dataIndex: 'isDisplayOnHome',
            render: (dom, entity) => entity.isDisplayOnHome ? <CheckOutlined /> : '',
            width: 180,
            align: 'center',
            search: false
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
            render: (dom, record) => [
                <Tooltip key="detail" title="Chi tiết">
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
                </Tooltip>,
                <Tooltip key="edit" title="Chỉnh sửa">
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setId(record.id);
                            setIsModalVisible(true);
                        }}
                    ></Button>
                </Tooltip>,
                <Popconfirm
                    key="delete"
                    title="Are you sure to delete?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleRemove(record.id)}
                >
                    <Button type="primary"
                        size="small" danger icon={<DeleteOutlined />}></Button>
                </Popconfirm>
            ],
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
            <ModalForm
                formRef={formRef}
                title="Danh mục"
                open={isModalVisible}
                onFinish={handleOk}
                onOpenChange={setIsModalVisible}
            >
                <ProFormText name="id" hidden />
                <Row gutter={16}>
                    <Col span={12}>
                        <ProFormText label="Tên danh mục" name="name" rules={[
                            {
                                required: true
                            }
                        ]} />
                        <ProFormText label="Icon" name="icon" />
                        <ProFormSelect label="Danh mục cha" name="parentId"
                            request={(params) => apiGetParentCategoryOptions({
                                ...params,
                                language: language(intl.locale)
                            })}
                        />
                        <ProFormTextArea label="Mô tả" name='description' />
                    </Col>
                    <Col span={12}>
                        <ProFormText label="Ảnh đại diện" name="thumbnail" />
                        {thumbnail ? (
                            <Image
                                src={thumbnail}
                                className="w-full object-fit-cover"
                                height={138}
                            />
                        ) : (
                            <Empty />
                        )}
                        <ProFormCheckbox name="isDisplayOnHome" label="Hiển thị trên trang chủ" />

                    </Col>
                </Row>
            </ModalForm>
        </PageContainer>
    );
};
export default CategoryList