import type { Metadata } from "next";
import "../globals.css";
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import { ConfigProvider } from "antd";
import { Quicksand } from "next/font/google";

export const metadata: Metadata = {
    title: "Sơ yếu lý lịch khoa học Giảng viên",
    description: "Sơ yếu lý lịch khoa học Giảng viên",
};

const quicksand = Quicksand({ subsets: ['latin'] });

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ConfigProvider theme={{
            token: {
                fontFamily: quicksand.style.fontFamily,
                fontSize: 16
            }
        }}>
            <div className={quicksand.className}>
                <Header />
                {children}
                <Footer />
            </div>
        </ConfigProvider>
    );
}
