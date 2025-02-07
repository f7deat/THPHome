import { request } from "@umijs/max";

export async function apiListContact(params: any) {
    return request(`contact/list`, { params });
}

export async function apiUpdateContactStatus(data: any) {
    return request(`contact/update-status`, {
        method: 'POST',
        data
    })
}