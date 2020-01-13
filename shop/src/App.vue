<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {getToken} from "@/utils/shared/localStorage";
import {isUndef} from "@/utils/shared";
import {userManage} from "@/store/modules/UserManage";

@Component
export default class App extends Vue {
  created() {
    new Promise()
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'SourceHanSansCN-Regular';
  src: url('assets/fonts/SourceHanSansCN-Regular.ttf') format('truetype');
}
#app {
  font-family: 'SourceHanSansCN-Regular', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* element滚动条 */
.el-scrollbar__wrap {
  overflow-x: hidden!important;
}
</style>
