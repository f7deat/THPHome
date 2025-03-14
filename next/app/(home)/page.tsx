/* eslint-disable @next/next/no-img-element */
import { apiLecturerList } from "@/services/user";
import { UserListItem } from "@/typings/user";
import { DoubleLeftOutlined, DoubleRightOutlined, HomeOutlined } from "@ant-design/icons";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Search } from "./components/search";
import { Filter } from "./components/filter";

const inter = Inter({ subsets: ['latin'] });

type Props = {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}


export default async function Home({ searchParams }: Props) {

    const query = await searchParams
    const current = Number(query?.current || 1);
    const search = query?.search || '';
    const departmentCode = query?.departmentCode;
    const data = await apiLecturerList({ current: current, departmentCode, name: search });

    return (
        <main className={inter.className}>
            <header className="mb-4 px-4 md:px-0">
                <div className="container mx-auto py-4 md:flex justify-between items-center">
                    <Link href='/' className="pb-4 block md:mb-0">
                        <img src='https://dhhp.edu.vn/files/fa05873c-d71e-4b54-b82e-a76e73a2fbcd/logoUniversity.jpg' alt="LOGO" width={300} height={100} className="object-cover" />
                    </Link>
                    <Search />
                </div>
            </header>
            <div className="container mx-auto text-slate-800">
                <div className="text-2xl font-medium text-center mb-4 uppercase">Sơ yếu lý lịch khoa học Giảng viên</div>
                <Filter />
                <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-16 2xl:grid-cols-3 mb-4 2xl:mb-8">
                    {
                        data.data.data.map((item: UserListItem) => (
                            <div className="flex gap-4" key={item.id}>
                                <div className="w-40 h-40 bg-gray-300 rounded-full">
                                    <img src={item.avatar || 'https://cdn.vectorstock.com/i/500p/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg'} width={160} height={160} alt="AVATAR" className="rounded-full h-40 object-cover" />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <div className="text-xl font-medium">
                                        <Link href={`/profile/${item.userName}`} className="font-medium hover:text-blue-500">
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div className="text-gray-500 mb-2">{item.academicDegree === item.academicTitle ? item.academicDegree : `${item.academicDegree}.${item.academicTitle}`}</div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-2">
                                            <div className="line-clamp-1">
                                                <span className="font-medium mr-1">Đơn vị:</span>
                                                <span className="text-gray-600">{item.department}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="font-medium">Email:</div>
                                                <div>
                                                    <a href="mailto:" className="hover:underline">
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <nav className="mb-4">
                    <ul className="flex justify-center gap-4">
                        <li>
                            <Link href={`/?current=${current - 1}&departmentCode=${departmentCode}&search=${search}`} className="px-4 py-1 border border-slate-300 hover:border-blue-500">
                                <DoubleLeftOutlined /> Trang trước
                            </Link>
                        </li>
                        <li>
                            <Link href={`/?current=${current + 1}&departmentCode=${departmentCode}&search=${search}`} className="px-4 py-1 border border-slate-300 hover:border-blue-500">
                                Trang sau <DoubleRightOutlined />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <footer className="flex items-center justify-center py-4 mt-4 2xl:mt-10">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://dhhp.edu.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <HomeOutlined />
                    Trang chủ
                </a>
            </footer>
        </main>
    );
}
