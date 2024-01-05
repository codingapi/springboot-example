import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';
import { logout } from './services/api/account';


const sleep = (ms: number) => new Promise((resolve) => {setTimeout(resolve, ms)});

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      throw res;
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      console.log(error, opts);
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        // @ts-ignore
        headers['Authorization'] = token;
      }
      const url = config?.url;
      return { ...config, url, headers: headers };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    // @ts-ignore
    async (response) => {
      // 拦截响应数据，进行个性化处理
      if (response.status === 200) {
        const headers = response.headers;
        const authorization = headers['authorization'];
        if (authorization) {
          localStorage.setItem('token', authorization);
        }
        const res = response.data as API.Response<any>;
        if (res['success'] !== undefined) {
          if (res.success) {
            const headers = response.headers;
            const authorization = headers['authorization'];
            if (authorization) {
              localStorage.setItem('token', authorization);
            }
          } else {
            const code = res.errCode;
            if (code === 'token.expire' || code === 'token.error') {
              message.error('登陆已经失效，即将退出系统，请重新登陆.');
              await sleep(2000);
              await logout();
            } else {
              message.error(res.errMessage);
            }
          }
        }
      }
      return response;
    },
  ],
};
