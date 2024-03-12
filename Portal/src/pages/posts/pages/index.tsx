import { queryPost } from "@/services/post";
import { LeftOutlined } from "@ant-design/icons";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useParams } from "@umijs/max";
import { Button, Col, Empty, Row, message } from "antd";
import { useEffect, useState } from "react";
import PageSetting from "./setting";
import PageBlock from "./block";

const CustomPage: React.FC = () => {
    const { id } = useParams();

    const [open, setOpen] = useState<boolean>(false);
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

    return (
        <PageContainer
            title={catalog?.name}
            extra={<Button icon={<LeftOutlined />} onClick={() => history.back()}><span>Quay lại</span></Button>}
        >
            <Row gutter={16}>
                <Col span={18}>
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
                <Col span={6}>
                    <ProCard title="Preview">
                        <Empty />
                    </ProCard>
                </Col>
            </Row>
        </PageContainer>
    );
}

export default CustomPage;