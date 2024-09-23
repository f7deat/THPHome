import request from "./request";

export const apiGetExamVersion = (id: string) => request(`exam/version/${id}`);