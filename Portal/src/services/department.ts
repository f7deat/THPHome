import { request } from "@umijs/max";

export const apiGetDepartmentList = (params: any) => request(`department/list`, { params });

export const apiGetDepartmentTypes = () => request(`department/types`);

export const apiGetDepartmentTypeOptions = () => request(`department/type/options`);

export const apiUpdateDepartment = (data: any) => request(`department/update`, {
    method: 'POST',
    data
});