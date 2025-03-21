import { Inter } from 'next/font/google'
import { CaretDownFilled, EnvironmentFilled, HomeOutlined, MailFilled, PhoneFilled, TranslationOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { ConfigProvider, Dropdown } from 'antd';
import '../style.css';
import { apiLecturePublicInfo } from '@/services/user';
import { Metadata } from 'next';
import { Language, LecturerDetail } from '@/typings/user';
import dayjs from 'dayjs';
import MobileBar from '../components/mobile-bar';
import SideBar from '../components/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Sơ yếu lý lịch khoa học Giảng viên',
    description: 'Sơ yếu lý lịch khoa học Giảng viên',
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    const response = await apiLecturePublicInfo(slug);
    const data = response.data as LecturerDetail;

    const HeadTitle = (props: { title: string }) => (
        <div className='text-lg uppercase font-semibold text-[#0077c1] mb-2'>
            <h1>{props.title}</h1>
        </div>
    )

    return (
        <ConfigProvider
            theme={{
                components: {
                    Anchor: {
                        colorText: 'white',
                        fontFamily: inter.style.fontFamily
                    }
                }
            }}
        >
            <main style={inter.style}>
                <div className='hidden md:block'>
                    <SideBar data={data} />
                </div>
                <div className="flex-1 2xl:ml-96 md:ml-80">
                    <div className='flex justify-end border-b border-gray-200'>
                        <MobileBar data={data} />
                        <div className='h-14 w-14 flex items-center justify-center border-r border-gray-200 text-xl text-gray-600'>
                            <Link href='/' className='hover:text-blue-500'><HomeOutlined /></Link>
                        </div>
                        <div className='flex-1 flex justify-end gap-4 items-center px-4'>
                            <Dropdown menu={{
                                items: [
                                    { label: 'Tiếng Việt', key: 'vi' },
                                    { label: 'English', key: 'en' },
                                    { label: '中文', key: 'zh' },
                                    { label: '日本語', key: 'ja' },
                                    { label: '한국어', key: 'ko' }
                                ]
                            }}>
                                <button type='button' className='text-sm'>
                                    <TranslationOutlined /> Ngôn ngữ <CaretDownFilled />
                                </button>
                            </Dropdown>
                        </div>
                    </div>
                    <div className='p-4'>
                        <div id='introduction' className='mb-4 2xl:mb-8'>
                            <HeadTitle title='Giới thiệu' />
                            <div className='text-gray-600 mb-4'>{data.bio}</div>
                            <div className='mb-2'>
                                <span className='text-blue-500 mr-2'><EnvironmentFilled /></span>Địa chỉ: <span className='text-slate-600'>{data.address}, {data?.city}</span>
                            </div>
                            <div className='mb-2'>
                                <span className='text-blue-500 mr-2'><MailFilled /></span>Email: <span className='text-slate-600'>{data.email}</span>
                            </div>
                            <div className='mb-2'>
                                <span className='text-blue-500 mr-2'><PhoneFilled /></span>Điện thoại: <span className='text-slate-600'>{data.phoneNumber}</span>
                            </div>
                        </div>
                        <div id='edu' className='mb-4 2xl:mb-8'>
                            <HeadTitle title='Quá trình đào tạo' />
                            <div className='flex mb-1 bg-[#0077c1] text-white 2xl:text-base text-sm'>
                                <div className='w-10 flex justify-center py-1'>STT</div>
                                <div className='flex-1 py-1 font-medium px-2'>Bằng cấp</div>
                                <div className='flex-1 py-1 px-2'>Ngành / Chuyên ngành</div>
                                <div className='flex-1 py-1 px-2'>Nơi đào tạo</div>
                                <div className='w-40 py-1 px-2'>Năm tốt nghiệp</div>
                            </div>
                            {
                                data.educationHistories?.map((edu, index) => (
                                    <div key={index} className='flex mb-1'>
                                        <div className='w-10 flex justify-center py-1 border-b border-slate-100'>{index + 1}</div>
                                        <div className='flex-1 py-1 font-medium bg-slate-100 border-b border-slate-100 px-2'>{edu.degree}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 px-2 border-t'>{edu.major}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 bg-slate-100 px-2 border-t'>{edu.institution}</div>
                                        <div className='w-40 py-1 border-b border-slate-100 px-2 border-t'>{edu.graduationYear}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div id='working' className='mb-4 2xl:mb-8'>
                            <HeadTitle title='Quá trình công tác' />
                            <div className='flex mb-1 bg-[#0077c1] text-white 2xl:text-base text-sm'>
                                <div className='w-10 flex justify-center py-1'>STT</div>
                                <div className='flex-1 py-1 font-medium px-2'>Thời gian</div>
                                <div className='flex-1 py-1 px-2'>Chức danh</div>
                                <div className='flex-1 py-1 px-2'>Đơn vị công tác</div>
                            </div>
                            {
                                data.workingExperiences?.map((work, index) => (
                                    <div key={index} className='flex mb-1'>
                                        <div className='w-10 flex justify-center py-1 border-b border-slate-100'>{index + 1}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 bg-slate-100 px-2 border-t'>{work.startDate ? dayjs(work.startDate).format('DD/MM/YYYY') : '-'} - {work.endDate ? dayjs(work.endDate).format('DD/MM/YYYY') : '-'}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 px-2 border-t'>{work.position}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 bg-slate-100 px-2 border-t'>{work.companyName}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div id='teaching' className='mb-4 2xl:mb-8'>
                            <HeadTitle title='Quá trình giảng dạy' />
                            <div className='flex mb-1 bg-[#0077c1] text-white 2xl:text-base text-sm'>
                                <div className='w-10 flex justify-center py-1'>STT</div>
                                <div className='flex-1 py-1 font-medium px-2'>Học phần đã/đang giảng dạy</div>
                                <div className='flex-1 py-1 px-2'>Chương trình đào tạo/trình độ</div>
                            </div>
                            {
                                data.teachingExperiences?.map((teach, index) => (
                                    <div key={index} className='flex mb-1'>
                                        <div className='w-10 flex justify-center py-1 border-b border-slate-100'>{index + 1}</div>
                                        <div className='flex-1 py-1 font-medium bg-slate-100 border-b border-slate-100 px-2'>{teach.courseCode} - {teach.courseName}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 px-2 border-t'>{teach.level}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div id='language' className='mb-4 2xl:mb-8'>
                            <HeadTitle title='Trình độ ngoại ngữ' />
                            <div className='flex mb-1 bg-[#0077c1] text-white 2xl:text-base text-sm'>
                                <div className='w-10 flex justify-center py-1'>STT</div>
                                <div className='flex-1 py-1 font-medium px-2'>Ngôn ngữ</div>
                                <div className='flex-1 py-1 px-2'>Chứng chỉ</div>
                                <div className='flex-1 py-1 px-2'>Trình độ</div>
                            </div>
                            {
                                data.languages?.map((lang: Language, index: number) => (
                                    <div key={index} className='flex mb-1'>
                                        <div className='w-10 flex justify-center py-1 border-b border-slate-100'>{index + 1}</div>
                                        <div className='flex-1 py-1 font-medium bg-slate-100 border-b border-slate-100 px-2'>{lang.language}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 px-2 border-t'>{lang.certificate}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 bg-slate-100 px-2 border-t'>{lang.level}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div id='research' className='mb-4 2xl:mb-8'>
                            <HeadTitle title='Các đề tài, dự án đã chủ trì hoặc tham gia' />
                            <div className='flex mb-1 bg-[#0077c1] text-white 2xl:text-base text-sm'>
                                <div className='w-10 flex justify-center py-1'>STT</div>
                                <div className='flex-1 py-1 font-medium px-2'>Tên đề tài</div>
                                <div className='w-32 py-1 px-2'>Năm bắt đầu</div>
                                <div className='w-32 py-1 px-2'>Năm kết thúc</div>
                            </div>
                            {
                                data.researchProjects?.map((research, index) => (
                                    <div key={index} className='flex mb-1'>
                                        <div className='w-10 flex justify-center py-1 border-b border-slate-100'>{index + 1}</div>
                                        <div className='flex-1 py-1 font-medium bg-slate-100 border-b border-slate-100 px-2'>{research.name}</div>
                                        <div className='w-32 py-1 border-b border-slate-100 px-2 border-t'>{research.startYear}</div>
                                        <div className='w-32 py-1 border-b border-slate-100 bg-slate-100 px-2 border-t'>{research.endYear}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div id='journal' className='mb-4 2xl:mb-8'>
                            <HeadTitle title='Kết quả NCKH đã công bố' />
                            <div className='flex mb-1 bg-[#0077c1] text-white 2xl:text-base text-sm'>
                                <div className='w-10 flex justify-center py-1'>STT</div>
                                <div className='flex-1 py-1 font-medium px-2'>Tên bài báo</div>
                                <div className='flex-1 py-1 px-2'>Tên tạp chí / ISSN</div>
                                <div className='w-12 py-1 px-2'>Tập</div>
                                <div className='w-12 py-1 px-2'>Số</div>
                                <div className='w-20 py-1 px-2'>Trang</div>
                                <div className='w-32 py-1 px-2'>Năm công bố</div>
                            </div>
                            {
                                data.journals?.map((journal, index) => (
                                    <div key={index} className='flex mb-1'>
                                        <div className='w-10 flex justify-center py-1 border-b border-slate-100'>{index + 1}</div>
                                        <div className='flex-1 py-1 font-medium bg-slate-100 border-b border-slate-100 px-2'>{journal.name}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 px-2 border-t'>{journal.issn}</div>
                                        <div className='w-12 py-1 border-b border-slate-100 bg-slate-100 px-2 border-t'>{journal.volume}</div>
                                        <div className='w-12 py-1 border-b border-slate-100 px-2 border-t'>{journal.issue}</div>
                                        <div className='w-20 py-1 border-b border-slate-100 bg-slate-100 px-2 border-t'>{journal.page}</div>
                                        <div className='w-32 py-1 border-b border-slate-100 px-2 border-t'>{journal.publishYear}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='mb-4 2xl:mb-8' id='book'>
                            <HeadTitle title='Biên soạn sách phục vụ đào tạo (trung cấp, cao đẳng, đại học và sau đại học)' />
                            <div className='flex mb-1 bg-[#0077c1] text-white 2xl:text-base text-sm'>
                                <div className='w-10 flex justify-center py-1'>STT</div>
                                <div className='flex-1 py-1 font-medium px-2'>Tên sách</div>
                                <div className='w-20 py-1 px-2'>Năm</div>
                                <div className='flex-1 py-1 px-2'>Nhà xuất bản</div>
                                <div className='flex-1 py-1 px-2'>Tác giả</div>
                            </div>
                            {
                                data.books?.map((book, index) => (
                                    <div key={index} className='flex mb-1'>
                                        <div className='w-10 flex justify-center py-1 border-b border-slate-100'>{index + 1}</div>
                                        <div className='flex-1 py-1 font-medium bg-slate-100 border-b border-slate-100 px-2'>{book.name}</div>
                                        <div className='w-20 py-1 border-b border-slate-100 px-2 border-t'>{book.publishYear}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 bg-slate-100 px-2 border-t'>{book.publisher}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 px-2 border-t'>{book.authors}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div id='awards' className='mb-4 2xl:mb-8'>
                            <HeadTitle title='Giải thưởng' />
                            <div className='flex mb-1 bg-[#0077c1] text-white 2xl:text-base text-sm'>
                                <div className='w-10 flex justify-center py-1'>STT</div>
                                <div className='flex-1 py-1 px-2'>Giải thưởng</div>
                                <div className='w-20 py-1 px-2'>Năm</div>
                            </div>
                            {
                                data.awards?.map((award, index) => (
                                    <div key={index} className='flex mb-1'>
                                        <div className='w-10 flex justify-center py-1 border-b border-slate-100'>{index + 1}</div>
                                        <div className='flex-1 py-1 font-medium bg-slate-100 border-b border-slate-100 px-2'>{award.name}</div>
                                        <div className='w-20 py-1 border-b border-slate-100 px-2 border-t'>{award.year}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div id='achivement' className='mb-4 2xl:mb-8'>
                            <HeadTitle title='Thành tựu hoạt động khoa học khác' />
                            <div className='flex mb-1 bg-[#0077c1] text-white 2xl:text-base text-sm'>
                                <div className='w-10 flex justify-center py-1'>STT</div>
                                <div className='flex-1 py-1 px-2'>Nội dung</div>
                                <div className='w-32 py-1 px-2'>Năm đạt</div>
                            </div>
                            {
                                data.achievements?.map((ach, index) => (
                                    <div key={index} className='flex mb-1'>
                                        <div className='w-10 flex justify-center py-1 border-b border-slate-100'>{index + 1}</div>
                                        <div className='flex-1 py-1 font-medium bg-slate-100 border-b border-slate-100 px-2'>{ach.name}</div>
                                        <div className='w-32 py-1 border-b border-slate-100 px-2 border-t'>{ach.year}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </main>
        </ConfigProvider>
    )
}

Page.noLayout = true;