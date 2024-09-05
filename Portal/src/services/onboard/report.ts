import request from './request';

export const apiGetListAttendance = (params: any) => request.get(`report/attendances`, { params });