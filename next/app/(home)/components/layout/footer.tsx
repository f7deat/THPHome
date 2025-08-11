/* eslint-disable @next/next/no-img-element */
import { BankOutlined, FacebookFilled, InstagramFilled, LinkedinFilled, MailOutlined, PhoneOutlined, RightCircleOutlined, TikTokFilled } from "@ant-design/icons";

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-white">
            <div className="border-b border-slate-700">
                <div className="container mx-auto">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-8 border-r border-slate-700">
                            <div className="flex items-cente gap-4">
                                <div className="w-12 h-12 border rounded-full border-blue-700 flex items-center justify-center">
                                    <BankOutlined />
                                </div>
                                <div className="flex-1">
                                    <div className="text-blue-400 text-sm">Địa chỉ</div>
                                    <div className="text-white font-semibold text-lg">171 Phan Đăng Lưu</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 border-r border-slate-700">
                            <div className="flex items-cente gap-4">
                                <div className="w-12 h-12 border rounded-full border-blue-700 flex items-center justify-center">
                                    <PhoneOutlined />
                                </div>
                                <div className="flex-1">
                                    <div className="flex gap-2">
                                        <div className="text-blue-400 text-sm">Hotline</div>
                                        <div className="text-white font-semibold text-lg">0773.171.171</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 border rounded-full border-blue-700 flex items-center justify-center">
                                    <MailOutlined />
                                </div>
                                <div className="flex-1">
                                    <div className="text-blue-400 text-sm">Email</div>
                                    <div className="text-white font-semibold text-lg">info@dhhp.edu.vn</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto p-4 2xl:py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <div className="mb-4 2xl:mb-8">
                            <img src="https://dhhp.edu.vn/css/imgs/logo1.png" alt="Logo" className="md:w-80" />
                        </div>
                        <div className="text-white mb-4 text-sm">
                            Tìm chúng tôi trên
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 border rounded border-blue-700 flex items-center justify-center">
                                <FacebookFilled />
                            </div>
                            <div className="h-10 w-10 border rounded border-blue-700 flex items-center justify-center">
                                <InstagramFilled />
                            </div>
                            <div className="h-10 w-10 border rounded border-blue-700 flex items-center justify-center">
                                <LinkedinFilled />
                            </div>
                            <div className="h-10 w-10 border rounded border-blue-700 flex items-center justify-center">
                                <TikTokFilled />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold mb-4 text-lg uppercase ">
                            <span className="border-b-2 pb-1">Liên kết</span>
                        </div>
                        <ul className="text-sm text-blue-100 grid grid-cols-2 gap-2">
                            <li><a href="#"><RightCircleOutlined className="mr-2" />Giới thiệu</a></li>
                            <li><a href="#"><RightCircleOutlined className="mr-2" />Đào tạo</a></li>
                            <li><a href="#"><RightCircleOutlined className="mr-2" />Nghiên cứu</a></li>
                            <li><a href="#"><RightCircleOutlined className="mr-2" />Hợp tác quốc tế</a></li>
                            <li><a href="https://dhhp.edu.vn" className="hover:text-white"><RightCircleOutlined className="mr-2" />Tin tức</a></li>
                            <li><a href="https://tuyensinh.dhhp.edu.vn" className="hover:text-white"><RightCircleOutlined className="mr-2" />Tuyển sinh</a></li>
                            <li><a href="https://career.dhhp.edu.vn" className="hover:text-white"><RightCircleOutlined className="mr-2" />Cơ hội việc làm</a></li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-bold mb-4 text-lg uppercase ">
                            <span className="border-b-2 pb-1">Thư viện ảnh</span>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold mb-4 text-lg uppercase ">
                            <span className="border-b-2 pb-1">Liên hệ</span>
                        </div>
                        <div className="mb-2 text-sm">Đăng ký nhận thông tin mới nhất</div>
                        <div className="flex mb-4">
                            <input type="email" placeholder="Nhập email của bạn" className="flex-1 p-2 rounded-l-md border border-blue-700" />
                            <button className="bg-blue-700 text-white p-2 rounded-r-md">Đăng ký</button>
                        </div>
                        <div className="mb-2 text-sm">Cài đặt ứng dụng</div>
                        <div className="flex gap-2">
                            <img src="	https://dhhp.edu.vn/css/imgs/google-play.svg" alt="Google Play" className="h-12" />
                            <img src="https://dhhp.edu.vn/css/imgs/app-store.svg" alt="App Store" className="h-12" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-slate-800">
                <div className="container mx-auto text-center p-4">
                    <p>&copy; 2025 Trường Đại học Hải Phòng. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;