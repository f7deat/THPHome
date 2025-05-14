import request from './request';

export const apiTaskItemList = (params: any) => request.get(`task/list`, { params });

export const apiTaskItemCreate = (data: any) => request.post(`task/create`, data);

export const apiTaskItemUpdate = (data: any) => request.post(`task/update`, data);

export const apiTaskItemDetail = (id?: string) => request.get(`task/${id}`);

export async function apiTaskItemCount(departmentId?: number) {
    return request.get(`task/count`, { params: { departmentId } });
}

export async function apiTaskItemAssign(data: any) {
    return request.post(`task/assign`, data);
}

export async function apiTaskItemDelete(id: string) {
    return request.delete(`task/${id}`);
}

export async function apiTaskItemHistoryList(params: any) {
    return request.get(`task/history/list`, { params });
}

export async function apiTaskTeamWorkload(params: any) {
    return request.get(`task/team-workload`, { params });
}

export async function apiTaskItemStatusOptions(params: any) {
    return request.get(`task/status-options`, { params });
}

export async function apiTaskItemChangeStatus(data: any) {
    return request.post(`task/change-status`, data);
}

export async function apiTaskItemAttachments(id?: string, params?: any) {
    return request.get(`task/attachments/${id}`, { params });
}

export async function apiTaskItemAttachmentUpload(data: any) {
    return request.post(`task/add-attachment`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export async function apiTaskItemPriorityOptions(params?: any) {
    return request.get(`task/priority-options`, { params });
}

export async function apiTaskItemKanban(params: any) {
    return request.get(`task/kanban`, { params });
}

export async function apiTaskTags(params: any) {
    return request.get(`task/tags`, { params });
}

export async function apiTaskBacklogs(params: any) {
    return request.get(`task/backlogs`, { params });
}