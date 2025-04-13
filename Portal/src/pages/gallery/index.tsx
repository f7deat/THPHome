import FileUpload from "@/components/files/upload";
import { apiGalleryAdd, apiGalleryDelete, apiGalleryList, apiGalleryUpdate, apiPhotoAdd } from "@/services/file";
import { DeleteOutlined, EditOutlined, FolderOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { ModalForm, PageContainer, ProCard, ProFormInstance, ProFormText, ProFormTextArea } from "@ant-design/pro-components"
import { Link, useIntl } from "@umijs/max";
import { Button, Empty, Popconfirm, Space, Tag, Tooltip, message } from "antd";
import { useEffect, useRef, useState } from "react";

const GalleryPage: React.FC = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const formRef = useRef<ProFormInstance>();
  const [gallery, setGallery] = useState<any>();
  const intl = useIntl();

  useEffect(() => {
    if (gallery) {
      formRef.current?.setFields([
        {
          name: 'id',
          value: gallery.id
        },
        {
          name: 'title',
          value: gallery.title
        },
        {
          name: 'description',
          value: gallery.description
        }
      ]);
    }
  }, [gallery]);


  const fetchData = () => {
    apiGalleryList().then((response: any) => {
      setDataSource(response);
    })
  }

  const onUpload = async (values: any) => {
    values.postId = gallery.id;
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

  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = async (values: any) => {
    values.locale = intl.locale;
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
                title={<div className="line-clamp-1"><Tooltip title={item.title}>{item.title}</Tooltip></div>}
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
        <ProFormText name="title" label="Tên Album" rules={[
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