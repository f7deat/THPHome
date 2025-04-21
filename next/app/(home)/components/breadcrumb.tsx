type Props = {
    title: string;
    path?: string[];
}

const Breadcrumb : React.FC<Props> = ({ title }) => {
    return (
        <nav className="bg-blue-900 py-4 md:py-6 2xl:py-10 text-white mb-4">
            <div className="text-center text-xl 2xl:text-2xl font-medium uppercase">{title}</div>
        </nav>
    )
}

export default Breadcrumb