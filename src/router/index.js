import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () =>
        import('@/views/redirect/index')
  }]
},
{
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
  path: '/login2',
  component: () =>
      import('@/views/login2/index'),
  hidden: true
},
{
  path: '/signup',
  component: () =>
      import('@/views/signup/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () =>
      import('@/views/login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: () =>
      import('@/views/errorPage/404'),
  hidden: true
},
{
  path: '/401',
  component: () =>
      import('@/views/errorPage/401'),
  hidden: true
},

{
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: () =>
        import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: 'dashboard',
      icon: 'dashboard',
      noCache: true
    }
  }]
}
]
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
export const asyncRouterMap = [{
  path: '/profile',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: 'profile-view',
    component: () =>
        import('@/views/c_profile_view/index'),
    name: 'c_profile_view',
    meta: {
      title: 'profile_view',
      icon: 'user'
    }
  }]
},

{
  path: '/profile',
  component: Layout,
  redirect: 'noredirect',
  hidden: true,
  children: [{
    path: 'profile-edit',
    component: () =>
        import('@/views/c_profile_edit/index'),
    name: 'c_profile_edit',
    meta: {
      title: 'profile_edit',
      icon: 'user'
    }
  }]
},
{
  path: '/account',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: 'accountting',
    component: () =>
        import('@/views/c_accountting/index'),
    name: 'c_accountting',
    meta: {
      title: '開始記帳',
      icon: 'user'
    }
  }]
},
{
  path: '/history',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '',
    component: () =>
        import('@/views/c_history/index'),
    name: 'c_history',
    meta: {
      title: '歷史紀錄',
      icon: 'user'
    }
  }]
},
{
  path: '/information',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '',
    component: () =>
        import('@/views/c_information/index'),
    name: 'c_information',
    meta: {
      title: '優惠資訊',
      icon: 'user'
    }
  }]
},
{
  path: '/manager',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: 'account',
    component: () =>
        import('@/views/c_accountmanager/index'),
    name: 'c_accountmanager',
    meta: {
      title: '帳戶管理',
      icon: 'user'
    }
  }]
},
{
  path: '/manager',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '/card',
    component: () =>
        import('@/views/c_card/index'),
    name: 'c_card',
    meta: {
      title: '卡片管理',
      icon: 'user'
    }
  }]
},
{
  path: '/manager',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: 'category',
    component: () =>
        import('@/views/c_category/index'),
    name: 'c_category',
    meta: {
      title: '分類管理 ',
      icon: 'user'
    }
  }]
},
{
  path: '/report',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '',
    component: () =>
        import('@/views/c_connection/index'),
    name: 'c_connection',
    meta: {
      title: '聯絡我們',
      icon: 'user'
    }
  }]
},

{
  path: '*',
  redirect: '/404',
  hidden: true
}
]
