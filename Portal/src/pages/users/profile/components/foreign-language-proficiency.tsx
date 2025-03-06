import { PlusOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";

const ForeignLanguageProficiency: React.FC = () => {
    return (
        <>
            <ProTable
            ghost
                headerTitle={<Button type="primary" icon={<PlusOutlined />}>Thêm mới</Button>}
                columns={[
                    {
                        title: '#',
                        valueType: 'indexBorder',
                        width: 30,
                        align: 'center'
                    },
                    {
                        title: 'Ngoại ngữ',
                        dataIndex: 'language'
                    },
                    {
                        title: 'Trình độ',
                        dataIndex: 'level'
                    },
                    {
                        title: 'Tác vụ',
                        valueType: 'option',
                        render: (_, entity) => [
                            <a key="edit">Sửa</a>,
                            <a key="delete">Xóa</a>
                        ]
                    }
                ]}
                search={false}
            />
        </>
    )
}

export default ForeignLanguageProficiency;