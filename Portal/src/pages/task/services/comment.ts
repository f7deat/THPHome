import request from './request';

export const apiTaskCommentList = (params: any) => request.get('comment/list', { params });

export async function apiTaskCommentCreate(data: any) {
    return request.post('comment', data);
}

export async function apiTaskCommentDelete(id: string) {
    return request.delete(`comment/${id}`);
}