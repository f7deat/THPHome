"use client";

import { BarsOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useState } from "react";
import SideBar from "./sidebar";
import { LecturerDetail } from "@/typings/user";

type Props = {
    data: LecturerDetail;
}

const MobileBar: React.FC<Props> = ({ data }) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className='h-14 w-14 flex md:hidden items-center justify-center border-r border-gray-200 text-xl text-gray-600' onClick={() => setOpen(true)}>
                <BarsOutlined />
            </div>
            <Drawer open={open} onClose={() => setOpen(false)} placement='left' title="Hồ sơ" styles={{
                body: {
                    padding: 0
                }
            }}>
                <SideBar data={data} />
            </Drawer>

        </>
    )
}

export default MobileBar;