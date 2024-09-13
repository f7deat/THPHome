import { request } from "@umijs/max";

export async function apiLogin(data: any) {
    return request(`user/password-sign-in`, {
        method: 'POST',
        data,
    });
}

export async function queryCurrentUser() {
    return request(`user`);
}

export const queryUserList = (params: any) => request(`user/list`, { params });

export const apiLoginSSO = (data: any) => request(`user/sso`, {
    data,
    method: 'POST'
})

export const apiGetUserTypeOptions = () => request(`user/type/options`);