/* eslint-disable @next/next/no-img-element */
import { FacebookFilled, HomeOutlined, InstagramFilled, LinkedinFilled, PhoneOutlined, SearchOutlined, TagOutlined, TikTokFilled } from "@ant-design/icons";
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <header className="bg-white">
            <div className="bg-blue-500">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 text-white">
                            <a href="https://facebook.com" className="w-10 h-10 flex justify-center items-center">
                                <FacebookFilled />
                            </a>
                            <a href="https://facebook.com" className="w-10 h-10 flex justify-center items-center">
                                <InstagramFilled />
                            </a>
                            <a href="https://facebook.com" className="w-10 h-10 flex justify-center items-center">
                                <LinkedinFilled />
                            </a>
                            <a href="https://facebook.com" className="w-10 h-10 flex justify-center items-center">
                                <TikTokFilled />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-4 md:flex justify-between items-center font-bold text-slate-900">
                <Link href='/' className="block md:mb-0">
                    <img src='https://dhhp.edu.vn/files/fa05873c-d71e-4b54-b82e-a76e73a2fbcd/logoUniversity.jpg' alt="LOGO" width={300} height={100} className="object-contain w-72" />
                </Link>
                <div className="flex-1">
                    <div className="flex justify-end gap-4 2xl:gap-8">
                        <Link href='/' className="text-slate-700 hover:text-blue-500"><HomeOutlined /> Trang chủ</Link>
                        <Link href='/article' className="text-slate-700 hover:text-blue-500"><TagOutlined /> Tin tức & Sự kiện</Link>
                        <Link href='/contact' className="text-slate-700 hover:text-blue-500"><PhoneOutlined /> Liên hệ</Link>
                        <Link href='/search' className="text-slate-700 hover:text-blue-500"><SearchOutlined /> Tìm kiếm</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;