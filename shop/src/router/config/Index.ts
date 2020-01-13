import {RouteConfig} from "vue-router";
import IndexLayout from "@/views/layout/IndexLayout.vue";

export const indexRouter: RouteConfig = {
  name: '主页',
  path: '/index',
  redirect: '/index/good',
  component: IndexLayout,
  meta: {
    title: '主页'
  },
  children: [
    {
      name: '商品列表',
      path: 'good',
      meta: {
        title: '商品列表'
      },
      component: () => import('@/views/goodList/GoodList.vue')
    },
    {
      name: '订单列表',
      path: 'orderlist',
      meta: {
        title: '订单列表'
      },
      component: () => import('@/views/orderList/OrderList.vue')
    },
    {
      name: '我的商店',
      path: 'storeList',
      meta: {
        title: '我的商店'
      },
      component: () => import('@/views/storeList/StoreList.vue')
    }
  ]
};
