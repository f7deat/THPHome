import request from "./request";

export const apiAnswerList = (params: any) => request(`answer/list`, { params });

export const apiAnswerAdd = (data: any) => request(`answer/add`, {
    method: 'POST',
    data
});


export const apiAnswerDelete = (id: string) => request(`answer/delete/${id}`, {
    method: 'POST'
});