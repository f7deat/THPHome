import request from './request';

export const apiTaskTagOptions = (params: any) => request.get(`tag/options`, { params });

export const apiAddTagToTask = (data: any) => request.post(`task/add-to-tag`, data);