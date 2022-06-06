/*
 * @Author: OBKoro1
 * @Date: 2022-04-27 16:29:06
 * @LastEditors:
 * @LastEditTime: 2022-05-12 17:30:52
 * @FilePath: /vue_shop/src/router/index.js
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../components/LoginContainer.vue')
  },
  {
    path: '/home',
    component: () => import('../components/HomePage.vue'),
    redirect: '/home/welcome',
    children: [
      {
        path: 'welcome',
        component: () => import('../components/WelcomeHome.vue')
      },
      {
        path: 'userList',
        component: () => import('../components/User/UserList.vue')
      },
      {
        path: 'roleList',
        component: () => import('../components/Roles/RoleList.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 添加全局前置守卫，控制访问权限
router.beforeEach((to, from, next) => {
  /**
   * 判断
   * 1、如果 path = login，通行
   * 2、如果 path = 其他，有token允许通行，无强制返回login
   */
  if (to.path === '/login') {
    return next()
  } else {
    const token = window.sessionStorage.getItem('token')
    if (token === null || token === 'undefined') {
      return next('/login')
    }
    return next()
  }
})

export default router
