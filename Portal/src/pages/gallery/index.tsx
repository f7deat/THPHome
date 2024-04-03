import FileExplorer from "@/components/files/explorer";
import { PlusOutlined } from "@ant-design/icons";
import { PageContainer, ProCard, ProList } from "@ant-design/pro-components"
import { Button, Col, Row, Tag } from "antd";
import { useState } from "react";

const GalleryPage: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);

    const data = [
        '语雀的天空',
        'Ant Design',
        '蚂蚁金服体验科技',
        'TechUI',
        'TechUI 2.0',
        'Bigfish',
        'Umi',
        'Ant Design Pro',
      ].map((item) => ({
        title: item,
        subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
        actions: [<a key="run">邀请</a>, <a key="delete">删除</a>],
        avatar:
          'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
        content: (
          <div
            style={{
              flex: 1,
            }}
          >
            <div
              style={{
                width: 200,
              }}
            >
              <div>发布中</div>
            </div>
          </div>
        ),
      }));

    return (
        <PageContainer extra={<Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>Thêm mới</Button>}>
            <ProList<any>
                ghost
                pagination={{
                    defaultPageSize: 8,
                    showSizeChanger: false,
                }}
                showActions="hover"
                grid={{ gutter: 16, column: 4 }}
                onItem={(record: any) => {
                    return {
                        onMouseEnter: () => {
                            console.log(record);
                        },
                        onClick: () => {
                            console.log(record);
                        },
                    };
                }}
                metas={{
                    title: {},
                    subTitle: {},
                    type: {},
                    avatar: {},
                    content: {},
                    actions: {
                        cardActionProps: 'actions'
                    },
                }}
                dataSource={data}
            />
            <FileExplorer open={open} setOpen={setOpen} />
        </PageContainer>
    )
}

export default GalleryPage;