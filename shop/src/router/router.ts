import Vue from 'vue';
import Router, {RouteConfig} from 'vue-router';
import {indexRouter} from "@/router/config/Index";
import {loginRoute} from "@/router/config/Login";
import {ShopLogin} from "@/router/config/ShopLogin";

Vue.use(Router);

export const constantRoutes: RouteConfig[] = [
  indexRouter,
  ShopLogin,
  {
    path: '',
    redirect: '/index'
  }
];

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
});
