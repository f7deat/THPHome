"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const Search: React.FC = () => {

    const [search, setSearch] = useState<string>('');
    const router = useRouter()

    const onSearch = () => {
        if (!search) {
            return;
        }
        router.push(`/?search=${search}`);
    }

    return (
        <div className="flex">
            <input type="search" className="border p-1 md:p-2 border-slate-300 min-w-72 mr-1" placeholder="Nhập từ khóa tìm kiếm..." onChange={(e) => setSearch(e.currentTarget.value)} />
            <button type="button" className="border px-4 border-slate-300 cursor-pointer hover:bg-slate-800 hover:text-white" onClick={onSearch}>Tìm</button>
        </div>
    )
}