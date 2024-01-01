// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';


export async function list(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Response<any>>('/api/node/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


export async function save(body: {
  name:string,
  url:string
}, options?: { [key: string]: any }) {
  return request<API.Response<any>>('/api/node/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


export async function del(body: {
  id:string,
}, options?: { [key: string]: any }) {
  return request<API.Response<any>>('/api/node/del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
