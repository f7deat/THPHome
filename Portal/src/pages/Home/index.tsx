import { PageContainer, ProCard } from '@ant-design/pro-components';
import { FormattedNumber, request } from '@umijs/max';
import { Col, List, Row, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { apiGetChartPostCreatedInYear } from '@/services/post';
import EChartsReact from 'echarts-for-react';

const HomePage: React.FC = () => {
  const [postCount, setPostCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [postView, setPostView] = useState(0);
  const [posts, setPosts] = useState<any>([]);
  const [totalStudent, setTotalStudent] = useState<number>(0);
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    request('post/get-total').then(response => setPostCount(response));
    request('post/get-view').then(response => setPostView(response));
    request('post/get-list-popular').then(response => setPosts(response));
    request('file/total').then(response => setFileCount(response));
    request('https://dkxtdev.dhhp.edu.vn/api/student/total').then(response => setTotalStudent(response));
    apiGetChartPostCreatedInYear().then(response => {
      setChartData(response);
      console.log(response)
    })
  }, [])

  return (
    <PageContainer ghost>
      <div>
        <Row gutter={16} className="mb-4">
          <Col md={6}>
            <ProCard className="bg-white rounded" style={{ marginBottom: 23 }}>
              <Statistic
                title="Lượt xem"
                value={postView}
                className="p-4"
              />
              <div className="border-t px-4 py-2">
                Số bài viết: <FormattedNumber value={postCount} />
              </div>
            </ProCard>
          </Col>
          <Col md={6}>
            <ProCard className="bg-white rounded" style={{ marginBottom: 23 }}>
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
          <Col md={6}>
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
          </Col>
          <Col md={6}>
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
        <ProCard>
          <Row gutter={16}>
            <Col md={16}>
              <EChartsReact
                className='w-full h-full'
                option={{
                  xAxis: {
                    type: 'category',
                    data: chartData?.xAsis
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
                  title: {
                    text: 'Bài đăng trong năm'
                  },
                  tooltip: {}
                }}
                style={{
                  height: 350
                }}
              />
            </Col>
            <Col md={8}>
              <List header={<div className='font-semibold text-lg'>Truy cập nhiều</div>}
                dataSource={posts}
                renderItem={(item: any) => (
                  <List.Item>
                    <a href={`${item.url}-${item.id}.html`} target="_blank" rel="noreferrer">{item.title}</a> - <span className="text-sm text-gray-400">{<FormattedNumber value={item.view} />} <EyeOutlined /></span>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </ProCard>
      </div>
    </PageContainer>
  );
};

export default HomePage;
