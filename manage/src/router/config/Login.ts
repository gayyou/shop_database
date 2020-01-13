import {RouteConfig} from "vue-router";
import IndexLayout from "@/views/layout/IndexLayout.vue";
import Login from "@/views/login/Login.vue";
import App from "@/App.vue";

export const loginRoute: RouteConfig = {
  name: '登陆',
  path: '/user',
  redirect: '',
  component: App,
  children: [
    {
      path: 'login',
      name: '登陆',
      meta: {
        title: '登陆'
      },
      component: Login
    },
    {
      path: 'register',
      name: '注册',
      meta: {
        title: '注册'
      },
      component: () => import('@/views/register/Register.vue')
    },
  ]
};
