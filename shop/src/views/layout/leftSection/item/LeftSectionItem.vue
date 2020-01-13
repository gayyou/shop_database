<style lang="scss" scoped>
@import "scss/mixin";
.item-container {
  @include clear-float;
  position: relative;
  width: 100%;
  height: 80px;
  transition: .5s ease height;
  font-size: 22px;
  color: #fff;

  .item-info-container {
    &:hover {
      background-color: #287346;
    }

    cursor: pointer;
    position: relative;
    width: 100%;
    min-height: .56rem;
    z-index: 2;
    background-color: #418C5F;

    .choice-label {
      position: absolute;
      left: 0;
      top: 0;
      width: .07rem;
      height: .56rem;
      background-color: #4DB2C8;
    }

    .children-choice-label {
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
        width: .4rem;
        height: .4rem;
        margin-left: .38rem;
      }

      span {
        margin-left: .1rem;
        width: 1.5rem;
        height: .20rem;
        line-height: .22rem;
        text-align: left;
        color: #fff;
      }

      .span-active {
        text-align: left;
        font-weight: bold;
        color: #fff;
      }
    }
  }
}

.choiced {
  background-color: #287346!important;
}
</style>

<template>
  <div class="item-container" @click="changeModule"
    :style="childIsExist && status ? 'height: ' + 0.8 * (children.length + 1) + 'rem;' : ''"
  >
    <div class="item-info-container"
      :class="id === currentModuleID ? 'choiced' : ''"
    >
      <router-link
        :to="childIsExist ? '' : url"
      >
        <div class="module-info">
          <img :src="id === currentModuleID || childrenSelected ? activeIconUrl : iconUrl">
          <span :class="id === currentModuleID || childrenSelected ? 'span-active' : ''">{{ name }}</span>
          <Icon type="ios-arrow-down" style="display: block;float: right;margin-right: 0.16rem;color: #fff;transition: transform .5s ease;"
            v-if="childIsExist"
            :style="status ? 'transform: rotate(180deg)' : ''"
          ></Icon>
        </div>
      </router-link>
    </div>
    <left-section-children-item
      v-for="(item, index) in children"
      :key="item.name"
      :name="item.name"
      :url="item.url"
      :icon-url="item.iconUrl"
      :id="item.id"
      :style="status ? '' : 'transform: translateY(' + -0.8 * (index + 1) + 'rem)'"
    ></left-section-children-item>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop, Watch} from "vue-property-decorator";
import {indexManageStore} from "@/store/modules/IndexManageModule";
import LeftSectionChildrenItem from '@/views/layout/leftSection/item/childrenItem/LeftSectionChildrenItem.vue';
import {isInArray} from '@/utils/shared';
@Component({
  components: {LeftSectionChildrenItem}
})
export default class LeftSectionItem extends Vue {
  @Prop() children: Array<any> | undefined;

  @Prop() name!: string;

  @Prop() iconUrl!: string;

  @Prop() id!: number;

  @Prop() url!: string;

  @Prop() activeIconUrl!: string;

  // 如果这个组件是拥有子选项的，那么这个代表的是它是否是打开的状态
  private status: boolean = false;

  private childrenIDList: number[] = [];

  childrenSelected: boolean = false;

  get currentModuleID() {
    return indexManageStore.currentModuleID;
  }

  get childIsExist() {
    return this.children && this.children.length;
  }

  @Watch("currentModuleID")
  currentModuleIDHandler() {
    this.childrenSelected = isInArray(this.childrenIDList, indexManageStore.currentModuleID);
  }

  changeModule() {
    if (this.childIsExist) {
      // 如果是拥有子选项的话，那么进行更改状态
      this.status = !this.status;
      return ;
    }

    if (this.currentModuleID == this.id) {
      return ;
    }
    indexManageStore.setCurrentModuleID(this.id);
  }

  /**
   * 挂载前，如果本选项有子选项的话，那么将这个子选项的id放到id列表中
   */
  beforeMount() {
    if (this.children) {
      this.children.forEach((item: any) => {
        this.childrenIDList.push(item.id);
      });
    }
  }

  mounted() {
    // 页面挂载后，进行左边侧栏选择的初始化，如果当前的id在子列表中，那么就要进行展开左侧选择框并且进行点击的显示
    if (isInArray(this.childrenIDList, this.currentModuleID)) {
      this.status = true;
      this.childrenSelected = true;
    }
  }
}
</script>
