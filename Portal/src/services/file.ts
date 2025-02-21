import { request } from "@umijs/max";

export const apiFileUpload = (data: any) => request(`file/upload`, {
    method: 'POST',
    data,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const apiFileList = (params: any) => request(`file/list`, { params });

export const apiPhotoList = (params: any) => request(`gallery/photo/list`, { params });

export const apiPhotoAdd = (data: any) => request(`gallery/photo/add`, {
    method: 'POST',
    data
});

export const apiPhotoDelete = (id: string) => request(`gallery/photo/${id}`, {
    method: 'DELETE'
});

export const apiGalleryList = (params: any) => request(`gallery/list`, { params });

export const apiGalleryAdd = (data: any) => request(`gallery`, {
    method: 'POST',
    data
})

export const apiGalleryUpdate = (data: any) => request(`gallery`, {
    method: 'PUT',
    data
})

export const apiGalleryDelete = (id: string) => request(`gallery/${id}`, {
    method: 'DELETE'
});

export async function apiUploadImage(data: FormData) {
    return request('file/image/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}