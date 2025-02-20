import { request } from "@umijs/max";

export const apiQaAdd = (data: any) => request(`qa/add`, { 
    method: 'POST',
    data
});

export const apiQaUpdate = (data: any) => request(`qa/update`, { 
    method: 'POST',
    data
});

export const apiActiveQaGroup = (data: any) => request(`qa/group/active`, {
    method: 'POST',
    data
});

export const apiQaDelete = (id: string) => request(`qa/delete/${id}`, { 
    method: 'POST'
});

export const apiQaList = (params: any) => request(`qa/list`, { params });

export const apiQaItemList = (params: any, id?: string) => request(`qa/item/list/${id}`, { params });

export const apiQaItemAdd = (data: any) => request(`qa/item/add`, { 
    method: 'POST',
    data
});

export const apiQaItemUpdate = (data: any) => request(`qa/item/update`, { 
    method: 'POST',
    data
});

export const apiQaItemDelete = (id: string) => request(`qa/item/delete/${id}`, { 
    method: 'POST'
});