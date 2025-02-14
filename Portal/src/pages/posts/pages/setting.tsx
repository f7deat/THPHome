import { ProCard, ProForm, ProFormDigit, ProFormTreeSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Button, Col, Empty, Image, Row, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "@umijs/max";
import { apiPageBuilderUpdate, queryPost } from "@/services/post";
import { UploadOutlined } from "@ant-design/icons";
import FileUpload from "@/components/files/upload";
import { IFileUpload } from "@/components/files/typings";
import { apiCategoryTreeData } from "@/services/categoy";

const PageSetting: React.FC = () => {

    const { id } = useParams();
    const [form] = ProForm.useForm();
    const [thumbnail, setThumbnail] = useState<string>();
    const [openUpload, setOpenUpload] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            queryPost(id).then((response: any) => {
                if (response) {
                    form.setFields([
                        {
                            name: 'id',
                            value: response.id
                        },
                        {
                            name: 'title',
                            value: response.title
                        },
                        {
                            name: 'description',
                            value: response.description
                        },
                        {
                            name: 'thumbnail',
                            value: response.thumbnail
                        },
                        {
                            name: 'categoryId',
                            value: response.categoryId
                        }
                    ]);
                    if (response.thumbnail) {
                        setThumbnail(response.thumbnail);
                    }
                }
            })
        }
    }, [id]);

    const onUpload = (values: IFileUpload) => {
        form.setFieldValue('thumbnail', values.url);
        setThumbnail(values.url);
    }

    const onFinish = async (values: any) => {
        await apiPageBuilderUpdate(values);
        setThumbnail(values.thumbnail);
        message.success('Lưu thành công!');
    }

    return (
        <>
            <ProForm form={form} onFinish={onFinish}>
                <ProFormDigit name='id' hidden />
                <Row gutter={16}>
                    <Col span={16}>
                        <ProFormText label="Tiêu đề" name="title" rules={[
                            {
                                required: true
                            }
                        ]} />
                        <ProFormTextArea label="Mô tả" name="description" tooltip="Meta Description" />
                        <ProFormText label="Ảnh đại diện" name="thumbnail" 
                        fieldProps={{
                            addonAfter: <Button icon={<UploadOutlined />} type="text" size="small" onClick={() => setOpenUpload(true)}>Upload</Button>
                        }}
                        />
                        <ProFormTreeSelect label="Danh mục" name="categoryId" request={apiCategoryTreeData} />
                    </Col>
                    <Col span={8}>
                        <ProCard bordered title="Ảnh đại diện" headerBordered size="small">
                            {
                                thumbnail ? <Image src={thumbnail} className="w-full object-cover h-48" /> : <Empty />
                            }
                        </ProCard>
                    </Col>
                </Row>

            </ProForm>
            <FileUpload open={openUpload} onCancel={() => setOpenUpload(false)} onFinish={onUpload} />
        </>
    )
}

export default PageSetting;