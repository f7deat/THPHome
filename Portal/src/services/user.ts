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