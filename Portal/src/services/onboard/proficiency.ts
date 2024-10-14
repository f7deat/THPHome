import request from './request';

export const apiProficiencyList = (params: any) => request.get(`proficiency/list`, { params });