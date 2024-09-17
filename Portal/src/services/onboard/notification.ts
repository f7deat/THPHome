import request from './request';

export const apiNotificationList = (params: any) => request.get(`notification/list`, { params });

export const apiGetUsersByNotificationId = (params: any) => request.get(`notification/users-by-notification-id`, { params });