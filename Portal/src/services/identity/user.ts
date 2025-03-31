import request from './request';

export async function apiRemoveUserFromRole(data: any) {
    return request.post(`user/remove-from-role`, data);
}