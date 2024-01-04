// @ts-ignore
/* eslint-disable */
import {history} from '@umijs/max';
import {stringify} from 'querystring';
import {post} from "@/services/api/index";


export function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('authorities');
  localStorage.removeItem('avatar');

  const {search, pathname} = window.location;
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
}


/** 登录接口 POST /api/login/account */
export async function login(body: Account.LoginRequest) {
  return post('/user/login', body);
}

