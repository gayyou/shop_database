<style lang="scss" scoped>
@import "scss/mixin";
.left-section-children-container {
  &:hover {
    background-color: #287346;
    color: rgba(16, 16, 16, 1);
  }

  cursor: pointer;
  position: relative;
  width: 100%;
  height: .8rem;
  transition: .5s ease transform;
  z-index: 1;
  background-color: #378255;

  .choice-label {
    position: absolute;
    left: 0;
    top: 0;
    width: .07rem;
    height: .56rem;
    background-color: rgba(23, 128, 220, 1)!important;
  }

  .same-level-selected {
    position: absolute;
    left: 0;
    top: 0;
    width: .07rem;
    height: .56rem;
    background-color: #C6DDF1;
  }

  .module-info {
    @include vertical-center;

    position: relative;
    width: 100%;
    height: .8rem;

    img {
      display: block;
      float: left;
      width: .2rem;
      height: .2rem;
      margin-left: .73rem;
    }

    span {
      display: block;
      margin-left: .09rem;
      width: 100%;
      text-align: center;
      height: .20rem;
      color: #fff;
      font-size: .22rem;
      line-height: .22rem;
    }
  }
}

.choiced {
  background-color: #287346;
  font-weight: bold;
}
</style>

<template>
  <div class="left-section-children-container"
    @click="changeModule"
    :class="id === currentModuleID ? 'choiced' : ''"
  >
    <router-link :to="url">
      <div></div>
      <div class="module-info">
        <img v-if="iconUrl.length !== 0" :src="iconUrl">
        <span>{{ name }}</span>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from 'vue-property-decorator';
import {indexManageStore} from '@/store/modules/IndexManageModule';

@Component
export default class LeftSectionChildrenItem extends Vue {
  @Prop() name!: string;

  @Prop() iconUrl!: string;

  @Prop() id!: number;

  @Prop() url!: string;

  // @Prop() clickSameLevel!: boolean;

  get currentModuleID() {
    return indexManageStore.currentModuleID;
  }

  changeModule(event: any) {
    event.stopPropagation();
    if (this.currentModuleID == this.id) {
      return ;
    }
    indexManageStore.setCurrentModuleID(this.id);
  }
}
</script>
