import { apiLecturerList } from "@/services/user";
import { UserListItem } from "@/typings/user";
import { HomeOutlined } from "@ant-design/icons";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Search } from "./components/search";

const inter = Inter();

type Params = Promise<{ offset: number, url: { search: string } }>

type Props = {
    params: Params;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}


export default async function Home({ searchParams }: Props) {

    const query = await searchParams
    const current = Number(query?.current || 1);
    const search = query?.search
    const data = await apiLecturerList({ current: current, name: search });
    console.log(data.data);

    return (
        <main className={inter.className}>
            <header className="mb-4">
                <div className="container mx-auto py-4 flex justify-between items-center">
                    <Image src='https://dhhp.edu.vn/files/fa05873c-d71e-4b54-b82e-a76e73a2fbcd/logoUniversity.jpg' alt="LOGO" width={300} height={100} />
                    <Search />
                </div>
            </header>
            <div className="container mx-auto text-slate-800">
                <div className="text-2xl font-medium text-center mb-4 uppercase 2xl:mb-8">Sơ yếu lý lịch khoa học Giảng viên</div>
                <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-16 2xl:grid-cols-3">
                    {
                        data.data.data.map((item: UserListItem) => (
                            <div className="flex gap-4" key={item.id}>
                                <div className="w-40 h-40 bg-gray-300 rounded-full">
                                    <Image src={item.avatar || 'https://dhhp.edu.vn/logo/logo-65.png'} width={160} height={160} alt="AVATAR" className="rounded-full h-40 object-cover" />
                                </div>
                                <div className="flex flex-col gap-4 flex-1">
                                    <div className="text-xl font-medium">
                                        <Link href={`/profile/${item.userName}`} className="font-medium hover:text-blue-500">
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-2">
                                            <div>
                                                <span className="font-medium mr-2">Chức vụ:</span>
                                                <span>{item.position}</span>
                                            </div>
                                            <div className="line-clamp-1">
                                                <span className="font-medium mr-1">Đơn vị:</span>
                                                <span>{item.department}</span>
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
