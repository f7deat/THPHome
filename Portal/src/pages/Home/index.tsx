import { PageContainer, ProCard } from '@ant-design/pro-components';
import { FormattedNumber, Link, request } from '@umijs/max';
import { Col, List, Row, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { EyeOutlined, FolderOpenOutlined, LoginOutlined } from '@ant-design/icons';
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
        <Row gutter={16}>
          <Col xs={12} md={6}>
            <ProCard className="bg-white rounded mb-4">
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
          <Col md={16} className='mb-4'>
            <ProCard title="Ứng dụng" headerBordered className='h-full'>
              <div className='grid md:grid-cols-4 gap-4'>
                <Link to={`/onboard`}>
                  <div className='border p-4 rounded hover:border-blue-500'>
                    <div className='font-semibold uppercase mb-2 flex gap-2 items-center'>
                      <div className='h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white'><LoginOutlined /></div>
                      <div className='text-base'>Onboard</div>
                    </div>
                    <div className='text-gray-500'>Giúp sinh viên mới làm quen, tiếp xúc với môi trường, văn hóa ĐHHP.</div>
                  </div>
                </Link>
                <a href='https://qlvb.dhhp.edu.vn'>
                  <div className='border p-4 rounded hover:border-blue-500'>
                    <div className='font-semibold uppercase mb-2 flex gap-2 items-center'>
                      <div className='h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white'><FolderOpenOutlined /></div>
                      <div className='text-base'>Văn bản nội sinh</div>
                    </div>
                    <div className='text-gray-500'>Tối ưu quy trình làm việc bằng văn bản, đảm bảo tính nhất quán và chính xác của thông tin</div>
                  </div>
                </a>
              </div>
            </ProCard>
          </Col>
          <Col md={8} className='mb-4'>
            <ProCard title="Truy cập nhiều" headerBordered>
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
          <Col md={24}>
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
        </Row>
      </div>
    </PageContainer>
  );
};

export default HomePage;
