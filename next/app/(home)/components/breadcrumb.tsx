import { HomeOutlined } from "@ant-design/icons";
import { Roboto } from "next/font/google";
import Link from "next/link";

type Props = {
    title: string;
    path?: string[];
}

const roboto = Roboto({ subsets: ['latin'] });

const Breadcrumb : React.FC<Props> = ({ title }) => {
    return (
        <nav className="py-4 md:py-6 2xl:py-12 text-slate-900 mb-4 bg-cover" style={{
            backgroundImage: 'url(https://stc-oa.zdn.vn/resources/zoa-landing/v122023/images/bg.png)'
        }}>
            <div className="text-center text-xl 2xl:text-4xl font-semibold uppercase 2xl:mb-4" style={roboto.style}>{title}</div>
            <ul className="flex gap-4 justify-center">
                <li className="text-center text-sm 2xl:text-base font-medium mt-2">
                    <Link href='/' className="hover:text-blue-500"><HomeOutlined /> Trang chủ</Link>
                    </li>
            </ul>
        </nav>
    )
}

export default Breadcrumb