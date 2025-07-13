import { request } from "@umijs/max";

export const queryPosts = (params: any) => request(`post/get-list`, { params });

export const queryPost = (id: string) => request(`post/get/${id}`);

export const apiPostOptions = (params: any) => request(`post/options`, { params });

export const apiPageBuilderUpdate = (data: any) => request(`post/page-builder/update`, {
    method: 'POST',
    data
})

export const apiShareZaloOA = (id: number) => request(`post/zalo/share/${id}`, {
    method: 'POST'
});

export const apiGetChartPostCreatedInYear = () => request(`post/chart-post-created-in-year`);

export const apiNewPost = (data: any) => request(`post/new`, {
    method: 'POST',
    data
});

export async function apiPostList(params: any) {
    return request('post/list', {
        params,
    });
}

export async function apiPostDelete(id: number) {
    return request(`post/remove/${id}`, {
        method: 'POST',
    });
}

export async function apiPostActive(id: number) {
    return request(`post/active/${id}`, {
        method: 'POST',
    });
}

export async function apiPostTrash(params: any) {
    return request(`post/trash`, { params });
}

export async function apiPostRestore(id: number) {
    return request(`post/restore/${id}`, {
        method: 'POST',
    });
}

export async function apiPostPermanentDelete(id: number) {
    return request(`post/${id}`, {
        method: 'DELETE',
    });
}