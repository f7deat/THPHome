import { LeftOutlined } from "@ant-design/icons";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button } from "antd";

const TrashPage: React.FC = () => {
  return (
    <PageContainer extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
      <ProTable
        search={{
          layout: 'vertical'
        }}
        columns={[
          {
            title: '#',
            valueType: 'indexBorder',
            width: 30,
            align: 'center'
          },
          {
            title: 'Tiêu đề',
            dataIndex: 'title'
          },
          {
            title: 'Ngày đăng',
            dataIndex: 'createdAt',
            valueType: 'date',
            width: 150,
          },
          {
            title: 'Hành động',
            dataIndex: 'action',
            valueType: 'option',
            width: 100,
            render: (_, record) => [
              <Button key="restore" type="primary" onClick={() => {
                // Logic to restore the post
                console.log(`Restoring post with ID: ${record.id}`);
              }}>Khôi phục</Button>,
              <Button key="delete" danger onClick={() => {
                // Logic to permanently delete the post
                console.log(`Permanently deleting post with ID: ${record.id}`);
              }}>Xóa vĩnh viễn</Button>
            ]
          }
        ]}
      />
    </PageContainer>
  );
}
export default TrashPage;