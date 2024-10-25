import request from "./request";

export const apiGetExamVersion = (id: string) => request(`exam/version/${id}`);

export const apiGetExam = (id?: string) => request(`exam/${id}`);

export const apiListExam = (params: any) => request(`exam/list`, { params });

export const apiListExamVersion = (params: any, id?: string) => request(`exam/versions/${id}`, { params })