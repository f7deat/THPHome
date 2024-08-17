import request from './request';

export const apiProgramListApproval = (params: any) => request.get(`program/approval-list`, { params });

export const apiProgramOptions = () => request.get(`program/options`);

export const apiProgramApprove = (data: any) => request.post(`program/approve`, data);

export const apiProgramReject = (data: any) => request.post(`program/reject`, data);