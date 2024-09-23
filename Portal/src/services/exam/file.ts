import request from "./request";

export const apiUploadFile = (data: any) => request(`file/upload`, {
    method: 'POST',
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    data
});