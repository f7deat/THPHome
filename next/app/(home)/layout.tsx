import type { Metadata } from "next";
import "../globals.css";
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import { ConfigProvider } from "antd";

export const metadata: Metadata = {
    title: "Sơ yếu lý lịch khoa học Giảng viên",
    description: "Sơ yếu lý lịch khoa học Giảng viên",
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ConfigProvider theme={{
            token: {
                fontFamily: 'inter, sans-serif'
            }
        }}>
            <Header />
            {children}
            <Footer />
        </ConfigProvider>
    );
}
