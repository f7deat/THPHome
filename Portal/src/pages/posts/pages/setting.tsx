import { ProCard, ProForm, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Col, Empty, Image, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "@umijs/max";
import { queryPost } from "@/services/post";

const PageSetting: React.FC = () => {

    const { id } = useParams();
    const [form] = ProForm.useForm();
    const [thumbnail, setThumbnail] = useState<string>();

    useEffect(() => {
        if (id) {
            queryPost(id).then(response => {
                if (response) {
                    form.setFields([
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
                        }
                    ]);
                    if (response.thumbnail) {
                        setThumbnail(response.thumbnail);
                    }
                }
            })
        }
    }, [id]);

    return (
        <>
            <ProForm form={form}>
                <Row gutter={16}>
                    <Col span={16}>
                        <ProFormText label="Tiêu đề" name="title" rules={[
                            {
                                required: true
                            }
                        ]} />
                        <ProFormTextArea label="Mô tả" name="description" tooltip="Meta Description" />
                        <ProFormText label="Ảnh đại diện" name="thumbnail" />
                    </Col>
                    <Col span={8}>
                        <ProCard bordered title="Ảnh đại diện" headerBordered>
                            {
                                thumbnail ? <img src={thumbnail} className="w-full object-cover h-48" /> : <Empty />
                            }
                        </ProCard>
                    </Col>
                </Row>

            </ProForm>
        </>
    )
}

export default PageSetting;