import axios from "axios";

export async function apiDepartmentCodeOptions() {
    return axios.get(`https://dhhp.edu.vn/api/department/code-options`);
}

export async function apiDepartmentList(params: { current?: number; pageSize?: number }) {
    return axios.get(`https://identity.dhhp.edu.vn/department/list`, { params });
}