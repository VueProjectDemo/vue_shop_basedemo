/*
 * @Author: OBKoro1
 * @Date: 2022-04-27 16:29:06
 * @LastEditors:
 * @LastEditTime: 2022-05-12 16:31:17
 * @FilePath: /vue_shop/src/main.js
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */

/**
 * 参考资料
 * https://www.bilibili.com/video/BV1x64y1S7S7?p=41&spm_id_from=pageDriver
 * https://element.eleme.cn/#/zh-CN/component/menu
 * https://element.eleme.cn/#/zh-CN/component/quickstart
 * https://router.vuejs.org/zh/guide/essentials/navigation.html#%E6%9B%BF%E6%8D%A2%E5%BD%93%E5%89%8D%E4%BD%8D%E7%BD%AE
 * https://javasoho.com/axios/index.html#axios-head-url-config
 * 正则表达式校验：
 * https://tool.oschina.net/regex/
 */

// ！！！终端命令：vue ui, 打开可视化GUI操作界面，轻松配置插件、运行等（命令式操作转为可视化操作）
/**
 * 导入插件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

/**
 * 导入全局js
 */
import './plugins/element.js'

/**
 * 导入全局css
 */
import './assets/css/global.scss'
import './assets/fonts/iconfont.css'

// 配置请求路径
axios.defaults.baseURL = 'http://www.xxx.xx'

// 挂载axios
Vue.prototype.$http = axios
// axios添加请求拦截器
axios.interceptors.request.use(config => {
  // config.headers.Accept = 'application/json'
  // 往请求头添加 token
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
