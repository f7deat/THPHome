import Image from 'next/image'
import { Inter } from 'next/font/google'
import { CaretDownFilled, FacebookFilled, GlobalOutlined, HomeOutlined, LinkedinFilled, TranslationOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Anchor, ConfigProvider, Dropdown } from 'antd';
import '../style.css';

const inter = Inter({ subsets: ['latin'] })

export default function Page() {
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
            <main className="flex" style={inter.style}>
                <div className="w-96 shadow h-screen flex flex-col items-center justify-center bg-[#0077c1] text-white">
                    <div className="w-52 h-52 rounded-full border-4 border-slate-100 mb-4">
                        <Image src='https://dhhp.edu.vn/img/2024-01-26/HT%20-%20Bui%20Xuan%20Hai.jpg' alt="John Doe" className="rounded-full object-cover w-full h-full" width={200} height={200} />
                    </div>
                    <h1 className="text-2xl font-semibold 2xl:text-3xl mb-2">PGS.TS Bùi Xuân Hải</h1>
                    <div className='mb-2'>Ban giám hiệu</div>
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
                <div className="flex-1">
                    <div className='flex justify-end border-b border-gray-200'>
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
                    <div className='p-4' id='introduction'>
                        <div className='text-2xl'>
                            <h1>Giới thiệu</h1>
                        </div>
                        <div className='text-gray-600'>
                            <p>PGS.TS Bùi Xuân Hải, sinh năm 1963 tại Hà Nội, là người có nhiều năm kinh nghiệm trong lĩnh vực giáo dục và nghiên cứu khoa học. Ông hiện đang là Phó Hiệu trưởng trường Đại học Hà Nội.</p>
                        </div>
                    </div>
                </div>
            </main>
        </ConfigProvider>
    )
}