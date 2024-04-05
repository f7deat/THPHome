import FileUpload from "@/components/files/upload";
import { apiGalleryAdd, apiGalleryDelete, apiGalleryList, apiGalleryUpdate, apiPhotoAdd, apiPhotoDelete } from "@/services/file";
import { DeleteOutlined, EditOutlined, FolderOutlined, PlusOutlined, StarOutlined, UploadOutlined } from "@ant-design/icons";
import { ModalForm, PageContainer, ProCard, ProFormInstance, ProFormText, ProFormTextArea, ProList } from "@ant-design/pro-components"
import { Link } from "@umijs/max";
import { Button, Col, Empty, Image, Popconfirm, Row, Space, Tag, Tooltip, message } from "antd";
import { useEffect, useRef, useState } from "react";

const GalleryPage: React.FC = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const formRef = useRef<ProFormInstance>();
  const [gallery, setGallery] = useState<any>();

  useEffect(() => {
    if (gallery) {
      formRef.current?.setFields([
        {
          name: 'id',
          value: gallery.id
        },
        {
          name: 'name',
          value: gallery.name
        },
        {
          name: 'description',
          value: gallery.description
        }
      ]);
    }
  }, [gallery]);

  const onUpload = async (values: any) => {
    values.galleryId = gallery.id;
    values.fileId = values.id;
    await apiPhotoAdd(values);
    message.success('Tải lên thành công!');
    fetchData();
  }

  const onConfirm = async (id: string) => {
    await apiGalleryDelete(id);
    message.success('Xóa thành công!');
    fetchData();
  }

  const fetchData = () => {
    apiGalleryList().then(response => {
      setDataSource(response);
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = async (values: any) => {
    if (values.id) {
      await apiGalleryUpdate(values);
    } else {
      await apiGalleryAdd(values);
    }
    fetchData();
    setOpen(false);
    formRef.current?.resetFields();
  }

  return (
    <PageContainer extra={(
      <Space>
        <Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>Tạo Album</Button>
      </Space>
    )}>
      <div className="grid grid-cols-6 gap-4">
        {
          dataSource.map((item: any) => (
            <div key={item.id}>
              <ProCard
                size="small"
                title={item.name}
                headerBordered
                extra={<Tag color="blue">{item.count} ảnh</Tag>}
                actions={[
                  <Tooltip title="Xem chi tiết" key="view">
                    <Link to={`/gallery/photo/${item.id}`}><FolderOutlined /></Link>
                  </Tooltip>,
                  <Tooltip title="Chỉnh sửa" key="edit">
                    <EditOutlined onClick={() => {
                      setGallery(item);
                      setOpen(true);
                    }} />
                  </Tooltip>,
                  <Tooltip title="Tải ảnh lên" key="upload">
                    <UploadOutlined onClick={() => {
                      setGallery(item);
                      setOpenUpload(true);
                    }} />
                  </Tooltip>,
                  <Tooltip key="delete" title="Xóa">
                    <Popconfirm title="Xác nhận xóa?" onConfirm={() => onConfirm(item.id)}>
                      <DeleteOutlined />
                    </Popconfirm>
                  </Tooltip>
                ]}>
                <div>
                  {
                    item.thumbnail ? (
                      <img src={item.thumbnail} className="h-40 object-cover w-full" />
                    ) : <div className="h-40"><Empty /></div>
                  }
                </div>
              </ProCard>
            </div>
          ))
        }
      </div>

      <FileUpload open={openUpload} onCancel={() => setOpenUpload(false)} onFinish={onUpload} />
      <ModalForm open={open} onOpenChange={setOpen} title="Cài đặt" onFinish={onFinish} formRef={formRef}>
        <ProFormText name="id" hidden />
        <ProFormText name="name" label="Tên Album" rules={[
          {
            required: true
          }
        ]} />
        <ProFormTextArea name="description" label="Description" />
      </ModalForm>
    </PageContainer>
  )
}

export default GalleryPage;