<style lang="scss" scoped>
@import "scss/mixin";
.left-section {
  display: flex;
  position: relative;
  width: 2.4rem;
  height: 100vh;
  background-color: #418C5F;
  overflow: hidden;

  .fixed-body {
    position: fixed;
    display: flex;
    padding-bottom: 40px;
    z-index: 11;
    width: 2.4rem;
    height: 100vh;
    background-color: #418C5F;
    left: 0;
    top: 0;
  }

  .user-base-info-container {
    @include clear-float;

    width: 100%;

    .image-container {
      display: block;
      width: 220px;
      height: 66px;
      margin-top: 10px;
      margin-bottom: 20px;

      img {
        width: 100%;
      }
    }

    .user-name {
      display: block;
      width: 100%;
      color: rgba(16, 16, 16, 1);
      font-size: .2rem;
      text-align: center;
    }

    .user-class {
      width: 100%;
      height: .20rem;
      color: rgba(170, 170, 170, 1);
      font-size: .14rem;
      text-align: center;
      margin-top: .1rem;
    }
  }

  .choice-container {
    position: relative;
    width: 100%;
    margin-top: .28rem;
  }
}
</style>

<template>
  <section class="left-section">
    <div class="fixed-body">
      <el-scrollbar
        :native="false"
      >
        <div class="user-base-info-container">
          <div class="image-container">
<!--            <img class="head-image" :src="headImage"/>-->
          </div>
        </div>
        <div class="choice-container">
          <left-section-item
            v-for="item in moduleList"
            :name="item.name"
            :icon-url="item.iconUrl"
            :active-icon-url="item.activeIconUrl"
            :id="item.id"
            :key="item.name"
            :url="item.url"
            :children="item.children"
          ></left-section-item>
        </div>
      </el-scrollbar>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import LeftSectionItem from '@/views/layout/leftSection/item/LeftSectionItem.vue';
import {indexManageStore} from "@/store/modules/IndexManageModule";
import {getIndexBaseRoute} from "@/utils/shared/routeUitl";
import {userManage} from "@/store/modules/UserManage";
import {Watch} from "vue-property-decorator";
@Component({
  components: {LeftSectionItem}
})
export default class LeftSection extends Vue {
  get isSuperManager() {
    return userManage.isSuperManager;
  }

  get headImage() {
    return indexManageStore.headImage;
  }

  get moduleList() {
    return indexManageStore.moduleList;
  }

  initItems() {
    indexManageStore.resetModuleList();
  }

  @Watch('isSuperManager')
  handler() {
    this.initItems();
  }

  beforeMount() {
    this.initItems();
    this.initModuleChoice();
  }

  initModuleChoice() {
    let path: string = this.$route.path;
    indexManageStore.setCurrentModuleIDByPath(getIndexBaseRoute(path, 3));
  }
}
</script>
