import axios from "axios";

export async function apiLecturerList(params: { current: number, name?: string | string[] | undefined }) {
    return axios.get(`https://dhhp.edu.vn/api/user/lecturer/list`, { 
        params: {
            ...params,
            pageSize: 12
        }
     });
}

export async function apiLecturePublicInfo(userName: string) {
    return axios.get(`https://dhhp.edu.vn/api/user/lecturer/public-info/${userName}`);
}