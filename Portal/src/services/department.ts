import { request } from "@umijs/max";

export const apiGetDepartmentList = (params: any) => request(`department/list`, { params });