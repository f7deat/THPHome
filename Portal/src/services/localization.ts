import { request } from "@umijs/max";

export function apiListLocalization(params: any) {
    return request(`localization/list`, {
        params
    })
}