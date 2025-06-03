import { apiPostPermanentDelete, apiPostRestore, apiPostTrash } from "@/services/post";
import { LeftOutlined } from "@ant-design/icons";
import { ActionType, PageContainer, ProTable } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, message, Popconfirm } from "antd";
import { useRef } from "react";

const TrashPage: React.FC = () => {

  const actionRef = useRef<ActionType>();

  return (
    <PageContainer extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        request={apiPostTrash}
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
            dataIndex: 'createdDate',
            valueType: 'date',
            width: 120,
            search: false
          },
          {
            title: 'Ngày xoá',
            dataIndex: 'modifiedDate',
            valueType: 'date',
            width: 120,
            search: false
          },
          {
            title: 'Lượt xem',
            dataIndex: 'view',
            valueType: 'digit',
            width: 100,
            search: false
          },
          {
            title: 'Hành động',
            dataIndex: 'action',
            valueType: 'option',
            width: 100,
            render: (_, record) => [
              <Popconfirm key="restore" title="Bạn có chắc muốn khôi phục bài viết này?" onConfirm={async () => {
                // Logic to restore the post
                await apiPostRestore(record.id);
                message.success('Bài viết đã được khôi phục thành công');
                actionRef.current?.reload();
              }}>
                <Button type="primary" size="small">Khôi phục</Button>
              </Popconfirm>,
              <Popconfirm key="delete" title="Bạn có chắc muốn xóa vĩnh viễn bài viết này?" onConfirm={async () => {
                // Logic to permanently delete the post
                await apiPostPermanentDelete(record.id);
                message.success('Bài viết đã được xóa vĩnh viễn');
                actionRef.current?.reload();
              }}>
                <Button size="small" danger>Xóa vĩnh viễn</Button>
              </Popconfirm>
            ]
          }
        ]}
      />
    </PageContainer>
  );
}
export default TrashPage;