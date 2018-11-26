const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  status: state => state.user.status,
  roles: state => state.user.membertype,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  // 以下為回傳值
  id: state => state.user.id,
  toid: state => state.user.toid,
  account: state => state.user.account,
  identifier: state => state.user.identifier,
  membertype: state => state.user.membertype,
  name: state => state.user.name,
  localpicture: state => state.user.localpicture,
  dbpicture: state => state.user.dbpicture,
  renew_time: state => state.user.renew_time
}
export default getters
