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
    return request(`user/foreign-language-proficiency/delete/${id}`, {
        method: 'POST'
    });
}

export async function apiGetUserDetail(userName?: string) {
    return request(`user/detail/${userName}`);
}

export async function apiChangeAvatar(data: any) {
    return request(`user/change-avatar`, {
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    
}

export async function apiAcademicTitleOptions(params: any) {
    return request(`user/academic-title/options`, { params });
}

export async function apiAcademicDegreeOptions() {
    return request(`user/academic-degree/options`);
}

export async function apiUserUpdate(data: any) {
    return request(`user/update`, {
        data,
        method: 'POST'
    });
}

export async function apiCountryOptions(params: any) {
    return request(`country/options`, { params });
}

export async function apiCityOptions(params: any) {
    return request(`city/options`, { params });
}