import { Quicksand } from "next/font/google";

type Props = {
    title?: string;
    subTitle?: string;
}

const quickSand = Quicksand({ subsets: ['latin'] });

const Title : React.FC<Props> = ({ title, subTitle }) => {
    return (
        <div className="mb-4 md:mb-6 text-center">
            <div className="text-blue-500 text-sm uppercase font-bold">{subTitle}</div>
            <div className="text-2xl font-bold text-slate-900 mb-3 2xl:text-3xl" style={quickSand.style}>{title}</div>
            <div className="w-28 border-2 border-blue-500 mx-auto mb-4"></div>
        </div>
    )
}

export default Title;