// @ts-ignore
/* eslint-disable */
import {get, post} from "@/services/api/index";


export async function list(
  params: any
) {
  return get('/api/node/list', params);
}


export async function save(body: any) {
  return post('/api/node/save', body);
}


export async function del(body: {
  id:string,
}) {
  return post('/api/node/delete', body);
}
