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

export async function apiContactStatusOptions(params?: any) {
    return request(`contact/status-options`, { params });
}

export async function apiDeleteContact(id: string) {
    return request(`contact/delete/${id}`, {
        method: 'POST'
    })
}

export async function apiListContactStatus(params: any) {
    return request(`contact/list-status`, { params });
}

export async function apiDeleteContactStatus(id: number) {
    return request(`contact/delete-status/${id}`, {
        method: 'POST'
    });
}

export async function apiUpdateContactStatusName(data: any) {
    return request(`contact/update-status-name`, {
        method: 'POST',
        data
    })
}

export async function apiAddContactStatus(data: any) {
    return request(`contact/add-status`, {
        method: 'POST',
        data
    })
}