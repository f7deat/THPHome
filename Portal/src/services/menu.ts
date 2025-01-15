import { request } from "@umijs/max";

export async function queryMenuOptions() {
    return request(`menu/options`);
}

export async function apiListMenu(params: any) {
    return request(`menu/list`, { params })
}