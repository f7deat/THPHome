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