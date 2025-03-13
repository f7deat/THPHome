"use client";

import { apiDepartmentCodeOptions } from "@/services/department";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Filter: React.FC = () => {

    const router = useRouter();
    const [options, setOptions] = useState<[]>([]);

    useEffect(() => {
        apiDepartmentCodeOptions().then(response => setOptions(response.data));
    }, []);

    return (
        <div className="flex justify-end gap-2 items-center mb-4 2xl:mb-8">
            <span>Đơn vị</span>
            <Select className="min-w-40" showSearch options={options} onChange={(value) => {
                if (!value) {
                    return;
                }
                router.push(`/?departmentCode=${value}`);
            }} />
        </div>
    )
}