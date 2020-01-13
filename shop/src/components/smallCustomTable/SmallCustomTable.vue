<style lang="scss" scoped>
@import "scss/mixin";
.custom-table-container {
  @include clear-float;

  position: relative;
  width: 100%;


  ::v-deep .ivu-table-header th {
    background-color: rgba(248,248,248,1);
    color: #3D3D3D;
    font-size: 16px;
    height: 30px;
    padding: 0 10px;
    text-align: start;
  }

  ::v-deep .ivu-table-body td {
    background-color: transparent!important;
    border-bottom: 1px solid #EBEEF5;
    color: #606266;
    padding: 10px 10px;
    height: auto;
    left: 431px;
    top: 529px;
    width: 197px;
    color: rgba(96, 98, 102, 1);
    font-size: 16px;
    text-align: start;
  }

  ::v-deep .ivu-table-cell {
    padding: 0;
  }
}
</style>

<template>
  <div class="custom-table-container">
    <Table
      :columns="columns"
      :data="data"
    >
      <template
        slot-scope="data"
        slot="action"
      >
        <slot :index="data.index" :row="data.row" :column="data.column" name="action"></slot>
      </template>
      <template
        slot-scope="directionData"
        slot="progress"
      >
        <slot :index="directionData.index" :row="directionData.row" :column="directionData.column" name="progress"></slot>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";

@Component
export default class SmallCustomTable extends Vue {
  @Prop() columns!: any[];

  @Prop() data!: any[];
}
</script>
