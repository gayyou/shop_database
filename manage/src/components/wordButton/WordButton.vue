<style lang="scss" scoped>
.word-button {
  display: block;
  line-height: 26px;
  font-size: 18px;
  text-align: center;
}
.corsor-type {
  cursor: pointer;
}
</style>

<template>
  <span
    class="word-button"
    :style="'color: ' + color"
    :class="type === 'disable' ? '' : 'corsor-type'"
    @click="clickEvent"
  ><slot></slot></span>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from 'vue-property-decorator';

@Component
export default class WordButton extends Vue {
  @Prop(String) type!: string;

  typeList: string[] = ['primary', 'disable', 'delete'];

  color: string = '';

  clickEvent(event: any) {
    if (this.type == 'disable') {
      return ;
    }
    this.$emit('click', event);
  }

  beforeMount() {
    switch (this.type) {
      case 'primary': {
        this.color = '#1989FA';
        break;
      }

      case 'disable': {
        this.color = '#AAA';
        break;
      }

      case 'delete': {
        this.color = '#FF5E63';
        break;
      }

      case 'green': {
        this.color = '#418C5F';
        break;
      }

      default: {
        this.color = '#1989FA';
      }
    }
  }
}
</script>
