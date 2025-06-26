import { request } from "@umijs/max";

export async function queryMenuOptions(params?: any) {
    return request(`menu/options`, { params });
}

export async function apiListMenu(params: any) {
    return request(`menu/list`, { params })
}

export async function apiMenuAdd(data: any) {
    return request(`menu/add`, {
        method: 'POST',
        data
    })
}

export async function apiMenuUpdate(data: any) {
    return request(`menu/update`, {
        method: 'POST',
        data
    })
}

export async function apiMenuDelete(id: number) {
    return request(`menu/${id}`, {
        method: 'DELETE'
    })
}