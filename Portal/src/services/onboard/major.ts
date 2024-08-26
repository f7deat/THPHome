import request from './request';

export const apiMajorList = (params: any) => request.get(`major/list`, { params });

export const apiGetMajorGroup = (params: any) => request.get(`major/group/options`, { params }) as any;

export const apiExportMajor = (params: any) => request.get(`user/export-major`, { 
    params,
    responseType: 'blob'
})