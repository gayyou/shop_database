import {RouteConfig} from "vue-router";
import IndexLayout from "@/views/layout/IndexLayout.vue";
import Login from "@/views/login/Login.vue";
import App from "@/App.vue";

export const ShopLogin: RouteConfig = {
  name: '登陆',
  path: '/shop',
  redirect: '',
  component: App,
  children: [
    {
      path: 'login',
      name: '登陆',
      meta: {
        title: '登陆'
      },
      component: () => import('@/views/login/ShopLogin.vue')
    },
    {
      path: 'register',
      name: '注册',
      meta: {
        title: '注册'
      },
      component: () => import('@/views/register/ShopRegister.vue')
    },
  ]
};
