import { request } from "@umijs/max";

export const queryPosts = (params: any) => request(`post/get-list`, { params });

export const queryPost = (id: string) => request(`post/get/${id}`);

export const apiPostOptions = (params: any) => request(`post/options`, { params });

export const apiPageBuilderUpdate = (data: any) => request(`post/page-builder/update`, {
    method: 'POST',
    data
})