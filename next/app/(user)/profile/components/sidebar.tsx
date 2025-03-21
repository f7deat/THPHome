/* eslint-disable @next/next/no-img-element */
import { LecturerDetail } from "@/typings/user";
import { FacebookFilled, GlobalOutlined, LinkedinFilled } from "@ant-design/icons";
import { Anchor } from "antd";
import Link from "next/link";

type Props = {
    data: LecturerDetail;
}

const SideBar: React.FC<Props> = ({ data }) => {
    return (
        <>
            <div className="md:w-80 2xl:w-96 h-full shadow flex flex-col items-center justify-center bg-[#0077c1] text-white md:fixed top-0 left-0 bottom-0">
                <div className="w-48 h-48 2xl:w-52 2xl:h-52 rounded-full border-4 border-slate-100 mb-4">
                    <img src={data.avatar || 'https://dhhp.edu.vn/logo/logo-65.png'} alt="John Doe" className="rounded-full object-cover w-full h-full" />
                </div>
                <h1 className="text-xl font-semibold 2xl:text-3xl mb-2">{data.name}</h1>
                <div className='mb-2'>{data.department?.name}</div>
                <div className="flex gap-4 mt-6 mb-4 text-2xl">
                    <Link href={data.facebook || '#'} className="text-white"><FacebookFilled /></Link>
                    <Link href={data.linkedin || '#'} className="text-white"><LinkedinFilled /></Link>
                    <Link href={data.website || '#'} className="text-white"><GlobalOutlined /></Link>
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
                                    key: 'working',
                                    title: 'Quá trình công tác',
                                    href: '#working'
                                },
                                {
                                    key: 'teaching',
                                    title: 'Kinh nghiệm giảng dạy',
                                    href: '#teaching'
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
                                    key: 'journal',
                                    title: 'Bài báo / Tạp chí',
                                    href: '#journal'
                                },
                                {
                                    key: 'book',
                                    title: 'Sách / Giáo trình',
                                    href: '#book'
                                },
                                {
                                    key: 'awards',
                                    title: 'Giải thưởng',
                                    href: '#awards'
                                },
                                {
                                    key: 'achivement',
                                    title: 'Thành tựu',
                                    href: '#achivement'
                                }
                            ]} />
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideBar;