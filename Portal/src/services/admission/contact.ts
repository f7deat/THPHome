import { request } from "@umijs/max";

export async function apiContactExport() {
    return request('contact/export', {
        responseType: 'blob'
    });
}