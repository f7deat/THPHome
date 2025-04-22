/* eslint-disable @next/next/no-img-element */
import { apiLecturerList } from "@/services/user";
import { UserListItem } from "@/typings/user";
import { DoubleLeftOutlined, DoubleRightOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Filter } from "./components/filter";
import Breadcrumb from "./components/breadcrumb";
import Title from "./components/title";

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
    console.log(data.data);

    return (
        <main style={inter.style}>
            <Breadcrumb title="Sơ yếu lý lịch khoa học Giảng viên" />
            <div className="container mx-auto px-4 md:px-0 text-slate-800 mb-10 pt-4 2xl:pt-8">
                <Title title="Lý lịch khoa học giảng viên" subTitle="Sơ yếu" />
                <Filter />
                <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-10 2xl:grid-cols-4 mb-4 2xl:mb-8">
                    {
                        data.data.data.map((item: UserListItem) => (
                            <div className="flex flex-col my-shadow rounded-lg" key={item.id}>
                                <div className="w-full h-96 relative p-4">
                                    <div className="w-full h-full rounded-lg">
                                        <img src={item.avatar || 'https://cdn.vectorstock.com/i/500p/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg'} width={160} height={160} alt="AVATAR" className="rounded-lg h-full w-full object-cover border border-slate-200" />
                                    </div>
                                    <button type="button" className="bg-blue-500 text-white h-10 w-10 cursor-pointer hover:bg-blue-600 flex items-center justify-center absolute right-10 rounded bottom-1"><ShareAltOutlined /></button>
                                </div>
                                <div className="flex flex-col flex-1 px-4">
                                    <div className="text-xl mb-1">
                                        <Link href={`/profile/${item.userName}`} className="font-semibold hover:text-blue-500">
                                            {item.degreeCode} {item.name}
                                        </Link>
                                    </div>
                                    <div className="flex flex-col gap-1 mb-4 text-sm">
                                        <div className="line-clamp-1">
                                            <span className="text-gray-600">{item.department || '-'}</span>
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
        </main>
    );
}
