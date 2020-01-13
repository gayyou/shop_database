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
    opacity:1;
  }

  .word-button {
    float: right;
    display: block;
    margin-right: 20px;
    margin-top: 20px;
    line-height: 40px;
  }

  .header-tool-container {
    @include vertical-center;

    float: right;
    position: relative;
    width: 240px;
    height: 40px;
    margin-top: 20px;

    .header-input {
      display: block;
      float: right;
      width: 222px;
      height: 40px;
      border: 1px solid #eee;
      border-radius: 8px;
      padding-left: 10px;
      padding-right: 30px;
      color: #8D8D8D;
    }

    .search-icon {
      position: absolute;
      width: 25px;
      height: 25px;
      top: 12px;
      right: 25px;
    }
  }

  .slot-container {
    @include vertical-center;
    width: 230px;
    float: right;
    height: 40px;
    margin-top: 20px;
  }
}
</style>

<template>
  <div class="header-container">
    <span class="header-name">{{ name }}</span>
    <div class="header-tool-container">
      <input v-if="!noSearch" @keydown.enter="searchEvent" class="header-input" v-model="searchValue" placeholder="搜索"/>
      <Icon
        v-if="!noSearch"
        class="search-icon"
        type="md-search"
        style="cursor: pointer"
        @click="searchEvent"
      />
    </div>
    <div v-if="!noSlot" :style="slotStyle" class="slot-container"><slot></slot></div>
    <word-button
      v-if="!noCreate"
      class="word-button"
      type="primary"
      @click="addEvent"
    >新增</word-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import WordButton from "@/components/wordButton/WordButton.vue";
@Component({
  components: {WordButton},
  name: 'CustomHeader'
})
export default class CustomHeader extends Vue {
  @Prop(String) name!: string;

  @Prop(Boolean) noCreate!: boolean;

  @Prop(Boolean) noSearch!: boolean;

  @Prop(Boolean) noSlot!: boolean;

  @Prop(String) slotStyle!: string;

  searchValue: string = '';

  addEvent(event: any) {
    this.$emit('on-add', event);
  }

  searchEvent() {
    this.$emit('on-search', this.searchValue);
    this.searchValue = '';
  }
}
</script>
