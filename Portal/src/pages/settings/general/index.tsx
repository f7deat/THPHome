import FileUpload from "@/components/files/upload";
import { apiBannerUpdate, apiLogo } from "@/services/setting";
import { UploadOutlined } from "@ant-design/icons";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { FormattedMessage } from "@umijs/max";
import { useIntl } from "@umijs/max";
import { Button, Col, Image, Row, message } from "antd";
import { useEffect, useState } from "react";

const GeneralSettingPage: React.FC = () => {

    const [logo, setLogo] = useState<any>();
    const [openUpload, setOpenUpload] = useState<boolean>(false);
    const intl = useIntl();

    const fetchLogo = () => {
        apiLogo(intl.locale).then(response => {
            setLogo(response);
        })
    }

    useEffect(() => {
        fetchLogo();
    }, []);

    const onChangeLogo = async (values: any) => {
        await apiBannerUpdate({
            ...logo,
            image: values.url
        });
        message.success('Thay đổi thành công!');
        fetchLogo();
    }

    return (
        <PageContainer>
            <Row gutter={16}>
                <Col md={6}>
                    <ProCard title="Logo" headerBordered extra={<Button type="primary" icon={<UploadOutlined />} onClick={() => setOpenUpload(true)}>
                        <span><FormattedMessage id='general.change' /></span>
                    </Button>}>
                        <Image src={logo?.image} />
                    </ProCard>
                </Col>
            </Row>
            <FileUpload open={openUpload} onCancel={() => setOpenUpload(false)} onFinish={onChangeLogo} />
        </PageContainer>
    )
}

export default GeneralSettingPage;