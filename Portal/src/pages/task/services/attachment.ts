import request from './request';

export const apiTaskAttachmentDelete = (id: string) => request.delete(`attachment/${id}`);