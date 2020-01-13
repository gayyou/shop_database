<script src="../../../../../../turing/client/src/main.ts"></script>
<style lang="scss" scoped>
@import "scss/mixin";
.right-section {
  @include clear-float;

  position: relative;
  flex: 1;
  padding-bottom: .3rem;

  .right-section-head {
    @include clear-float;

    position: relative;
    width: 100%;
    border-radius: 8px;
    background-color: #fff;
  }

  .page-path {
    @include vertical-center;

    position: relative;
    width: 100%;
    z-index: 449;
    height: .8rem;
    color: rgba(16, 16, 16, 1);
    background-color: #fff;
    font-size: .14rem;

    .breadcrumb-item {
      font-size:20px;
      font-weight:400;
      line-height:34px;
      color:rgba(141,141,141,1);
    }

    .user-manage-tool {
      @include vertical-center;

      position: absolute;
      cursor: pointer;
      width: 140px;
      height: 30px;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      font-size:22px;
      font-weight:400;
      color:rgba(61,61,61,1);

      .user-manage-inner-tool {
        @include clear-float;
        @include vertical-center;

        width: 140px;
        height: 30px;

        .user-name {
          display: block;
          font-size: 20px;
          width: 70px;
        }
      }


    }
  }

  .main-area {
    @include clear-float;

    position: relative;
    width: 1640px;
    margin: 20px auto;
    background-color: #fff;
    min-height: 90vh;
    border-radius: 8px;
    overflow: hidden;
  }
}
.slide-enter {
  transform: translateX(-.2rem);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
  transition: opacity .25s, transform .3s;
}
.slide-leave {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-.2rem);
  opacity: 1;
}
.slide-leave-active,
.slide-enter-active {
  transition: opacity .25s, transform .3s;
}
</style>

<template>
  <section class="right-section">
    <div class="page-path">
      <Breadcrumb style="text-align: start; padding-left: .36rem;">
        <BreadcrumbItem
          v-for="(item, index) in breadcrumbList"
          :to="item.url"
          :key="item.name"
          :class="(index === breadcrumbList.length - 1) ? 'last-breadcrumb' : ''"
          class="breadcrumb-item"
        >{{ item.name }}
        </BreadcrumbItem>
      </Breadcrumb>
      <Dropdown
        style="float: right;display: block"
        class="user-manage-tool"
        trigger="click"
        @on-click="changeSelect"
      >
        <div class="user-manage-inner-tool"
          @click="openToolDownList"
        >
          <span class="user-name">{{ userName }}</span>
          <Icon type="ios-arrow-down" style="display: block;float: right;color: #3D3D3D;margin-left: 0.2rem;transition: transform .5s ease;"
            :style="status ? 'transform: rotate(180deg)' : ''"
          ></Icon>
        </div>
        <DropdownMenu
          slot="list"
        >
          <DropdownItem name="exit" style="text-align: center">退出登陆</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="main-area">
      <img :src="images" style="z-index: 0;position: absolute; width: 8rem;height: 7.18rem;top: .45rem;left: 50%;transform: translateX(-50%)" />
      <router-view :key="key"/>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {routeManager} from "@/store/modules/RouteManager";
import {Watch} from 'vue-property-decorator';
import {changeTitle, getIndexBaseRoute} from "@/utils/shared/routeUitl";
import {breadcrumbListMap} from "@/store/breadcrumbConfig";
import {userManage} from "@/store/modules/UserManage";

@Component({})
export default class RightSection extends Vue {
  get userName() {
    return userManage.userName;
  }

  get key() {
    return this.$route.path;
  }

  get breadcrumbList() {
    return routeManager.breadcrumbList;
  }

  status: boolean = false;

  openToolDownList() {
    this.status = !this.status;
  }


  changeSelect(value: string) {
    switch (value) {
      case 'exit': {
        this.$router.push('/user/login')
      }
    }
  }

  images: string = require('@assets/images/background.png');

  /**
   * @description 组件创建前,将页面与路径完全匹配
   */
  beforeCreate() {
    let name = this.$route.name || '';
    let basePath = getIndexBaseRoute(this.$route.path, 2);

    if (breadcrumbListMap.has(name)) {
      let list = breadcrumbListMap.get(name);
      routeManager.cleanBreadcrumbList();
      for (let i = 0; i < list.length; i++) {
        routeManager.addBreadItem({
          name: list[i].name,
          url: list[i].url
        });
      }
    } else {
      routeManager.setBasePath(basePath);
    }
    // 修改title
    changeTitle(this.$route.meta.title);
  }

  @Watch('$route.path')
  handlerRouteJump(newValue: string) {
    let name: string = this.$route.name || '';
    if (breadcrumbListMap.has(name)) {
      let list = breadcrumbListMap.get(name);
      routeManager.cleanBreadcrumbList();
      for (let i = 0; i < list.length; i++) {
        routeManager.addBreadItem({
          name: list[i].name,
          url: list[i].url
        });
      }
    } else {
      routeManager.resetBreadcrumbList(getIndexBaseRoute(newValue, 2));
    }
    // 修改title
    changeTitle(this.$route.meta.title);
  }
}
</script>
