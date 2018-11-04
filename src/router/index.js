import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
// import tableRouter from '@/router/modules/table'

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
  path: '/member_signup',
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
  path: '/profile/profile-view',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '',
    component: () =>
        import('@/views/c_profile_view/index'),
    name: 'c_profile_view',
    meta: {
      title: 'c_profile_view',
      icon: 'user'
    }
  }]
},

{
  path: '/profile/profile-edit',
  component: Layout,
  redirect: 'noredirect',
  hidden: true,
  children: [{
    path: '',
    component: () =>
        import('@/views/c_profile_edit/index'),
    name: 'c_profile_edit',
    meta: {
      title: 'c_profile_edit',
      icon: 'user'
    }
  }]
},
{
  path: '/accounting',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: 'c_accounting',
    component: () =>
        import('@/views/c_accounting/index'),
    name: 'c_accounting',
    meta: {
      title: 'c_accounting',
      icon: 'calculator'
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
      title: 'c_history',
      icon: 'history'
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
      title: 'c_information',
      icon: 'informations'
    }
  }]
},
{
  path: '/manager/account',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '',
    component: () =>
        import('@/views/c_accountmanager/index'),
    name: 'c_accountmanager',
    meta: {
      title: 'c_accountmanager',
      icon: 'accounts'
    }
  }]
},
{
  path: '/manager/card',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '',
    component: () =>
        import('@/views/c_card/index'),
    name: 'c_cardmanager',
    meta: {
      title: 'c_cardmanager',
      icon: 'creditcard'
    }
  }]
},
{
  path: '/manager/category',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '',
    component: () =>
        import('@/views/c_category/index'),
    name: 'c_category',
    meta: {
      title: 'c_category ',
      icon: 'folder'
    }
  }]
},
{
  path: '/manager/project',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '',
    component: () =>
        import('@/views/c_project/index'),
    name: 'c_projectmanager',
    meta: {
      title: 'c_projectmanager ',
      icon: 'teamwork'
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
      icon: 'support'
    }
  }]
},
{
  path: '/admin_signup',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '',
    component: () =>
        import('@/views/a_signup/index'),
    name: 'a_signup',
    meta: {
      title: 'a_signup ',
      icon: 'user'
    }
  }]
},
{
  path: '/profile/admin-profile-view',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '',
    component: () =>
        import('@/views/a_profile_view/index'),
    name: 'a_profile_view',
    meta: {
      title: 'a_profile_view',
      icon: 'user'
    }
  }]
},
{
  path: '/profile/admin-profile-edit',
  component: Layout,
  redirect: 'noredirect',
  hidden: true,
  children: [{
    path: '',
    component: () =>
        import('@/views/a_profile_edit/index'),
    name: 'a_profile_edit',
    meta: {
      title: 'a_profile_edit',
      icon: 'user'
    }
  }]
},
{
  path: '/feedback',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '',
    component: () =>
        import('@/views/a_feedbackmanage/index'),
    name: 'a_feedbackmanage',
    meta: {
      title: 'a_feedbackmanage',
      icon: 'user'
    }
  }]
},
{
  path: '/profile/ent-profile-view',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '',
    component: () =>
        import('@/views/b_profile_edit/index'),
    name: 'b_profile_edit',
    meta: {
      title: 'b_profile_edit',
      icon: 'user'
    }
  }]
},
{
  path: '/activity/add',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '',
    component: () =>
        import('@/views/b_activity_add/index'),
    name: 'b_activity_add',
    meta: {
      title: 'b_activity_add',
      icon: 'user'
    }
  }]
},
{
  path: '/membermanage/business',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: '',
    component: () =>
        import('@/views/a_manage_business/index'),
    name: 'a_manage_business',
    meta: {
      title: 'a_manage_business',
      icon: 'user'
    }
  }]
},
// tableRouter,

{
  path: '*',
  redirect: '/404',
  hidden: true
}
]
