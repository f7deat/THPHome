import { request } from "@umijs/max";

export const apiBannerList = (params: any) => request(`banner/list`, { params });

export const apiBannerActive = (id: string) => request(`banner/active/${id}`, {
    method: 'POST'
})