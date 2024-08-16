import request from './request';

export const apiProgramListApproval = () => request.get(`program/approval-list`);