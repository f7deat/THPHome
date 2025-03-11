import { apiLecturerList } from "@/services/user";
import { UserListItem } from "@/typings/user";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

export default async function Home() {

  const data = await apiLecturerList({ current: 1 });
  console.log(data.data);

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="text-2xl font-medium text-center">Sơ yếu lý lịch khoa học Giảng viên</div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-16">
          {
            data.data.data.map((item: UserListItem) => (
              <div className="flex gap-4" key={item.id}>
                <div className="w-40 h-40 bg-gray-300 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="text-xl font-medium">
                    <Link href={`/profile/${item.userName}`} className="font-medium hover:text-blue-500">
                      {item.name}
                    </Link>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <div className="font-medium">Học vị:</div>
                        <div>Thạc sĩ</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="font-medium">Chức vụ:</div>
                        <div>Giảng viên</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="font-medium">Đơn vị công tác:</div>
                        <div>Khoa CNTT</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="font-medium">Email:</div>
                        <div>
                          <a href="mailto:" className="hover:underline">
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }

        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://dhhp.edu.vn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HomeOutlined />
          Trang chủ
        </a>
      </footer>
    </div>
  );
}
