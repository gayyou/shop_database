<style lang="scss" scoped>
@import "scss/mixin";
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  .login-main-container {
    @include clear-float;
    position: relative;
    width: 400px;
    margin: 142px auto;

    .logo-image {
      width: 400px;
      height: 120px;
    }

    .page-name {
      width: 100%;
      display: block;
      margin-top: 40px;
      text-align: center;
      height: 37px;
      font-size:22px;
      line-height:37px;
      color:rgba(255,255,255,1);
    }

    .input-msg {
      padding-left: 10px;
      padding-right: 10px;
      width:320px;
      height:40px;
      margin: 20px auto;
      background:rgba(255,255,255,1);
      border:1px solid rgba(112,112,112,1);
      opacity:0.8;
      color:rgba(104,104,104,1);
      border-radius:4px;
    }

    .login-button {
      &:hover {
        opacity: .7;
      }

      display: block;
      margin: 30px auto;
      width: 180px;
      height: 45px;
      font-size: 26px;
      color: #fff;
      background-color: #287346;
      border-radius: 8px;
      border: none!important;
    }
  }
  .button-container {

  }
}
</style>

<template>
  <div class="login-container" :style="'background-image: url(' + backgroundUrl +')'">
    <div class="login-main-container">
<!--      <img class="logo-image" src="@assets/images/icons/logo.png" />-->
      <span class="page-name">欢迎使用网上购物系统客户端</span>
      <input class="input-msg" v-model="account" @input="limitAccount" placeholder="用户名" />
      <input class="input-msg" v-model="password" @input="limitPassword" @keydown.enter="login" placeholder="密码" type="password" />
      <div class="button-container">
        <Button class="login-button" @click="login" :loading="loading">登陆</Button>
        <Button class="login-button" @click="toRegister">注册</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import {userManage} from "@/store/modules/UserManage";
import {operationFailMsg} from "@/utils/shared/message";
import {getUserName, setToken, setUserName} from "@/utils/shared/localStorage";
import {isUndef, limitString} from "@/utils/shared";
import {changeTitle} from "@/utils/shared/routeUitl";
import {userRequest} from "@/api/UserRequest";

@Component
export default class Login extends Vue {
  account: string = '';

  password: string = '';

  loading: boolean = false;

  backgroundUrl: string = require('@assets/images/login_background.jpg');

  limitAccount() {
    this.account = limitString(this.account, 16);
  }

  limitPassword() {
    this.password = limitString(this.password, 32);
  }

  toRegister() {
    this.$router.replace('/user/register');
  }

  checkEmpty() {
    if (this.account.length == 0 || this.password.length == 0) {
      return false;
    }

    return true;
  }

  login() {
    if (this.loading) {
      return ;
    }
    if (!this.checkEmpty()) {
      operationFailMsg('请填写账号和密码！');
      return ;
    }
    this.loading = true;
    userRequest.login({
      account: this.account,
      pwd: this.password
    }).then(res => {
      this.loading = false;
      if (res.isSuccess) {
        setUserName(this.account);
        setToken(res.data);
        this.$router.replace('/index');
      } else {
        operationFailMsg('请检查您的账号密码');
      }
    })
  }

  beforeMount() {
    if (!isUndef(getUserName())) {
      this.account = getUserName() || '';
    }
    changeTitle('登陆');
  }
}
</script>
