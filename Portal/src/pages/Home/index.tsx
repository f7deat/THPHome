import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { request, useModel } from '@umijs/max';
import styles from './index.less';
import { Card, Col, List, Row, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const [postCount, setPostCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [postView, setPostView] = useState(0);
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    request('post/get-total').then(response => setPostCount(response));
    request('post/get-view').then(response => setPostView(response));
    request('post/get-list-popular').then(response => setPosts(response));
    request('file/total').then(response => setFileCount(response));
  }, [])

  return (
    <PageContainer ghost>
      <div>
        <Row gutter={16} className="mb-4">
          <Col span={6}>
            <ProCard className="bg-white rounded" style={{ marginBottom: 23 }}>
              <Statistic
                title="Lượt xem"
                value={postView}
                className="p-4"
              />
              <div className="border-t px-4 py-2">
                Số bài viết: {postCount}
              </div>
            </ProCard>
            <ProCard className="bg-white rounded" style={{ marginBottom: 23 }}>
              <Statistic
                title="Tệp tin"
                value={fileCount}
                className="p-4"
              />
              <div className="border-t px-4 py-2">
                Đang chờ: 0
              </div>
            </ProCard>
            <ProCard className="bg-white rounded" style={{ marginBottom: 23 }}>
              <Statistic
                title="Bình luận"
                value={0}
                className="p-4"
              />
              <div className="border-t px-4 py-2">
                Đang chờ: 0
              </div>
            </ProCard>
            <ProCard className="bg-white rounded">
              <Statistic
                title="Giảng viên"
                value={0}
                className="p-4"
              />
              <div className="border-t px-4 py-2">
                Phòng ban: 0
              </div>
            </ProCard>
          </Col>
          <Col span={18}>
            <Card title="Bài viết xem nhiều" className="p-0" bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}>
              <List
                dataSource={posts}
                renderItem={(item: any) => (
                  <List.Item>
                    <a href={`/post/${item.url}-${item.id}.html`} target="_blank" rel="noreferrer">{item.title}</a> - <span className="text-sm text-gray-400">{item.view} <EyeOutlined /></span>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default HomePage;
