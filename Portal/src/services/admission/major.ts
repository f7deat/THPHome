import { request } from "@umijs/max";

export async function apiGetListMajor(params: any) {
    return request(`training/major/list`, { params });
}

export async function apiGetMajor(id?: string) {
    return request(`training/major/${id}`);
}

export async function apiUpdateMajor(data: any) {
    return request(`training/major/update`, {
        method: 'POST',
        data
    });
}