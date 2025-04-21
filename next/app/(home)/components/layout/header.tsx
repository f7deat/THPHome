/* eslint-disable @next/next/no-img-element */
import { FacebookFilled, InstagramFilled, LinkedinFilled, TikTokFilled } from "@ant-design/icons";
import Link from "next/link";
import { Search } from "../search";

const Header: React.FC = () => {
    return (
        <header>
            <div className="bg-slate-100">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 text-slate-700">
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
            <div className="container mx-auto py-4 md:flex justify-between items-center">
                <Link href='/' className="block md:mb-0">
                    <img src='https://dhhp.edu.vn/files/fa05873c-d71e-4b54-b82e-a76e73a2fbcd/logoUniversity.jpg' alt="LOGO" width={300} height={100} className="object-cover" />
                </Link>
                <Search />
            </div>
        </header>
    )
}

export default Header;