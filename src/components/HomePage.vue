<!--
 * @Author: Hank
 * @Date: 2022-05-07 17:56:24
 * @LastEditors:
 * @LastEditTime: 2022-05-12 17:30:00
 * @FilePath: /vue_shop/src/components/HomePage.vue
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
-->
<template>
  <el-container class="homepage-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="logo-wrapper">
        <img src="../assets/heima.png"
             alt="">
        <span>后台管理</span>
      </div>
      <el-button type="info"
                 @click="logoutClick">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏-菜单 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="side-menu-toggle"
             @click="toggleCollapse">|||</div>
        <el-menu background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 :router="true"
                 :default-active="activeIndex"
                 @select="handleOpen">
          <el-submenu :index="item.id + ''"
                      v-for="item in menuList"
                      :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="subItem.path"
                          v-for="subItem in item.children"
                          :key="subItem.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体展示区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuList: [],
      iconsObj: {
        100: 'iconfont icon-users',
        200: 'iconfont icon-tijikongjian',
        300: 'iconfont icon-3702mima',
        400: 'iconfont icon-danju',
        500: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activeIndex: ''
    }
  },
  created () {
    this.getMenuList()

    this.activeIndex = sessionStorage.getItem('activeIndex')
    // this.$http({
    //   method: 'get',
    //   url: 'menuList'
    // })
    //   .then((result) => {
    //     console.log(result.data)
    //   }).catch((err) => {
    //     console.log(err)
    //   })
  },
  methods: {
    // 展开或收起左侧菜单
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 点击二级菜单 index, indexPath
    handleOpen (index) {
      this.activeIndex = index
      window.sessionStorage.setItem('activeIndex', index)
    },
    // 退出
    logoutClick () {
      window.sessionStorage.clear()
      this.$router.replace('/login')
    },
    // 请求菜单列表
    getMenuList () {
      setTimeout(() => {
        const menuList = [
          {
            id: 100,
            authName: '用户管理',
            path: '/home',
            children: [
              {
                id: 101,
                authName: '用户列表',
                path: '/home/userList',
                children: []
              }
            ]
          },
          {
            id: 200,
            authName: '权限管理',
            path: '/authorization',
            children: [
              {
                id: 201,
                authName: '角色列表',
                path: '/home/roleList',
                children: []
              },
              {
                id: 202,
                authName: '权限列表',
                path: '/authorization/authorizationList',
                children: []
              }
            ]
          },
          {
            id: 300,
            authName: '商品管理',
            path: '/shop',
            children: [
              {
                id: 301,
                authName: '商品列表',
                path: '/shop/shopList',
                children: []
              },
              {
                id: 302,
                authName: '分类参数',
                path: '/shop/categoryParams',
                children: []
              },
              {
                id: 303,
                authName: '商品分类',
                path: '/shop/goodsCategory',
                children: []
              }
            ]
          },
          {
            id: 400,
            authName: '订单管理',
            path: '/order',
            children: []
          },
          {
            id: 500,
            authName: '数据统计',
            path: '/statistics',
            children: []
          }
        ]
        this.menuList = menuList
      }, 500)
    }
  }
}
</script>

<style lang='scss' scoped>
.homepage-container {
  height: 100%;

  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo-wrapper {
      display: flex;
      align-items: center;

      & > span {
        margin-left: 10px;
      }
    }
  }

  .el-aside {
    background-color: rgb(84, 92, 100);
    color: #333;

    .side-menu-toggle {
      font-size: 10px;
      line-height: 24px;
      background-color: #4a5064;
      color: #fff;
      text-align: center;
      letter-spacing: 0.2em;
      cursor: pointer;
    }

    & .el-menu {
      border-right: none;

      & .iconfont {
        margin-right: 10px;
      }
    }
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
}
</style>
