import { PageContainer, ProCard, ProForm, ProFormDatePicker, ProList, Statistic } from '@ant-design/pro-components';
import { FormattedNumber, history, Link, useRequest } from '@umijs/max';
import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { ArrowRightOutlined, FormOutlined, MailOutlined, PictureOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { apiGetChartPostCreatedInYear, apiPostStatistics } from '@/services/post';
import EChartsReact from 'echarts-for-react';
import Application from './components/application';
import dayjs from 'dayjs';
import { apiUserTopPosts } from '@/services/user';

const HomePage: React.FC = () => {
  const [totalStudent] = useState<number>(0);
  const [chartData, setChartData] = useState<any>();
  const { data: postStatistics } = useRequest(apiPostStatistics);

  useEffect(() => {
    apiGetChartPostCreatedInYear().then(response => {
      setChartData(response);
    })
  }, []);

  return (
    <PageContainer ghost>
      <div>
        <Row gutter={[16, 16]} className='mb-4'>
          <Col xs={12} md={6}>
            <ProCard title="Bài viết" headerBordered>
              <Statistic
                title="Tổng số bài viết"
                layout='vertical'
                value={postStatistics?.totalPosts}
                suffix={<FormOutlined className='text-blue-500 ml-1' />}
                className='mb-2'
              />
              <div className='mb-2 flex gap-2'>
                <div className=''>Tháng này: {postStatistics?.totalPostsInMonth}</div>
                <div className=''>Năm này: {postStatistics?.totalPostsInYear}</div>
              </div>
              <div className="border-t py-1">
                Số lượt xem: <FormattedNumber value={postStatistics?.totalViews} />
              </div>
            </ProCard>
          </Col>
          <Col xs={12} md={6}>
            <ProCard title="Hình ảnh" headerBordered>
              <Statistic
                title="Tổng số hình ảnh"
                layout='vertical'
                className='mb-2'
                value={totalStudent}
                suffix={<PictureOutlined className='text-red-500 ml-1' />}
              />
              <div className='mb-2 flex gap-2'>
                <div className=''>Tháng này: {0}</div>
                <div className=''>Năm này: {0}</div>
              </div>
              <div className="border-t py-1">
                Số lượt thích: <FormattedNumber value={0} />
              </div>
            </ProCard>
          </Col>
          <Col xs={12} md={6}>
            <ProCard title="Video" headerBordered>
              <Statistic
                title="Tổng số video"
                layout='vertical'
                suffix={<VideoCameraOutlined className='text-orange-500 ml-1' />}
                className='mb-2'
                value={0}
              />
              <div className='mb-2 flex gap-2'>
                <div className=''>Tháng này: {0}</div>
                <div className=''>Năm này: {0}</div>
              </div>
              <div className="border-t py-1">
                Số lượt thích: <FormattedNumber value={0} />
              </div>
            </ProCard>
          </Col>
          <Col xs={12} md={6}>
            <ProCard title="Liên hệ" headerBordered>
              <Statistic
                title="Tổng số liên hệ"
                value={0}
                layout='vertical'
                className='mb-2'
                suffix={<MailOutlined className='text-green-500 ml-1' />}
              />
              <div className='mb-2 flex gap-2'>
                <div className=''>Tháng này: {0}</div>
                <div className=''>Năm này: {0}</div>
              </div>
              <div className="border-t py-1">
                Đã hỗ trợ: <FormattedNumber value={0} />
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
            <ProCard title="Hoạt động trong năm" headerBordered extra={(
              <ProForm submitter={false}>
                <ProFormDatePicker.Year name="year" initialValue={dayjs()}
                  fieldProps={{
                    variant: 'filled',
                    autoFocus: false
                  }}
                  formItemProps={{
                    className: 'mb-0'
                  }}
                />
              </ProForm>
            )}>
              <Row gutter={[16, 16]}>
                <Col md={16}>
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
                </Col>
                <Col md={8} xs={24}>
                  <div className='mb-2 font-semibold px-4 text-base'>Thành viên tích cực</div>
                  <ProList
                    request={apiUserTopPosts}
                    size='small'
                    ghost
                    metas={{
                      avatar: {
                        dataIndex: 'avatar',
                        valueType: 'indexBorder'
                      },
                      title: {
                        dataIndex: 'name'
                      },
                      actions: {
                        render: (text, record) => [
                          <div key="post-count" className='bg-orange-100 text-orange-500 font-semibold w-10 h-6 rounded flex items-center justify-center'>{record.postCount}</div>
                        ]
                      }
                    }}
                  />
                </Col>
              </Row>
            </ProCard>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default HomePage;
