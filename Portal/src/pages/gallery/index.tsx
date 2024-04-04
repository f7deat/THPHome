import FileExplorer from "@/components/files/explorer";
import FileUpload from "@/components/files/upload";
import { apiPhotoAdd, apiPhotoList } from "@/services/file";
import { FolderOutlined, PlusOutlined, StarOutlined, UploadOutlined } from "@ant-design/icons";
import { ActionType, PageContainer, ProCard, ProList } from "@ant-design/pro-components"
import { Button, Col, Image, Row, Space, Tag, message } from "antd";
import { useRef, useState } from "react";

const GalleryPage: React.FC = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const onFinish = async (values: any) => {
    console.log(values)
    const response = await apiPhotoAdd(values);
    if (response) {
      message.success('Uploaded!');
      actionRef.current?.reload();
    }
  }

  return (
    <PageContainer extra={(
      <Space>
        <Button icon={<FolderOutlined />} onClick={() => setOpen(true)}>File Explorer</Button>
        <Button icon={<UploadOutlined />} type="primary" onClick={() => setOpenUpload(true)}>Tải lên</Button>
      </Space>
    )}>
      <ProList<any>
        actionRef={actionRef}
        ghost
        pagination={{
          defaultPageSize: 12,
        }}
        request={apiPhotoList}
        grid={{ gutter: 16, column: 6 }}
        renderItem={(item) => (
          <div className="bg-white">
            <Image src={item.url} className="w-full object-cover" height={180} wrapperClassName="w-full" />
          </div>
        )}
      />
      <FileExplorer open={open} setOpen={setOpen} />
      <FileUpload open={openUpload} onCancel={() => setOpenUpload(false)} onFinish={onFinish} />
    </PageContainer>
  )
}

export default GalleryPage;