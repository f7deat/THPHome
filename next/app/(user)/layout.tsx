import type { Metadata } from "next";
import "../globals.css";

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
        <div>
            {children}
        </div>
    );
}
