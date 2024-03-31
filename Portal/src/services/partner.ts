import { request } from "@umijs/max";

export const apiGePartner = (id: number) => request(`partner/${id}`);

export const apiGetListPartner = (params: any) => request(`partner/list`, { params });

export const apiDeletePartner = (id: number) => request(`partner/${id}`, {
    method: 'DELETE'
});

export const apiAddPartner = (data: any) => request(`partner/add`, {
    method: 'POST',
    data
});

export const apiUpdatePartner = (data: any) => request(`partner/update`, {
    method: 'POST',
    data
});