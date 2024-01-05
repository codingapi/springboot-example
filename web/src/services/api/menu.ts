// @ts-ignore
/* eslint-disable */
import {get, post} from "@/services/api/index";

export async function list(
  params: {
    [key in string]: any;
  },
) {
  return get('/api/menu/list', params);
}


export async function tree() {
  return get('/api/menu/tree');
}


export async function save(body: any) {
  return post('/api/menu/save', body);
}


export async function del(body: {
  id:string,
}) {
  return post('/api/menu/delete', body);
}
