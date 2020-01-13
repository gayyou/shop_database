<style lang="scss" scoped>
@import "scss/mixin";

.header-container {
  position: relative;
  width: 100%;
  height: 60px;

  .header-name {
    display: block;
    float: left;
    margin-top: 20px;
    font-size:20px;
    font-weight:400;
    line-height:34px;
    color:rgba(65,140,95,1);
  }

  .header-tool-container {
    @include vertical-center;

    float: right;
    position: relative;
    width: 20px;
    height: 40px;
    margin-top: 10px;
  }

  .search-container {
    @include vertical-center;

    float: right;
    position: relative;
    width: 240px;
    height: 30px;
    margin-top: 25px;

    .header-input {
      display: block;
      float: right;
      width: 222px;
      height: 30px;
      font-size: 16px;
      border: 1px solid #eee;
      border-radius: 8px;
      padding-left: 10px;
      padding-right: 30px;
      color: #8D8D8D;
    }

    .search-icon {
      position: absolute;
      width: 15px;
      height: 15px;
      top: 7px;
      right: 25px;
    }
  }
}
</style>

<template>
  <div class="header-container">
    <span class="header-name">{{ name }}</span>
    <div class="header-tool-container">
      <Icon
        type="md-close"
        style="cursor: pointer; display: block; font-size: .24rem;color: #1e1e1e"
        @click="closeLayer"
      />
    </div>
    <div class="search-container">
      <input v-if="!noSearch" @keydown.enter="searchEvent" class="header-input" v-model="searchValue" placeholder="搜索"/>
      <Icon
        v-if="!noSearch"
        class="search-icon"
        type="md-search"
        style="cursor: pointer"
        @click="searchEvent"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import {Prop} from "vue-property-decorator";

@Component({

})
export default class FloatLayerHeader extends Vue {
  @Prop(String) name!: string;

  @Prop(Boolean) noSearch!: boolean;

  searchValue: string = '';

  searchEvent() {
    this.$emit('on-search', this.searchValue);
    this.searchValue = '';
  }

  closeLayer() {
    this.$emit('on-close');
  }
}
</script>
