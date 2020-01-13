<style lang="scss" scoped>
@import "scss/mixin";
.global-layer {
  @include flex-center;
  position: fixed;
  width: 200vw;
  height: 200vh;
  top: -50%;
  left: -50%;
  background-color: rgba(0, 0, 0, .2);
  z-index: 500;
}
.fade-enter-active, .fade-leave-active {
  transition: all .1s linear;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(.9);
}
.fade-enter-to, .fade-leave {
  opacity: 1;
}
</style>

<template>
  <transition name="fade">
    <div v-if="isShow" class="global-layer">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class GlobalLayer extends Vue {
  isShow: boolean = false;

  mounted() {
    this.isShow = true;
  }
}
</script>
