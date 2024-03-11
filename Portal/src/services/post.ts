import { request } from "@umijs/max";

export const queryPosts = (params: any) => request(`post/get-list`, { params });