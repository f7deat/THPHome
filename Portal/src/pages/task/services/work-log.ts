import request from './request';

export const apiLogWork = (data: any) => request.post(`work/create`, data);

export const apiLogWorkList = (params: any) => request.get(`work/list`, { params });

export async function apiLogWorkDelete(id: string) {
    return request.delete(`work/${id}`);
}

export async function apiLogWorkApprove(id: string) {
    return request.post(`work/approve/${id}`);
}