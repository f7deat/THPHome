import { request } from "@umijs/max";

export const querySortOrderBlock = (params: any) => request(`post/get-list`, { params });

export const queryDeleteBlock = (params: any, id: any) => request(`post/get-list`, { params });

export const queryBlockAdd = (data: any) => request(`block/add`, {
    method: 'POST',
    data
});

export const queryBlocks = (postId: string) => request(`block/list/${postId}`);

export const queryBlock = (id: string) => request(`block/${id}`);

export const queryActiveBlock = (id: any) => request(`post/get/${id}`);

export const queryBlockOptions = (id: any) => request(`block/options`);

export const queryBlockSave = (blockId: string, data: any) => request(`block/save/${blockId}`, {
    method: 'POST',
    data
});