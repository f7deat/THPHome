import request from './request';

export const apiMajorList = (params: any) => request.get(`major/list`, { params });