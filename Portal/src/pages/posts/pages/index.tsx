import { queryPost } from "@/services/post";
import { LeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useParams } from "@umijs/max";
import { Button, Col, Empty, Row, message } from "antd";
import { useEffect, useRef, useState } from "react";
import PageSetting from "./setting";
import PageBlock from "./block";

const CustomPage: React.FC = () => {
    const { id } = useParams();

    const [catalog, setCatalog] = useState<any>();
    const [tab, setTab] = useState('content');

    const reload = () => {
        if (id) {
            queryPost(id).then((response) => setCatalog(response));
        }
    }

    useEffect(() => {
        reload();
    }, [id]);

    const onTabChange = (key: string) => {
        setTab(key);
    }

    const iframeRef = useRef<HTMLIFrameElement>(null);

    return (
        <PageContainer
            title={catalog?.name}
            extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}><span>Quay lại</span></Button>}
        >
            <Row gutter={16}>
                <Col span={14}>
                    <ProCard
                        tabs={{
                            tabPosition: 'top',
                            activeKey: tab,
                            items: [
                                {
                                    label: 'Nội dung',
                                    key: 'content',
                                    children: <PageBlock />,
                                },
                                {
                                    label: 'Cài đặt',
                                    key: 'setting',
                                    children: <PageSetting />,
                                }
                            ],
                            onChange: onTabChange,
                        }}
                        className='mb-4'
                    />
                </Col>
                <Col span={10}>
                    <ProCard title="Xem trước" headerBordered extra={<Button 
                    onClick={() => {
                        if (iframeRef.current) {
                            iframeRef.current.src = `https://dhhp.edu.vn/post/preview-${id}.html`;
                        }
                    }}
                    icon={<ReloadOutlined />} size="small" type="dashed">Tải lại</Button>}>
                        <div style={{
                            overflow: 'hidden',
                            border: '1px solid #eee',
                            textAlign: 'center',
                            margin: '0 0.6rem'
                        }}>
                            <iframe ref={iframeRef} src={`https://dhhp.edu.vn/post/preview-${id}.html`} style={{
                                border: '1px solid #ddd',
                                width: 1920,
                                height: 2000,
                                transform: 'scale(0.3)',
                                transformOrigin: 'top left'
                            }}></iframe>
                        </div>
                    </ProCard>
                </Col>
            </Row>
        </PageContainer>
    );
}

export default CustomPage;