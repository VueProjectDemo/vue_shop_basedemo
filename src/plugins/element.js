/*
 * @Author: OBKoro1
 * @Date: 2022-04-27 16:31:37
 * @LastEditors:
 * @LastEditTime: 2022-05-12 15:35:13
 * @FilePath: /vue_shop/src/plugins/element.js
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
import Vue from 'vue'
import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  Button,
  Table,
  TableColumn,
  Pagination,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Loading,
  MessageBox,
  Message,
  Tooltip,
  Dialog
} from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Row)
Vue.use(Col)

Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)

Vue.use(Tooltip)
Vue.use(Dialog)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
