import { request } from "@umijs/max"

export async function apiLeaveTypeOptions() {
    return request(`leave/type/options`);
}

export async function apiLeaveRequestCreate(data: any) {
    return request(`leave/request/create`, {
        method: 'POST',
        data
    });
}

export async function apiLeaveRequestList(params: any) {
    return request(`leave/request/list`, {
        params
    });
}

export async function apiLeaveRequestUpdate(data: any) {
    return request(`leave/request/update`, {
        method: 'PUT',
        data
    });
}

export async function apiLeaveRequestDelete(id: number) {
    return request(`leave/request/delete/${id}`, {
        method: 'DELETE'
    });
}