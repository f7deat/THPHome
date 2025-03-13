import axios from "axios";

export async function apiDepartmentCodeOptions() {
    return axios.get(`https://dhhp.edu.vn/api/department/code-options`);
}