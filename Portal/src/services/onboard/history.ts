import request from './request';

export const apiHistoryList = (params: any) => request.get(`log/list`, { params });