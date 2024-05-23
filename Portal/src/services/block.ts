import { request } from "@umijs/max";

export const querySortOrderBlock = (data: any) => request(`block/sort-order`, {
    method: 'POST',
    data
});

export const queryDeleteBlock = (id: any) => request(`block/delete/${id}`, {
    method: 'POST'
});

export const queryBlockAdd = (data: any) => request(`block/add`, {
    method: 'POST',
    data
});

export const queryBlockSaveInfo = (data: any) => request(`block/save-info`, {
    method: 'POST',
    data
});

export const queryBlocks = (postId: string) => request(`block/list/${postId}`);

export const queryBlock = (id: string) => request(`block/${id}`);

export const queryActiveBlock = (id: any) => request(`block/active/${id}`, {
    method: 'POST'
});

export const queryBlockOptions = () => request(`block/options`);

export const queryBlockSave = (blockId: string, data: any) => request(`block/save/${blockId}`, {
    method: 'POST',
    data
});

export const queryBlockCopy = (data: any) => request(`block/copy`, {
    method: 'POST',
    data
});