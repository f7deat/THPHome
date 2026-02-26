import { DrawerForm, PageContainer, ProFormText, ProTable } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Tooltip } from "antd";
import { useRef, useState } from "react";
import type { ActionType } from "@ant-design/pro-components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { apiCreateVideoBulletin, apiDeleteVideoBulletin, apiUpdateVideoBulletin, apiVideoBulletinList } from "@/services/videoBulletin";

const VideoBulletinPage: React.FC = () => {
    const [form] = useForm();
    const [open, setOpen] = useState(false);
    const VideoBulletinRef = useRef<ActionType>();
    const [editingRecord, setEditingRecord] = useState<any>(null);

    const getYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : url;
    };

    const handleSubmit = async (values: any) => {
        const payload = { ...values, youtubeId: getYoutubeId(values.youtubeId) };
        try {
            if (editingRecord) {
                await apiUpdateVideoBulletin({ id: editingRecord.id, ...payload });
                message.success('Cập nhật thành công!');
            } else {
                await apiCreateVideoBulletin(payload);
                message.success('Tạo mới thành công!');
            }
            VideoBulletinRef.current?.reload();
            setOpen(false);
            setEditingRecord(null);
        } catch (error) {
            console.log(editingRecord ? 'Cập nhật thất bại!' : 'Tạo mới thất bại!');
        }
    };

    const handleDelete = async (record: any) => {
        try {
            await apiDeleteVideoBulletin(record.id);
            message.success('Xoá thành công!');
            VideoBulletinRef.current?.reload();
        } catch (error) {
            message.error('Xoá thất bại!');
        }
    };
    return (
        <PageContainer>
            <ProTable headerTitle={`Điểm tin hàng tháng`} actionRef={VideoBulletinRef} rowKey="id" search={false}
                pagination={{ pageSize: 10 }}
                request={apiVideoBulletinList}
                toolBarRender={() => [
                    <Button key="create" type="primary"
                        onClick={() => {
                            form.resetFields();
                            setEditingRecord(null);
                            setOpen(true);
                        }}>  Tạo mới
                    </Button>,
                ]}
                columns={[
                    { title: "#", valueType: "indexBorder", width: 10 },
                    { title: "Số", dataIndex: "volume" },
                    {
                        title: "Video",
                        dataIndex: "youtubeId",
                        render: (text) => (
                            <a href={`https://www.youtube.com/watch?v=${text}`} target="_blank" rel="noreferrer">
                                {`https://www.youtube.com/watch?v=${text}`}
                            </a>
                        )
                    },
                    { title: "Ngày tạo", dataIndex: "createdDate", valueType: "dateTime" },
                    { title: "Người tạo", dataIndex: "createdBy" },
                    { title: "Ngày cập nhật", dataIndex: "modifiedDate", valueType: "dateTime" },
                    { title: "Người cập nhật", dataIndex: "modifiedBy" },
                    {
                        title: 'Thao tác', valueType: 'option', width: 120, fixed: 'right',
                        render: (text, record) => [
                            <Tooltip key={`edit-${record.id}`} title="Chỉnh sửa">
                                <Button type="text" icon={<EditOutlined />}
                                    onClick={() => {
                                        setEditingRecord(record);
                                        form.setFieldsValue({
                                            volume: record.volume,
                                            youtubeId: record.youtubeId,
                                        });
                                        setOpen(true);
                                    }}
                                />
                            </Tooltip>,
                            <Popconfirm key={`delete-confirm-${record.id}`} title="Bạn có chắc chắn muốn xoá?"
                                description={`Tên: ${record.name}`} okText="Xoá"
                                onConfirm={() => handleDelete(record)} cancelText="Huỷ"
                            >
                                <Tooltip title="Xoá">
                                    <Button type="text" danger icon={<DeleteOutlined />} />
                                </Tooltip>
                            </Popconfirm>,
                        ]
                    }
                ]}
            />
            <DrawerForm form={form} open={open} grid={true} drawerProps={{ width: 600 }}
                rowProps={{ gutter: 16 }} onOpenChange={(visible) => {
                    if (!visible) {
                        setEditingRecord(null);
                    }
                    setOpen(visible);
                }}
                onFinish={handleSubmit}
                initialValues={{
                    Name: editingRecord?.name,
                    Description: editingRecord?.description,
                    IsActive: editingRecord?.isActive,
                }}
            >
                <ProFormText name="volume" label="Số"
                    rules={[{ required: true, message: 'Vui lòng nhập số của điểm tin' }]} />
                <ProFormText name="youtubeId" label="Video"
                    rules={[{ required: true, message: 'Vui lòng nhập video' }]} />
                <div style={{ marginTop: 10, width: '100%' }}>
                    {form.getFieldValue('youtubeId') && (
                        <iframe
                            width="100%"
                            height="200"
                            src={`https://www.youtube.com/embed/${getYoutubeId(form.getFieldValue('youtubeId'))}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    )}
                </div>
            </DrawerForm>
        </PageContainer>
    );
};

export default VideoBulletinPage;
