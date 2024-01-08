import Footer from '@/components/Footer';
import { Question, SelectLang } from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import React, { createRef } from 'react';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
import { loadLayoutMenus, loadLoayoutMenuAuthentications } from './components/Menu';
import { menus } from '@/services/api/account'
const loginPath = '/user/login';



/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const localUser = {
        avatar: localStorage.getItem('avatar'),
        username: localStorage.getItem('username'),
        authorities: localStorage.getItem('authorities'),
      };
      return localUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}



// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const layoutActionRef = createRef<{ reload: () => void }>();

  //添加一个方法，用于刷新菜单的方法
  setInitialState((preInitialState) => ({
    ...preInitialState,
    reloadLayout: () => {
      layoutActionRef.current?.reload();
    }
  }));

return {
  actionRef: layoutActionRef,
  actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
  avatarProps: {
    src: initialState?.currentUser?.avatar,
    title: <AvatarName />,
    render: (_, avatarChildren) => {
      return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
    },
  },
  menu: {
    //https://pro.ant.design/zh-CN/docs/advanced-menu/
    request: async (params, defaultMenuData) => {
      try {
        const response = await menus();
        const authentications = await loadLoayoutMenuAuthentications(response);
        localStorage.setItem('authentications', JSON.stringify(authentications));
        return await loadLayoutMenus(response);
      } catch (error) {
        localStorage.removeItem('authentications');
        return defaultMenuData
      }
    }
  },
  waterMarkProps: {
    content: initialState?.currentUser?.username,
  },
  footerRender: () => <Footer />,
  onPageChange: () => {
    const { location } = history;
    // 如果没有登录，重定向到 login
    if (!initialState?.currentUser && location.pathname !== loginPath) {
      history.push(loginPath);
    }
  },

  menuHeaderRender: undefined,
  // 自定义 403 页面
  // unAccessible: <div>unAccessible</div>,
  // 增加一个 loading 的状态
  childrenRender: (children) => {
    // if (initialState?.loading) return <PageLoading />;
    return (
      <>
        {children}
        <SettingDrawer
          disableUrlParams
          enableDarkTheme
          settings={initialState?.settings}
          onSettingChange={(settings) => {
            setInitialState((preInitialState) => ({
              ...preInitialState,
              settings,
            }));
          }}
        />
      </>
    );
  },
  ...initialState?.settings,
};
};
/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};


import Foo from "@/pages/foo";

//https://umijs.org/docs/api/runtime-config#patchclientroutes-routes-
export function patchClientRoutes({ routes }) {
  const baseLayout = routes.find((route) => route.path === '/');
  baseLayout.children.push({
    path: '/foo',
    element: <Foo />,
  });
  return routes;
}
