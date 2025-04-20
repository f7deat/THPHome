import { Button, Checkbox, Input, message, Modal, Popconfirm, Space, Table, Form, Row, Col, Dropdown } from "antd"
import React, { Fragment, useEffect, useRef, useState } from "react"
import {
    DeleteOutlined,
    PlusCircleOutlined,
    CheckCircleTwoTone,
    SearchOutlined,
    UserOutlined,
    UserAddOutlined,
    WomanOutlined,
    ManOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import { request, useAccess } from "@umijs/max";
import { ActionType, DrawerForm, PageContainer, ProColumnType, ProFormSelect, ProFormText, ProTable } from "@ant-design/pro-components";
import { apiDeactiveUser, apiStaffAdd, apiStaffList } from "@/services/user";
import { apiDepartmentOptions } from "@/services/department";
import { UserType } from "@/utils/constants";
import ChangeDepartment from "./components/change-department";

const UserList = () => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [listRole, setListRole] = useState<any>([])
    const [user, setUser] = useState<any>()
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [departments, setDepartments] = useState<any>([]);
    const access = useAccess();

    const reload = () => actionRef.current?.reload();

    useEffect(() => {
        apiDepartmentOptions().then(response => setDepartments(response));
    }, []);

    const onDeactive = async (id: string) => {
        await apiDeactiveUser(id);
        message.success('Vô hiệu hóa tài khoản thành công!');
        actionRef.current?.reload();
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

    const columns: ProColumnType<any>[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 40,
            align: 'center'
        },
        {
            title: <UserOutlined />,
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
            title: 'Đơn vị',
            dataIndex: 'departmentId',
            valueType: 'select',
            fieldProps: {
                options: departments
            },
            render: (dom, entity) => {
                if (access.admin) {
                    return (
                        <div>{dom} <ChangeDepartment userId={entity.id} reload={reload} /></div>
                    )
                }
                return dom;
            }
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
            width: 100,
            search: false
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            valueEnum: {
                0: {
                    text: 'Đang hoạt động',
                    status: 'Success'
                },
                1: {
                    text: 'Đang hoạt động',
                    status: 'Success'
                },
                3: {
                    text: 'Ngừng hoạt động',
                    status: 'Error'
                }
            },
            width: 140
        },
        {
            title: 'Tác vụ',
            valueType: 'option',
            render: (dom, record: any) => [
                <Dropdown key="action" menu={{
                    items: [
                        {
                            key: 'deactive',
                            label: 'Vô hiệu hóa tài khoản',
                            onClick: () => onDeactive(record.id)
                        }
                    ]
                }}>
                    <Button icon={<MoreOutlined />} size="small" type="dashed"></Button>
                </Dropdown>,
                <Popconfirm key="delete"
                    title="Are you sure to delete?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={async () => {
                        await request(`user/delete/${record.id}`, {
                            method: 'POST'
                        });
                        message.success('Xóa thành công!');
                        actionRef.current?.reload();
                    }}
                >
                    <Button type="primary" danger icon={<DeleteOutlined />} size="small" hidden={!access.admin} />
                </Popconfirm>
            ],
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
        values.userType = UserType.Staff;
        await apiStaffAdd(values);
        setDrawerVisible(false);
        actionRef.current?.reload();
        message.success('Thêm thành công!');
    }

    return (
        <PageContainer extra={<Button type="primary" icon={<UserAddOutlined />} onClick={handleAdd} hidden={!access.admin}>Tạo tài khoản</Button>}>
            <ProTable
                search={{
                    layout: 'vertical'
                }}
                actionRef={actionRef}
                request={apiStaffList}
                columns={columns} rowKey="id" />
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
            <DrawerForm open={drawerVisible} width={700} onOpenChange={setDrawerVisible} title="Tài khoản" onFinish={onAddUser}>
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
                <Row gutter={16}>
                    <Col md={12} xs={24}>
                        <ProFormText name="email" label="Email" rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email'
                            }
                        ]} />
                    </Col>
                    <Col md={12} xs={24}>
                        <ProFormText name="phoneNumber" label="Số điện thoại" />
                    </Col>
                </Row>
                <ProFormSelect options={departments} name="departmentId" label="Đơn vị" showSearch rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn đơn vị'
                    }
                ]} />
                <Form.Item name="passwordHash" label="Mật khẩu">
                    <Input.Password />
                </Form.Item>
            </DrawerForm>
        </PageContainer>
    )
}

export default UserList