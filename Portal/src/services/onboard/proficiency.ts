import request from './request';

export const apiProficiencyList = (params: any) => request.get(`proficiency/practice/list`, { params });

export const apiProficiencyExamList = (params: any) => request.get(`proficiency/exam/list`, { params });

export const apiExportProficiancy = (params: any) => request.get(`proficiency/export`, { 
    params,
    responseType: 'blob' 
});

export const apiAddProficiency = (data: any) => request.post(`proficiency/add`, data);

export const apiDeleteProficiency = (id: string) => request.post(`proficiency/delete/${id}`);

export const apiProficiencyTypeOptions = () => request.get(`proficiency/type/options`);

export const apiProficiencyBatchList = (params: any) => request(`proficiency/batch/list`, { params });

export const apiGetProficiencyBatch = (id?: string) => request.get(`proficiency/batch/${id}`);

export const apiGetProficiencyStatusOptions = () => request.get(`proficiency/status-options`) as any;

export const apiGetProficiencyPracticeUpdateStatus = (data: any) => request.post(`proficiency/practice/update-status`, data)