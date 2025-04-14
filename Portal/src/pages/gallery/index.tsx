import FileUpload from "@/components/files/upload";
import { apiGalleryAdd, apiGalleryDelete, apiGalleryList, apiGalleryUpdate, apiPhotoAdd } from "@/services/file";
import { DeleteOutlined, EditOutlined, FolderOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { ActionType, ModalForm, PageContainer, ProCard, ProFormInstance, ProFormText, ProFormTextArea, ProList } from "@ant-design/pro-components"
import { Link, useAccess, useModel } from "@umijs/max";
import { Button, Empty, Popconfirm, Tag, Tooltip, message } from "antd";
import { useEffect, useRef, useState } from "react";

const GalleryPage: React.FC = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance>();
  const [gallery, setGallery] = useState<any>();
  const { initialState } = useModel('@@initialState');
  const access = useAccess();
  const actionRef = useRef<ActionType>();

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

  const onUpload = async (values: any) => {
    values.postId = gallery.id;
    values.fileId = values.id;
    await apiPhotoAdd(values);
    message.success('Tải lên thành công!');
    actionRef.current?.reload();
  }

  const onConfirm = async (id: string) => {
    await apiGalleryDelete(id);
    message.success('Xóa thành công!');
    actionRef.current?.reload();
  }

  const onFinish = async (values: any) => {
    if (values.id) {
      await apiGalleryUpdate(values);
    } else {
      await apiGalleryAdd(values);
    }
    actionRef.current?.reload();
    setOpen(false);
    formRef.current?.resetFields();
  }

  return (
    <PageContainer extra={<Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>Tạo mới</Button>}>
      <ProList
        actionRef={actionRef}
        request={(params) => apiGalleryList({
          ...params,
          departmentId: access.canEditor ? null : initialState?.currentUser?.departmentId
        })}
        grid={{ gutter: 16, column: 4 }}
        renderItem={(item, index) => {
          return (
            <ProCard
              bordered
              key={index}
              title={<div className="line-clamp-1"><Tooltip title={item.title}>{item.title}</Tooltip></div>}
              headerBordered
              extra={<Tag color="blue">{item.count} ảnh</Tag>}
              actions={[
                <Tooltip title="Xem chi tiết" key="view">
                  <Link to={`/media/gallery/${item.id}`}><FolderOutlined /></Link>
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
          )
        }}
      />

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