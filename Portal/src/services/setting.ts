import { request } from "@umijs/max";

export const apiBannerList = (params: any) => request(`banner/list`, { params });

export const apiBannerActive = (id: string) => request(`banner/active/${id}`, {
    method: 'POST'
});

export const apiBannerUpdate = (data: any) => request(`banner/update`, {
    method: 'POST',
    data
})

export const apiLogo = (locale: string) => request(`banner/logo`, {
    params: {
        locale
    }
});

export const apiSettingList = () => request(`setting/list`);

export const apiSaveZalo = (data: any) => request(`setting/zalo`, {
    method: 'POST',
    data
});

export const apiGetZalo = () => request(`setting/zalo`);

export const apiGetZaloArtices = (params: any) => request(`setting/zalo/articles`, { params });

export const apiVerifyZaloArticle = (id: string) => request(`setting/zalo/article/verify/${id}`, {
    method: 'POST'
});