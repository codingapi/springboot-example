// @ts-ignore
/* eslint-disable */
import {get, post, postFile} from "@/services/api/index";


export async function list(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
) {
  return get('/api/oss/list', params);
}


export async function upload(file: File) {
  return postFile('/api/oss/upload', file);
}


export async function del(body: {
  id:string,
}, options?: { [key: string]: any }) {
  return post('/api/oss/delete', body);
}
