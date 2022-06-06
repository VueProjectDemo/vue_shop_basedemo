<!--
 * @Author: OBKoro1
 * @Date: 2022-04-27 17:31:00
 * @LastEditors:
 * @LastEditTime: 2022-05-07 17:46:36
 * @FilePath: /vue_shop/src/components/LoginContainer.vue
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
-->

<template>
  <div id="login_wraper">
    <!-- 登录 -->
    <div class="login_box">
      <!-- 登录logo -->
      <div class="avatar_box">
        <img src="../assets/logo.png"
             alt=""
             class="login_logo">
      </div>

      <!-- 登录表单 -->
      <el-form ref="formRef"
               :rules="rules"
               :model="form"
               label-width="0px"
               class="login_form">
        <el-form-item prop="username">
          <el-input v-model="form.username"
                    placeholder="请输入账号"
                    prefix-icon="iconfont icon-user"
                    clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password"
                    placeholder="请输入密码"
                    prefix-icon="iconfont icon-3702mima"
                    clearable
                    type="password"></el-input>
        </el-form-item>
        <!-- 表单按钮区域 -->
        <el-form-item class="form_button">
          <el-button type="primary"
                     @click="submitForm('formRef')">登录</el-button>
          <el-button type="info"
                     @click="resetForm('formRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      validType: 0, // 0 未校验，1 成功，2失败
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formRefName) {
      // 带接口请求的版本
      // this.$refs[formRefName].validate((isValid, props) => {
      //   if (!isValid) return
      //   const { data: res } = this.$http.post('login.html', this.form)
      //   console.log(res)
      // })
      this.$refs[formRefName].validate((isValid, props) => {
        if (isValid) {
          if (this.form.username === 'admin' && this.form.password === '123456') {
            this.$message({
              message: '校验通过，可以登录',
              type: 'success'
            })
            // 浏览器存储登录token信息
            window.sessionStorage.setItem('token', '3xad434asdfas1234aad6464')
            // 跳转到主页home
            this.$router.push('/home')
          } else {
            this.$message({
              message: '登录失败，用户名或密码错误',
              type: 'error'
            })
          }
        } else {
          let errMsg = ''
          console.log(props)
          if (props.username) {
            errMsg += props.username[0].message
          }
          if (props.password) {
            errMsg += ' ' + props.password[0].message
          }
          this.$message.error(errMsg)
        }
      })
    },
    resetForm (formRefName) {
      // console.log(this)
      this.$refs[formRefName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
#login_wraper {
  height: 100%;
  background: gray;
  .login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;

    .avatar_box {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: 0 0 10px #ddd;

      .login_logo {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #eee;
        background-color: #eee;
      }
    }

    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;

      .form_button {
        display: flex;
        justify-content: right;
      }
    }
  }
}
</style>
