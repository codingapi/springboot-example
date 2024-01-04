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
  return get('/api/api/list', params);
}


export async function test(body: any) {
  return post('/api/api/test', body)
}


export async function save(body: any) {
  return post('/api/api/save', body)
}


export async function del(body: {
  id: string,
}) {
  return post('/api/api/delete', body)
}
