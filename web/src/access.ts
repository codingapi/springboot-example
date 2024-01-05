/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  const isAdmin = currentUser && currentUser.authorities?.includes('ROLE_ADMIN');
  const authentications = localStorage.getItem('authentications');
  return {
    isAdmin: isAdmin === undefined ? false : isAdmin,
    hasAuthentication: (element: any) => {
      if (authentications === null || authentications === undefined) {
        return true;
      }
      if (element.path === '/') {
        return true;
      }
      if (authentications.indexOf(element.path) > -1) {
        return true;
      }
      return false;
    },
  };
}
