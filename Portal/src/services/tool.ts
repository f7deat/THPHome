import { request } from "@umijs/max";

export const apiSendEmailByExcel = (data: FormData) => request(`email/send-by-excel`, {
    method: 'POST',
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    data
});

export const apiGetListEmailLog = (params: any) => request(`email/logs`, { params });