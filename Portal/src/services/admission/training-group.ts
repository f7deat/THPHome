import { request } from "@umijs/max";

export async function apiTrainingGroupList(params: any) {
    return request('training/group/list', {
        params
    });
}