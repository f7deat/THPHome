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

export const apiGetUserTypeOptions = () => request(`user/type/options`);

export async function apiForeignLanguageProficiencyList(params: any) {
    return request(`user/foreign-language-proficiency/list`, { params } );
}

export async function apiForeignLanguageProficiencyCreate(data: any) {
    return request(`user/foreign-language-proficiency/add`, {
        method: 'POST',
        data,
    });
}

export async function apiForeignLanguageProficiencyUpdate(data: any) {
    return request(`user/foreign-language-proficiency/update`, {
        method: 'POST',
        data,
    });
}

export async function apiForeignLanguageProficiencyDelete(id: string) {
    return request(`user/foreign-language-proficiency/delete/${id}`);
}

export async function apiMyProfile() {
    return request(`user/my-detail`);
}