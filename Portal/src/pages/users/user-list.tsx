import { Button, Checkbox, Drawer, Input, message, Modal, Popconfirm, Space, Table, Form } from "antd"
import React, { Fragment, useEffect, useRef, useState } from "react"
import {
    DeleteOutlined,
    UsergroupAddOutlined,
    PlusCircleOutlined,
    CheckCircleTwoTone,
    SearchOutlined,
    UserOutlined,
    UserAddOutlined,
    WomanOutlined,
    ManOutlined
} from "@ant-design/icons";
import { Link } from "@umijs/max";
import { request } from "@umijs/max";
import { ActionType, PageContainer, ProColumnType, ProTable } from "@ant-design/pro-components";
import { queryUserList } from "@/services/user";

const UserList = () => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [listRole, setListRole] = useState<any>([])
    const [user, setUser] = useState<any>()
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();

    function openRolePanel(record: any) {
        setUser(record)
        setIsModalVisible(true)
    }

    useEffect(() => {
        if (isModalVisible && user?.id) {
            request('role/get-list').then(response => {
                if (!user) {
                    return;
                }
                request(`user/roles/${user.id}`).then(responseRoleInUser => {
                    response.forEach((value: any) => {
                        let isInRole = responseRoleInUser.find((x: any) => x === value.name)
                        if (isInRole) {
                            value.isInRole = true
                        } else {
                            value.isInRole = false
                        }
                    })
                    setListRole(response)
                })
            })
        }
    }, [isModalVisible, user]);

    function addToRole(roleName: string) {
        if (!user) {
            return message.warning('User not found!');
        }
        request(`user/add-to-role`, {
            data: {
                userId: user.id,
                roleName: roleName
            },
            method: 'POST'
        }).then((response: any) => {
            if (response.succeeded) {
                message.success('Succeeded!');
            } else {
                response.errors.forEach((value: any) => {
                    message.error(value.description);
                })
            }
        })
    }

    const columns : ProColumnType<any>[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 40,
            align: 'center'
        },
        {
            title: '',
            dataIndex: 'avatar',
            valueType: 'avatar',
            width: 30,
            align: 'center',
            search: false
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            render: (dom, entity) => {
                
                if (entity.gender === 0) {
                    return <><ManOutlined className="text-blue-500" /> {dom}</>
                }
                if (entity.gender === 1) {
                    return <><WomanOutlined className="text-red-500" /> {dom}</>
                }
                return dom;
            }
        },
        {
            title: 'Tài khoản',
            dataIndex: 'userName'
        },
        {
            title: 'Email',
            render: (record: any) => {
                if (!record.email) {
                    return <Fragment />
                }
                return (
                    <Space>
                        {
                            record.emailConfirmed ? <CheckCircleTwoTone twoToneColor="#008000" /> : <CheckCircleTwoTone twoToneColor="#ff0000" />
                        }
                        <div>{record.email}</div>
                    </Space>
                )
            }
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber'
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            valueType: 'date',
            width: 100
        },
        {
            title: 'Tác vụ',
            valueType: 'option',
            render: (dom, record: any) => (
                <Space>
                    <Link to={`/user/profile/${record.id}`}><Button icon={<UserOutlined />} size="small" type="primary"></Button></Link>
                    <Button icon={<UsergroupAddOutlined />} onClick={() => openRolePanel(record)} size="small"></Button>
                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={async () => {
                            const response = await request(`user/delete/${record.id}`, {
                                method: 'POST'
                            });
                            if (response.data) {
                                message.success('Xóa thành công!');
                                actionRef.current?.reload();
                            }
                        }}
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />} size="small"></Button>
                    </Popconfirm>
                </Space>
            ),
            width: 100
        }
    ];

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleAdd = () => {
        setDrawerVisible(true)
    }

    const handleSetRole = (role: any) => {
        if (role.isInRole) {
            request(`user/remove-from-role/${role.name}/${user.id}`, {
                method: 'DELETE'
            }).then(response => {
                if (response.succeeded) {
                    message.success('succeeded')
                } else {
                    response.errors.forEach((value: any) => {
                        message.error(value.description)
                    })
                }
            })
        } else {
            addToRole(role.name)
        }
    }

    const roleColumns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Normalized Name',
            dataIndex: 'normalizedName'
        },
        {
            title: 'Is In Role',
            render: (record: any) => <Checkbox checked={record.isInRole} onClick={() => handleSetRole(record)} />
        }
    ];

    const onAddUser = async (values: any) => {
        const response = await request(`user/create`, {
            method: 'POST',
            data: values
        });
        if (response.succeeded) {
            setDrawerVisible(false);
            actionRef.current?.reload();
            message.success('Thêm thành công!');
        }
    }

    return (
        <PageContainer extra={<Button type="primary" icon={<UserAddOutlined />} onClick={handleAdd}>Tạo tài khoản</Button>}>
            <div className="bg-white p-4">
                <ProTable
                ghost
                search={{
                    layout: 'vertical'
                }}
                actionRef={actionRef}
                request={queryUserList}
                columns={columns} rowKey="id" />
            </div>
            <Modal title="Assign Role" open={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
                <div className="p-2 flex justify-between">
                    <Space>
                        <Input />
                        <Button type="primary" icon={<SearchOutlined />}></Button>
                    </Space>
                    <Button icon={<PlusCircleOutlined />} type="primary">New role</Button>
                </div>
                <Table columns={roleColumns} rowKey="id" dataSource={listRole} />
            </Modal>
            <Drawer open={drawerVisible} width={700} onClose={() => setDrawerVisible(false)} title="Người dùng">
                <Form onFinish={onAddUser} layout="vertical">
                    <Form.Item name="name" label="Họ và tên" rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập họ và tên'
                        }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="userName" label="Tên đăng nhập" rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên đăng nhập'
                        }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input />
                    </Form.Item>
                    <Form.Item name="passwordHash" label="Mật khẩu">
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Tạo thành viên</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </PageContainer>
    )
}

export default UserList