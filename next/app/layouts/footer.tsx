import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 pt-5 text-white">
            <div className="container mx-auto">
                <div className="flex text-sm pb-4">
                    <div className="md:w-1/5 d-none d-md-block">
                        <div>
                            <img src="https://dhhp.edu.vn/logo/logo-65.png" style={{ width: '130px', height: '130px' }} alt="LOGO 65 YEAR" />
                        </div>
                        <ul className="flex mb-0 mt-3 items-center gap-2">
                            <li className="h-5 w-5">
                                <a href="https://www.facebook.com/HaiPhongUniversity" className="text-white hover:shadow-lg shadow text-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                    </svg>
                                </a>
                            </li>
                            <li className="h-5 w-5"><a href="https://t.me/haiphonguniversity" className="text-white shadow text-sky-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                                </svg>
                            </a>
                            </li>
                        </ul>
                    </div>
                    <div className="md:w-2/5">
                        <div className="font-bold mb-2 uppercase text-base">Về chúng tôi</div>
                        <div className="mb-2">
                            <i className="fas fa-home mr-2" />Trường Đại học Hải Phòng
                        </div>
                        <div className="mb-2">
                            <i className="fas fa-phone mr-2" />Điện thoại: (+84225) 3876 338
                        </div>
                        <div className="mb-2">
                            <i className="fas fa-print mr-2" />Fax: (+84225) 3876 893
                        </div>
                        <div className="mb-2">
                            <i className="fas fa-map-marker-alt mr-2" />Cơ sở 1: 171 Phan Đăng Lưu , Kiến An, Hải Phòng, Việt Nam.
                        </div>
                        <div className="mb-2">
                            <i className="fas fa-map-marker-alt mr-2" />Cơ sở 2: 246B - Đà nẵng - Ngô Quyền - Hải Phòng
                        </div>
                        <div className="mb-2">
                            <i className="fas fa-map-marker-alt mr-2" />Cơ sở 3: 49 Trần Phú - Ngô Quyền - Hải Phòng
                        </div>
                    </div>
                    <div className="md:w-2/5">
                        <div className="font-bold mb-2 uppercase text-base">Liên kết</div>
                        <div>
                            <div className="mb-2">
                                <i className="fa-solid fa-caret-right" />
                                <a href="https://dttx.dhhp.edu.vn/">TT Ngoại ngữ, Tin học - ĐT Thường xuyên</a>
                            </div>
                            {/* <div className="mb-2">
                                <i className="fa-solid fa-caret-right" />
                                <a href="https://thptphandangluu.haiphong.edu.vn/homegd2">Trường THPT Phan Đăng Lưu</a>
                            </div> */}
                            <div className="mb-2">
                                <i className="fa-solid fa-caret-right" />
                                <a href="https://sdh.dhhp.edu.vn/">Phòng quản lý sau Đại học</a>
                            </div>
                            <div className="mb-2">
                                <i className="fa-solid fa-caret-right" />
                                <a href="https://fit.dhhp.edu.vn/">Khoa Công Nghệ Thông Tin</a>
                            </div>
                            <div className="mb-2">
                                <i className="fa-solid fa-caret-right" />
                                <a href="https://old.dhhp.edu.vn/?page_id=3770&lang=vi">Ba công khai</a>
                            </div>
                            <div className="mb-2">
                                <i className="fa-solid fa-caret-right" />
                                <a href="http://tuyensinh.dhhp.edu.vn/">Tuyển sinh 2025</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 d-none d-md-block">
                        <div className="font-bold mb-2 uppercase text-base">Liên hệ</div>
                        <div className="mb-2">
                            <i className="fa-solid fa-caret-right" />
                            Hotline: (+84225) 3876 338
                        </div>
                        <div className="mb-2">
                            <i className="fa-solid fa-caret-right" />
                            8:AM - 5:PM UTC+7
                        </div>
                        <div className="mb-2">
                            <i className="fa-solid fa-caret-right" />
                            Email: <a href="mailto:info@dhhp.edu.vn">info@dhhp.edu.vn</a>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <div>
                                <a href="javascript:void(0);">
                                    <img src="https://dhhp.edu.vn/css/imgs/google-play.svg" alt="google-play" width={145} />
                                </a>
                            </div>
                            <div>
                                <a href="javascript:void(0);"><img src="https://dhhp.edu.vn/css/imgs/app-store.svg" alt="app-store" width={145} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="container mx-auto">
                    <div className="flex justify-between items-center py-2 text-sm gap-2 flex-col flex-col-reverse md:flex-row">
                        <div className="text-gray-600 flex-1">Copyright © 2025 Trường Đại học Hải Phòng</div>
                        <div className="flex jusify-end gap-2">
                            <div className="dropdown">
                                <button className="btn btn-sm dropdown-toggle text-gray-600" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fas fa-globe me-2" />
                                    Ngôn ngữ
                                </button>
                                <ul className="hidden">
                                    <li>
                                        <Link className="dropdown-item" href="/?locale=en-US">
                                            <span role="img" aria-label="English" style={{ marginRight: '8px' }}>🇺🇸</span>
                                            English
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" href="/?locale=zh-CN">
                                            <span role="img" aria-label="简体中文" style={{ marginRight: '8px' }}>🇨🇳</span>
                                            简体中文
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" href="/?locale=ja-JP">
                                            <span role="img" aria-label="日本語" style={{ marginRight: '8px' }}>🇯🇵</span>
                                            日本語
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" href="/?locale=ko-KR">
                                            <span role="img" aria-label="한국어" style={{ marginRight: '8px' }}>🇰🇷</span>
                                            한국어
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" href="/?locale=vi-VN">
                                            <span role="img" aria-label="Tiếng Việt" style={{ marginRight: '8px' }}>🇻🇳</span>
                                            Tiếng Việt
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <a href="#" className="btn btn-sm text-gray-600">
                                Điều khoản
                            </a>
                            <a href="#" className="btn btn-sm text-gray-600">
                                Chính sách
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer;