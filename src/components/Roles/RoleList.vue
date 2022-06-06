<!--
 * @Author: Hank
 * @Date: 2022-05-12 17:28:41
 * @LastEditors:
 * @LastEditTime: 2022-05-12 17:32:10
 * @FilePath: /vue_shop/src/components/Roles/RoleList.vue
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
-->
<template>
  <div id="rolelist-wraper">
    <!-- 头部导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item class="userlist">角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <el-card class="box-card">
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
