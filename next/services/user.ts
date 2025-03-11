import axios from "axios";

export async function apiLecturerList(params: { current: number }) {
    return axios.get(`https://dhhp.edu.vn/api/user/lecturer/list`, { params });
}

export async function apiLecturePublicInfo(userName: string) {
    return axios.get(`https://dhhp.edu.vn/api/user/lecturer/public-info/${userName}`);
}