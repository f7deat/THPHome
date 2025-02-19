import { DeleteOutlined, LeftOutlined } from "@ant-design/icons"
import { PageContainer, ProColumns, ProTable } from "@ant-design/pro-components"
import { request, useParams } from "@umijs/max"
import { Button, Popconfirm } from "antd"
import { useEffect, useState } from "react"

const RoleCenter: React.FC = () => {

    const { id } = useParams();
    const [listUser, setListUser] = useState<any>([])

    useEffect(() => {
        if (id) {
            request(`user/users-in-role/${id}`).then(response => {
                setListUser(response)
            })
        }
    }, [id]);

    const columns: ProColumns[] = [
        {
            title: '#',
            valueType: 'indexBorder',
            width: 30
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
        },
        {
            title: 'Tác vụ',
            valueType: 'option',
            render: () => [
                <Popconfirm
                    key="delete"
                    title="Are you sure delete from role?"
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger icon={<DeleteOutlined />} size="small"></Button>
                </Popconfirm>
            ],
            width: 60
        }
    ]

    return (
        <PageContainer extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
            <ProTable dataSource={listUser} columns={columns} rowKey="id" search={{
                layout: 'vertical'
            }} />
        </PageContainer>
    )
}

export default RoleCenter