import request from './request';

export const apiTaskItemList = (params: any) => request.get(`task/list`, { params });

export const apiTaskItemCreate = (data: any) => request.post(`task/create`, data);

export const apiTaskItemUpdate = (data: any) => request.post(`task/update`, data);

export const apiTaskItemDetail = (id?: string) => request.get(`task/${id}`);

export async function apiTaskItemCount() {
    return request.get(`task/count`);
}

export async function apiTaskItemAssign(data: any) {
    return request.post(`task/assign`, data);
}

export async function apiTaskItemDelete(id: string) {
    return request.delete(`task/${id}`);
}