import request from "./request";

export const apiGetExamVersion = (id: string) => request(`exam/version/${id}`);

export const apiListExam = (params: any) => request(`exam/list`, { params });