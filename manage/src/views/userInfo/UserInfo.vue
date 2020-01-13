<style lang="scss" scoped>
@import "scss/mixin";
@import "scss/shared";

.package-manage-container {
  position: relative;
  width: 100%;
  padding: 0px 20px 100px;
  border-radius: 8px;
  min-height: 95vh;

  .operate-container {
    @include vertical-center;
    position: relative;
  }

  .main-container {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 20px auto;

    .module-name {
      font-size:22px;
      font-weight:400;
      line-height:37px;
      color:rgba(0,0,0,1);
    }

    .choice-time-container {
      @include flex-center;
      width: 100%;
      height: 40px;

      .number {
        display: block;
        width: 40px;
        height: 40px;
        text-align: center;
        border-bottom: 1px solid #000;
        font-size:22px;
        font-weight:400;
        line-height:40px;
        color:rgba(0,0,0,1);
      }
    }

    .button-container {
      @include flex-center;
      margin-top: 40px;
      width: 100%;
      height: 48px;
    }
  }
}
</style>

<template>
  <div class="package-manage-container">
    <custom-header
      name="充值中心"
      :no-slot="true"
      :no-create="true"
      :no-search="true"
    ></custom-header>
    <div class="main-container">
      <span class="module-name">充值金额</span>
      <div class="choice-time-container" style="margin-top: .2rem">
        <InputNumber :min="0" :max="1000" v-model="money" style="width: 1.5rem"></InputNumber>
      </div>
      <div class="button-container">
        <Button
          type="primary"
          @click="confirmSave"
        >保存</Button>
      </div>
    </div>
    <Spin size="large" fix v-if="pageIsLoading" class="custom-spin">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>正在获取数据...</div>
    </Spin>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import CustomHeader from "@/components/customHeader/CustomHeader.vue";
import CustomTable from "@/components/customTable/CustomTable.vue";
import WordButton from "@/components/wordButton/WordButton.vue";
import {userRequest} from "@/api/UserRequest";
import {operationFailMsg, operationSuccessMsg} from "@/utils/shared/message";
@Component({
  components: {WordButton, CustomTable, CustomHeader},
  name: 'UserInfo'
})
export default class UserInfo extends Vue {
  pageIsLoading: boolean = false;

  money: number = 0;

  confirmSave() {
    userRequest.updateMoney({
      money: this.money
    }).then(res => {
      if (res.isSuccess) {
        operationSuccessMsg('充值成功');
      } else {
        operationFailMsg(res.msg);
      }
    })
  }
}
</script>
