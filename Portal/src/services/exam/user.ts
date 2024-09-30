import request from "./request";

export const apiListExamLog = (params: any) => request(`log/list`, { params });