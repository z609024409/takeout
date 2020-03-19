import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {path: '/',name: 'login',component: Login},
    {path: '/logout',name: 'logout',component: () => import('../views/logout.vue')},
    {path: '/index',name: 'index',component: () => import('../views/index.vue'),children:[
      {path:'/',name:'homes',component:()=>import('../views/homes.vue')},
      {path:'/index/control',name:'control',component:()=>import('../views/control.vue'),meta:['订单管理']},
      {path:'/index/personal',name:'personal',component:()=>import('../views/personal.vue')},
      {path:'/index/goods_list',name:'goods_list',component:()=>import('../views/goods_list.vue'),meta:['商品管理','商品列表']},
      {path:'/index/goods_add',name:'goods_add',component:()=>import('../views/goods_add.vue'),meta:['商品管理','添加商品']},
      {path:'/index/goods_edit/:id',name:'goods_edit',component:()=>import('../views/goods_edit.vue'),meta:['商品管理','商品修改']},
      {path:'/index/shop',name:'shop',component:()=>import('../views/shop.vue'),meta:['店铺管理']},
      {path:'/index/account_edit/:id',name:'account_edit',component:()=>import('../views/account_edit.vue'),meta:['账号管理','编辑账户']},
      {path:'/index/account_list',name:'amdin_add',component:()=>import('../views/account_list.vue'),meta:['账号管理','账户列表']},
      {path:'/index/account_add',component:()=>import('../views/account_add.vue'),meta:['账号管理','添加账户']},
      {path:'/index/account_changepwd',component:()=>import('../views/account_changepwd.vue'),meta:['账号管理','修改密码']},
      {path:'/index/sell_dity',name:'sell_dity',component:()=>import('../views/sell_dity.vue'),meta:['销售统计','商品统计']},
      {path:'/index/sell_order',name:'sell_order',component:()=>import('../views/sell_order.vue'),meta:['销售统计','订单统计']},
    ]}
  ]
})
