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
  options?: { [key: string]: any },
) {
  return get('/api/parameter/list', params);
}


export async function save(body: any) {
  return post('/api/parameter/save', body);
}


export async function del(body: {
  id:string,
}) {
  return post('/api/parameter/delete', body);
}
