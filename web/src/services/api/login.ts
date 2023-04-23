// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';
import {history} from "@@/core/history";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser() {
  return {
    avatar: localStorage.getItem('avatar'),
    username: localStorage.getItem('username'),
    authorities:localStorage.getItem('authorities'),
  }
}

export function logout() {
  const loginPath = '/login';

  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('authorities');
  localStorage.removeItem('avatar');

  // Note: There may be security issues, please note
  if (window.location.pathname !== loginPath) {
    history.replace({
      pathname: loginPath,
    });
  }
}


/** 登录接口 POST /user/login */
export async function login(body: {
  username:string,
  password:string
}, options?: { [key: string]: any }) {
  return request<API.Response<any>>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 获取版本 /open/version */
export async function getVersion() {
  return request<API.Response<any>>('/open/version', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

