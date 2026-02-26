import { request } from '@umijs/max';
export async function apiVideoBulletinList(params: any) {
  const res = await request('videoBulletin/list', {
    method: 'GET',
    params,
  });

  return {
    data: res.data ?? [],
    success: res.succeeded ?? true,
    total: res.total ?? 0,
  };
}

export function apiCreateVideoBulletin(data: any) {
  return request('videoBulletin/create', {
    method: 'POST',
    data,
  });
}

export function apiUpdateVideoBulletin(data: any) {
  return request(`videoBulletin/update`, {
    method: 'POST',
    data,
  });
}

export function apiDeleteVideoBulletin(id: string) {
  return request(`videoBulletin/delete/${id}`, {
    method: 'POST',
  });
}
