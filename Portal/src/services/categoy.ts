import { request } from "@umijs/max";

export const apiCategoryTreeData = (params: any) => request(`category/options`, { params });

export const apiGetCategories = (params: any) => request(`category/list`, { params });

export const apiGetParentCategoryOptions = (params: any) => request(`category/parent/options`, { params });

export const apiGetPostsCategory = (params: any) => request(`category/posts`, { params });