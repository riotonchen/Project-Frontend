import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
  path: '/home',
  component: () =>
      import('@/views/home/index'),
  hidden: true
},
{
  path: '/login',
  component: () =>
      import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () =>
      import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'Dashboard',
  hidden: true,
  children: [{
    path: 'dashboard',
    component: () =>
        import('@/views/dashboard/index')
  }]
},
{
  path: '/acounting',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Acounting',
    component: () =>
        import('@/views/acounting/index'),
    meta: {
      title: 'Acounting',
      icon: 'form'
    }
  }]
},
{
  path: '/settings',
  component: Layout,
  redirect: '/settings/account',
  name: 'settings',
  meta: {
    title: '設定',
    icon: '4'
  },
  children: [{
    path: 'account',
    name: 'account',
    component: () =>
          import('@/views/settings/account'),
    meta: {
      title: '帳戶管理',
      icon: '4-1'
    }
  },
  {
    path: 'category',
    name: 'category',
    component: () =>
          import('@/views/category'),
    meta: {
      title: '分類管理',
      icon: '4-1'
    }
  },
  {
    path: 'card',
    name: 'card',
    component: () =>
          import('@/views/card'),
    meta: {
      title: '票卡管理',
      icon: '4-1'
    }
  }
  ]
},
  // 優惠資訊
{
  path: '/information',
  component: Layout,
  children: [{
    path: 'index',
    name: 'information',
    component: () =>
        import('@/views/information/index'),
    meta: {
      title: '優惠資訊',
      icon: '1'
    }
  }]
},

  // 聯絡我們
{
  path: '/connection',
  component: Layout,
  children: [{
    path: 'index',
    name: 'connection',
    component: () =>
        import('@/views/connection/index'),
    meta: {
      title: '聯絡我們',
      icon: '2'
    }
  }]
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
