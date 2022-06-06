<!--
 * @Author: Hank
 * @Date: 2022-05-10 16:47:25
 * @LastEditors:
 * @LastEditTime: 2022-05-12 17:27:00
 * @FilePath: /vue_shop/src/components/User/UserList.vue
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
-->
<template>
  <div id="userlist-wraper">
    <!-- 头部导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item class="userlist">用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <el-card class="box-card">
      <!-- 搜索 操作区域 -->
      <el-row :gutter="15">
        <el-col :span="8">
          <el-input placeholder="请输入搜索内容"
                    clearable
                    v-model="params.keyword"
                    @clear="getUserList">
            <el-button slot="append"
                       icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3"
                class="button-adduser">
          <el-button type="primary"
                     @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="tableData"
                stripe
                border
                :height="tableHeight"
                style="width: 100%"
                class="table-wrapper">
        <el-table-column type="index"
                         width="50"
                         label="#"
                         header-align="center"
                         align="center">
        </el-table-column>
        <el-table-column prop="name"
                         label="姓名"
                         header-align="center"
                         align="center">
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱"
                         header-align="center"
                         align="center">
        </el-table-column>
        <el-table-column prop="phone"
                         label="电话"
                         header-align="center"
                         align="center">
        </el-table-column>
        <el-table-column prop="role"
                         label="角色"
                         width="120"
                         header-align="center"
                         align="center">
        </el-table-column>
        <el-table-column label="状态"
                         width="150"
                         header-align="center"
                         align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"
                       active-color="#13ce66"
                       inactive-color="rgb(235, 235, 235)"
                       @change="userStatusChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <!-- 编辑、修改、分配角色操作 -->
        <el-table-column label="操作"
                         width="180"
                         header-align="center"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-edit"
                       @click="handleEdit(scope.$index, scope.row)"></el-button>
            <el-button type="danger"
                       size="mini"
                       icon="el-icon-delete"
                       @click="handleDelete(scope.$index, scope.row)"></el-button>
            <el-tooltip effect="dark"
                        content="分配角色"
                        placement="top"
                        :enterable="false">
              <el-button type="warning"
                         size="mini"
                         icon="el-icon-star-off"
                         @click="handleDetail(scope.$index, scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="params.currentPage"
                     :page-sizes="[10, 20, 50, 100]"
                     :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="400">
      </el-pagination>

      <!-- 添加用户 -->
      <!-- 添加用户弹窗 -->
      <el-dialog title="提示"
                 :visible.sync="addDialogVisible"
                 width="50%">
        <!-- 添加用户表单 -->
        <el-form :model="addForm"
                 :rules="userFormRules"
                 ref="addFormRef"
                 label-width="100px">
          <el-form-item label="用户名"
                        prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input type="password"
                      v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱"
                        prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号"
                        prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="cancelAddUserInfo">取 消</el-button>
          <el-button type="primary"
                     @click="addUserInfo">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑用户 类似于添加用户 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const emailValidation = (rule, value, callback) => {
      // \d [0-9] \D [^0-9]  \w [a-zA-z0-9_] \W [^a-zA-z0-9_]
      // 建议不要在@前有小点 . /^[\w-\.]+@[\w-\.]+\.[a-zA-Z]{2,4}$/
      // 自定义邮箱校验规则
      const regExp = /^[\w-]+@[\w-]+\.[a-zA-Z]{2,4}$/
      if (!value || value === 'undefined') {
        callback(new Error('请输入邮箱'))
      } else if (!regExp.test(value)) {
        callback(new Error('请输入正确格式的邮箱'))
      } else {
        callback()
      }
    }
    // 自定义手机号校验规则
    const phoneValidation = (rule, value, callback) => {
      // 捕获括号会有性能损失 (3|4|5|7|8)
      const regExp = /^1[34578]\d{9}$/
      if (!value || value === 'undefined') {
        callback(new Error('请输入手机号'))
      } else if (!regExp.test(value)) {
        callback(new Error('请输入正确格式的手机号'))
      } else {
        callback()
      }
    }

    return {
      tableData: [],
      tableHeight: 350,
      params: {
        keyword: '',
        currentPage: 1,
        pageSize: 5
      },
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      userFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        email: [
          { validator: emailValidation, trigger: 'blur' }
        ],
        phone: [
          { validator: phoneValidation, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 请求列表数据
    getUserList () {
      setTimeout(() => {
        this.tableData = []
        for (let index = 0; index < 50; index++) {
          const element = {
            id: index,
            date: '2016-05-02',
            name: '王小虎-' + index,
            email: '123000' + index + '@qq.com',
            phone: '1550159' + index,
            role: (index % 3 === 1) ? '草级管理员' : '普通管理员',
            status: index % 3 === 1
          }

          this.tableData.push(element)
        }
      }, 1000)
    },
    // 改变用户状态
    userStatusChanged (item) {
      console.log(item)
    },
    // 添加用户
    addUserInfo () {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) { return this.$message.error('校验失败') }
        // const data = await this.$http.post('/adduser', this.params).catch(err => err)
        // console.log(data)

        try {
          const { data: res } = await this.$http.post('/adduser', this.params)
          this.$message.success('添加用户成功' + res)
        } catch (err) {
          this.$message.error(JSON.stringify(err))
        }
        // this.addDialogVisible = false
        // this.$refs.addFormRef.resetFields()
      })
    },
    // 取消添加用户
    cancelAddUserInfo () {
      this.addDialogVisible = false
      this.$refs.addFormRef.resetFields()
    },
    // 编辑用户
    handleEdit (index, item) {

    },
    // 删除用户
    async handleDelete (index, item) {
      console.log('删除用户')
      console.log(item)

      const deleteResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(deleteResult)

      if (deleteResult === 'confirm') {
        /**
         * 执行删除请求
         * const {data: res} = await this.$http.post('deleteuser', parmas).catch(err => err)
         * if (data && data.status && data.status === 200) { return this.$message.success('删除成功!')}
         * this.$message.info('已取消删除')
         */
        this.$message.success('删除成功!')
      } else {
        this.$message.info('已取消删除')
      }
    },
    // 分配角色
    handleDetail (index, item) {

    },
    // 改变每页条数
    handleSizeChange (val) {
      this.params.pageSize = val
      this.getUserList()
      console.log(`每页 ${val} 条`)
    },
    // 改变当前页码
    handleCurrentChange (val) {
      this.params.currentPage = val
      this.getUserList()
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
#userlist-wraper {
  height: 100%;

  .breadcrumb {
    margin-bottom: 15px;
    .userlist {
      font-size: 13px;
    }
  }
  .box-card {
    height: calc(100% - 30px);
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);

    .button-adduser {
      margin-left: 0px; //前面已经做了处理 -- global.scss
    }

    // .table-wrapper {
    //   margin: 10px auto;
    // }
  }
}
</style>
