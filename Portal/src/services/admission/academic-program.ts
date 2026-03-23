import { request } from "@umijs/max";

export async function apiGetListAcademicProgram(params: any) {
    return request(`training/academic-program/list`, { params });
}

export async function apiDeleteAcademicProgram(id: number) {
    return request(`training/academic-program/${id}`, { method: 'DELETE' });
}

export async function apiCreateAcademicProgram(data: {
    title: string;
    description?: string;
    majorId: number;
    code: string;
    sortOrder: number;
}) {
    return request(`training/academic-program`, { method: 'POST', data });
}