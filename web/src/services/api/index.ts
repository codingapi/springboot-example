// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';


export async function get(url:string,params?:any,options?: { [key: string]: any }) {
  return request<API.Response<any>>(url, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function post(url:string,body?: any,options?: { [key: string]: any }) {
  return request<API.Response<any>>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


export async function postFile(url:string,file:File) {
  const formData = new FormData();
  formData.append('files', file);

  return request<API.Response<any>>(url, {
    method: 'POST',
    data: formData,
  });
}
