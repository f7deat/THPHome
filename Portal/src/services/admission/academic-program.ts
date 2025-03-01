import { request } from "@umijs/max";

export async function apiGetListAcademicProgram(params: any) {
    return request(`training/academic-program/list`, { params });
}