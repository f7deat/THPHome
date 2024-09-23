import request from "./request";

export const apiQuestionAdd = (data: any) => request(`question/add`, {
    method: 'POST',
    data
})

export const apiQuestionUpdate = (data: any) => request(`question/update`, {
    method: 'POST',
    data
});

export const apiGetQuestion = (id: string) => request(`question/${id}`);

export const apiQuestionList = (params: any) => request(`question/list`, { params });

export const apiQuestionOptions = (examVersionId?: string) => request(`question/parent/options/${examVersionId}`) as any;