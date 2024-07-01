import { request } from "@umijs/max";

export const apiCategoryTreeData = (params: any) => request(`category/options`, { params });