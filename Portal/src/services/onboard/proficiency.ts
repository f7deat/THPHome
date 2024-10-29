import request from './request';

export const apiProficiencyList = (params: any) => request.get(`proficiency/list`, { params });

export const apiExportProficiancy = (params: any) => request.get(`proficiency/export`, { 
    params,
    responseType: 'blob' 
});

export const apiAddProficiency = (data: any) => request.post(`proficiency/add`, data);

export const apiDeleteProficiency = (id: string) => request.post(`proficiency/delete/${id}`);