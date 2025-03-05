import { request } from "@umijs/max";

export async function apiTrainingGroupList(params: any) {
    return request('training/group/list', {
        params
    });
}

export async function apiTrainingGroupDetail(id?: string) {
    return request(`training/group/${id}`);
}