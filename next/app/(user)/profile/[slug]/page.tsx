import { Inter } from 'next/font/google'
import { BarsOutlined, CaretDownFilled, EnvironmentFilled, FacebookFilled, GlobalOutlined, HomeOutlined, LinkedinFilled, MailFilled, PhoneFilled, TranslationOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Anchor, ConfigProvider, Dropdown, Image } from 'antd';
import '../style.css';
import { apiLecturePublicInfo } from '@/services/user';
import { Metadata } from 'next';
import { Language, LecturerDetail } from '@/typings/user';

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
    console.log(data);

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
                <div className="w-96 shadow hidden md:flex flex-col items-center justify-center bg-[#0077c1] text-white fixed top-0 left-0 bottom-0">
                    <div className="w-52 h-52 rounded-full border-4 border-slate-100 mb-4">
                        <Image src={data.avatar || 'https://dhhp.edu.vn/logo/logo-65.png'} alt="John Doe" className="rounded-full object-cover w-full h-full" width={200} height={200} />
                    </div>
                    <h1 className="text-2xl font-semibold 2xl:text-3xl mb-2">{data.name}</h1>
                    <div className='mb-2'>{data.department?.name}</div>
                    <div className="flex gap-4 mt-6 mb-4 text-2xl">
                        <Link href="#"><FacebookFilled /></Link>
                        <Link href="#"><LinkedinFilled /></Link>
                        <Link href="#"><GlobalOutlined /></Link>
                    </div>

                    <div>
                        <ul className="text-center">
                            <Anchor
                                className='text-white my-anchor'
                                items={[
                                    {
                                        key: 'introduction',
                                        title: 'Giới thiệu',
                                        href: '#introduction'
                                    },
                                    {
                                        key: 'edu',
                                        title: 'Học vấn',
                                        href: '#edu'
                                    },
                                    {
                                        key: 'language',
                                        title: 'Ngoại ngữ',
                                        href: '#language'
                                    },
                                    {
                                        key: 'research',
                                        title: 'Nghiên cứu khoa học',
                                        href: '#research'
                                    },
                                    {
                                        key: 'awards',
                                        title: 'Giải thưởng',
                                        href: '#awards'
                                    }
                                ]} />
                        </ul>
                    </div>
                </div>
                <div className="flex-1 md:ml-96">
                    <div className='flex justify-end border-b border-gray-200'>
                        <div className='h-14 w-14 flex md:hidden items-center justify-center border-r border-gray-200 text-xl text-gray-600'>
                            <Link href='/' className='hover:text-blue-500'><BarsOutlined /></Link>
                        </div>
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
                        <div id='language' className='mb-4 2xl:mb-8'>
                            <HeadTitle title='Ngoại ngữ' />
                            <div className='flex mb-1 bg-[#0077c1] text-white'>
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
                        <div id='edu' className='mb-4 2xl:mb-8'>
                            <HeadTitle title='Học vấn' />
                            <div className='flex mb-1 bg-[#0077c1] text-white'>
                                <div className='w-10 flex justify-center py-1'>STT</div>
                                <div className='flex-1 py-1 font-medium px-2'>Bằng cấp</div>
                                <div className='flex-1 py-1 px-2'>Ngành / Chuyên ngành</div>
                                <div className='flex-1 py-1 px-2'>Nơi đào tạo</div>
                                <div className='flex-1 py-1 px-2'>Năm tốt nghiệp</div>
                            </div>
                            {
                                data.educationHistories?.map((edu, index) => (
                                    <div key={index} className='flex mb-1'>
                                        <div className='w-10 flex justify-center py-1 border-b border-slate-100'>{index + 1}</div>
                                        <div className='flex-1 py-1 font-medium bg-slate-100 border-b border-slate-100 px-2'>{edu.degree}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 px-2 border-t'>{edu.major}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 bg-slate-100 px-2 border-t'>{edu.institution}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 px-2 border-t'>{edu.graduationYear}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div id='research' className='mb-4 2xl:mb-8'>
                            <HeadTitle title='Nghiên cứu khoa học' />
                            <div className='flex mb-1 bg-[#0077c1] text-white'>
                                <div className='w-10 flex justify-center py-1'>STT</div>
                                <div className='flex-1 py-1 font-medium px-2'>Tên đề tài</div>
                                <div className='flex-1 py-1 px-2'>Năm bắt đầu</div>
                                <div className='flex-1 py-1 px-2'>Năm kết thúc</div>
                                </div>
                            {
                                data.researchProjects?.map((research, index) => (
                                    <div key={index} className='flex mb-1'>
                                        <div className='w-10 flex justify-center py-1 border-b border-slate-100'>{index + 1}</div>
                                        <div className='flex-1 py-1 font-medium bg-slate-100 border-b border-slate-100 px-2'>{research.name}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 px-2 border-t'>{research.startYear}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 bg-slate-100 px-2 border-t'>{research.endYear}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div id='awards'>
                            <HeadTitle title='Giải thưởng' />
                            <div className='flex mb-1 bg-[#0077c1] text-white'>
                                <div className='w-10 flex justify-center py-1'>STT</div>
                                <div className='flex-1 py-1 px-2'>Giải thưởng</div>
                                <div className='flex-1 py-1 px-2'>Năm</div>
                            </div>
                            {
                                data.awards?.map((award, index) => (
                                    <div key={index} className='flex mb-1'>
                                        <div className='w-10 flex justify-center py-1 border-b border-slate-100'>{index + 1}</div>
                                        <div className='flex-1 py-1 font-medium bg-slate-100 border-b border-slate-100 px-2'>{award.name}</div>
                                        <div className='flex-1 py-1 border-b border-slate-100 px-2 border-t'>{award.year}</div>
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