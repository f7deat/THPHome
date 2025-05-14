import { PageContainer, ProCard, ProList } from '@ant-design/pro-components';
import { FormattedNumber, history, Link, request } from '@umijs/max';
import { Button, Col, List, Row, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { ArrowRightOutlined, EyeOutlined, MailOutlined } from '@ant-design/icons';
import { apiGetChartPostCreatedInYear } from '@/services/post';
import EChartsReact from 'echarts-for-react';
import Application from './components/application';

const HomePage: React.FC = () => {
  const [postCount, setPostCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [postView, setPostView] = useState(0);
  const [posts, setPosts] = useState<any>([]);
  const [totalStudent] = useState<number>(0);
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    request('post/get-total').then(response => setPostCount(response));
    request('post/get-view').then(response => setPostView(response));
    request('post/get-list-popular').then(response => setPosts(response));
    request('file/total').then(response => setFileCount(response));
    apiGetChartPostCreatedInYear().then(response => {
      setChartData(response);
      console.log(response)
    })
  }, [])

  return (
    <PageContainer ghost>
      <div>
        <Row gutter={16}>
          <Col xs={12} md={6}>
            <ProCard className="bg-white rounded mb-4">
              <Statistic
                title="Xem"
                value={postView}
                className="p-4"
              />
              <div className="border-t px-4 py-2">
                Số bài viết: <FormattedNumber value={postCount} />
              </div>
            </ProCard>
          </Col>
          <Col xs={12} md={6}>
            <ProCard className="bg-white rounded mb-4">
              <Statistic
                title="Tuyển sinh"
                value={totalStudent}
                className="p-4"
              />
              <div className="border-t px-4 py-2">
                Số đơn ĐKXT: {totalStudent}
              </div>
            </ProCard>
          </Col>
          <Col xs={12} md={6}>
            <ProCard className="bg-white rounded mb-4">
              <Statistic
                title="Tệp tin"
                value={fileCount}
                className="p-4"
              />
              <div className="border-t px-4 py-2">
                Đang chờ: 0
              </div>
            </ProCard>
          </Col>
          <Col xs={12} md={6}>
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
        </Row>
        <Row gutter={16}>
          <Col md={18} className='mb-4'>
            <Application />
          </Col>
          <Col md={6} className='mb-4'>
            <ProCard title="Công cụ" headerBordered className='h-full'>
              <ProList
                ghost
                dataSource={[
                  {
                    avatar: <MailOutlined />,
                    title: 'Gửi Email hàng loạt'
                  }
                ]}
                metas={{
                  avatar: {
                    dataIndex: 'avatar'
                  },
                  title: {
                    dataIndex: 'title',
                    render: (dom) => <Link to='/tool/email'>{dom}</Link>
                  },
                  actions: {
                    render: () => [
                      <Button type='text' size='small' icon={<ArrowRightOutlined />} key="go" onClick={() => history.push('/tool/email')} />
                    ]
                  }
                }}
              />
            </ProCard>
          </Col>
          <Col md={24}>
            <Row gutter={16}>
              <Col md={16}>
                <ProCard title="Hoạt động trong năm" headerBordered>
                  <EChartsReact
                    option={{
                      xAxis: {
                        type: 'category',
                        data: chartData?.xAsis
                      },
                      grid: {
                        left: 30,
                        top: 30,
                        right: 0,
                        bottom: 30
                      },
                      yAxis: {
                        type: 'value'
                      },
                      series: [
                        {
                          data: chartData?.series,
                          type: 'bar',
                          name: 'Bài đăng'
                        }
                      ],
                      tooltip: {}
                    }}
                    style={{
                      height: 350
                    }}
                  />
                </ProCard>
              </Col>
              <Col md={8}>
                <ProCard title="Truy cập nhiều" headerBordered className='h-full'>
                  <List
                    dataSource={posts}
                    renderItem={(item: any) => (
                      <List.Item>
                        <a href={`${item.url}-${item.id}.html`} target="_blank" rel="noreferrer">{item.title}</a> - <span className="text-sm text-gray-400">{<FormattedNumber value={item.view} />} <EyeOutlined /></span>
                      </List.Item>
                    )}
                  />
                </ProCard>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default HomePage;
