import { AppstoreAddOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";

const AppItem = ({ url, name }: { url: string, name: string }) => {
    return (
        <div onClick={() => window.open(`${url}`, '_blank')} className='cursor-pointer'>
            <div className='border p-4 rounded hover:border-blue-500 h-full'>
                <div className='font-semibold uppercase flex gap-2 items-center'>
                    <div className='h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white'><AppstoreAddOutlined /></div>
                    <div className='text-base text-slate-800'>{name}</div>
                </div>
            </div>
        </div>
    )
}

const Application: React.FC = () => {
    return (
        <ProCard title="Ứng dụng" headerBordered className='h-full'>
            <div className='grid md:grid-cols-4 gap-2 md:gap-4'>
                <AppItem url={`https://qlvb.dhhp.edu.vn/`} name="Quản lý văn bản" />
                <AppItem url={`https://qltl.dhhp.edu.vn/`} name="Quản lý tài liệu" />
                <AppItem url={`https://qlbg.dhhp.edu.vn/`} name="Quản lý bài giảng" />
                <AppItem url={`https://admin.exam.dhhp.edu.vn/`} name="Ngân hàng ôn tập" />
                <AppItem url={`https://office.dhhp.edu.vn/`} name="HPUni's Office" />
                <AppItem url={`https://admin.tuyensinh.dhhp.edu.vn/`} name="Tuyển sinh" />
                <AppItem url={`https://admin.dtn.dhhp.edu.vn/`} name="Đoàn TNCS Hồ Chí Minh" />
                <AppItem url={`https://qtdh.dhhp.edu.vn/`} name="Quản trị đào tạo" />
            </div>
        </ProCard>
    )
}

export default Application;