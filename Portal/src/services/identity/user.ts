import request from './request';

export async function apiRemoveUserFromRole(data: any) {
    return request.post(`user/remove-from-role`, data);
}

export async function apiChangeDepartment(data: any) {
    return request.post(`user/change-department`, data);
}