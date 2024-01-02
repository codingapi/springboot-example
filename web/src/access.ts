/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  const isAdmin = currentUser && currentUser.authorities?.includes('ROLE_ADMIN');
  return {
    isAdmin: isAdmin === undefined ? false : isAdmin,
  };
}
