import { request } from "@umijs/max";

export const apiFileUpload = (data: any) => request(`file/upload`, {
    method: 'POST',
    data,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const apiFileList = (params: any) => request(`file/list`, params);