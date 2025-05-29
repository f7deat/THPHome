import FileExplorer from "@/components/files/explorer";
import FileUpload from "@/components/files/upload";
import PostSetting from "@/components/posts/setting";
import { apiPhotoAdd, apiPhotoDelete, apiPhotoList } from "@/services/file";
import { DeleteOutlined, LeftOutlined, UploadOutlined } from "@ant-design/icons";
import { ActionType, PageContainer, ProCard, ProList } from "@ant-design/pro-components"
import { history, useParams } from "@umijs/max";
import { Button, Image, Popconfirm, Space, message } from "antd";
import { useRef, useState } from "react";

const PhotoPage: React.FC = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const { id } = useParams();

  const onFinish = async (values: any) => {
    values.postId = id;
    values.fileId = values.id;
    await apiPhotoAdd(values);
    message.success('Tải lên thành công!');
    actionRef.current?.reload();
  }

  const onConfirm = async (id: string) => {
    await apiPhotoDelete(id);
    message.success('Xóa thành công!');
    actionRef.current?.reload();
  }

  return (
    <PageContainer extra={(
      <Space>
        <Button icon={<UploadOutlined />} type="primary" onClick={() => setOpenUpload(true)}>Tải lên</Button>
        <Button icon={<LeftOutlined />} onClick={() => history.back()}>Quay lại</Button>
      </Space>
    )}>
      <ProCard tabs={{
        type: 'line'
      }}>
        <ProCard.TabPane key="list" tab="Danh sách">
          <ProList<any>
            actionRef={actionRef}
            search={{
              layout: 'vertical'
            }}
            ghost
            pagination={{
              defaultPageSize: 18,
            }}
            request={(params) => apiPhotoList({
              ...params,
              postId: id
            })}
            metas={{
              title: {
                dataIndex: 'searchTerm',
                title: 'Từ khóa tìm kiếm'
              }
            }}
            grid={{ gutter: 16, column: 6 }}
            renderItem={(item) => (
              <div className="bg-white shadow p-2">
                <Image src={item.url} className="w-full object-cover" height={180} wrapperClassName="w-full" />
                <div className="p-1 flex justify-center">
                  <Popconfirm title="Xác nhận xóa" onConfirm={() => onConfirm(item.id)}>
                    <Button type="text" icon={<DeleteOutlined />} size="small" danger></Button>
                  </Popconfirm>
                </div>
              </div>
            )}
          />
        </ProCard.TabPane>
        <ProCard.TabPane key="setting" tab="Cài đặt">
          <PostSetting />
        </ProCard.TabPane>
      </ProCard>
      <FileExplorer open={open} setOpen={setOpen} />
      <FileUpload open={openUpload} onCancel={() => setOpenUpload(false)} onFinish={onFinish} />
    </PageContainer>
  )
}

export default PhotoPage;