import { request } from "@umijs/max";

export function apiListNotification(params: any) {
    return request(`notification/list`, {
        params
    })
};

export function apiGetNotification(id: string) {
    return request(`notification/${id}`);
}

export async function apiNotificationUnreadCount() {
    return request(`notification/unread-count`);
}

export async function apiNotificationDelete(id: string) {
    return request(`notification/delete/${id}`, {
        method: 'POST'
    })
    
}