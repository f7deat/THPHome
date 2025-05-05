import FileUpload from "@/components/files/upload";
import { apiLogo, apiSetLogo } from "@/services/setting";
import { ArrowRightOutlined, UploadOutlined } from "@ant-design/icons";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { FormattedMessage, history, useRequest } from "@umijs/max";
import { Button, Col, Image, Row, message } from "antd";
import { useState } from "react";

const GeneralSettingPage: React.FC = () => {

    const [openUpload, setOpenUpload] = useState<boolean>(false);
    const { data, refresh } = useRequest(apiLogo);

    const onChangeLogo = async (values: any) => {
        await apiSetLogo({
            image: values.url
        });
        message.success('Thay đổi thành công!');
        refresh();
    }

    return (
        <PageContainer>
            <Row gutter={16}>
                <Col md={6}>
                    <ProCard title="Logo" headerBordered extra={<Button type="primary" icon={<UploadOutlined />} onClick={() => setOpenUpload(true)}>
                        <span><FormattedMessage id='general.change' /></span>
                    </Button>}>
                        <Image src={data} />
                    </ProCard>
                </Col>
                <Col md={6} xs={24}>
                    <ProCard title="Entry" headerBordered className="h-full" extra={<Button type="primary" icon={<ArrowRightOutlined />} onClick={() => history.push('/post/entry')}>Cài đặt</Button>}>
                        Cài đặt thông tin trang mặc định
                    </ProCard>
                </Col>
                <Col md={6} xs={24}>
                    <ProCard title="Đơn vị" headerBordered className="h-full" extra={<Button type="primary" icon={<ArrowRightOutlined />} onClick={() => history.push('/settings/general/department')}>Cài đặt</Button>}>
                        Cài đặt thông tin phòng ban - khoa, trung tâm
                    </ProCard>
                </Col>
            </Row>
            <FileUpload open={openUpload} onCancel={() => setOpenUpload(false)} onFinish={onChangeLogo} />
        </PageContainer>
    )
}

export default GeneralSettingPage;