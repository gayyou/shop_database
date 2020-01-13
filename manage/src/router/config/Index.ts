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
      name: '购物车列表',
      path: 'cartList',
      meta: {
        title: '购物车列表'
      },
      component: () => import('@/views/cartList/CartList.vue')
    },
    {
      name: '商店列表',
      path: 'storeList',
      meta: {
        title: '商店列表'
      },
      component: () => import('@/views/storeList/StoreList.vue')
    },
    {
      name: '充值中心',
      path: 'info',
      meta: {
        title: '充值中心'
      },
      component: () => import('@/views/userInfo/UserInfo.vue')
    }
  ]
};
