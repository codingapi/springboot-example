// @ts-ignore
/* eslint-disable */
import {get, post} from "@/services/api/index";


export async function list(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
) {
  return get('/api/server/list', params);
}


export async function save(body: any, options?: { [key: string]: any }) {
  return post('/api/server/save', body);
}


export async function del(body: {
  id: string,
}) {
  return post('/api/server/delete', body);
}
