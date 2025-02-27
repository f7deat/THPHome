import { request } from "@umijs/max";

export async function apiGetListMajor(params: any) {
    return request(`admission/major/list`, { params });
}