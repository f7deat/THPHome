import request from './request';

export const apiCountUser = (params: any) => request(`user/count`, { params }); 