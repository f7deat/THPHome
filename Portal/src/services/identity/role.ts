import request from './request';

export async function apiRoleList(params: any) {
    return request.get('role/list', { params });
}

export async function apiUsersInRole(params: any) {
    return request.get(`role/users`, { params });
}