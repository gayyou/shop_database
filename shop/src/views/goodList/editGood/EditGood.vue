<style lang="scss" scoped>
@import "scss/shared";
@import "scss/mixin";
.edit-package-container {
  position: relative;
  width:720px;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 6px rgba(0,0,0,0.16);
  opacity:1;
  border-radius:8px;
  padding: 0 20px 20px 20px;

  .item-container {
    @include clear-float;
    display: flex;
    margin-top: 20px;
    width: 100%;

    .item-input {
      width:560px;
      height:36px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(198,198,198,1);
      opacity:1;
      border-radius:4px;
      margin-left: 20px;
      padding-left: 5px;
      padding-right: 5px;
    }

    .text-area {
      width:560px;
      height:160px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(198,198,198,1);
      opacity:1;
      border-radius:4px;
      margin-left: 20px;
      resize: none;
      padding: 5px;
    }
  }

  .half-section {
    @include clear-float;

    width: 50%;
    display: flex;
  }

  .button-container {
    @include flex-center;
    position: relative;
    height: 48px;
    margin-top: 20px;
  }
  .item-key {
    width: 60px;
  }
}
</style>

<template>
  <global-layer>
    <div class="edit-package-container">
      <float-layer-header
        :name="title"
        :no-search="true"
        @on-close="closeLayer"
      ></float-layer-header>
      <div class="item-container">
        <span class="item-key">名称</span>
        <input
          :disabled="!isCreate"
          class="item-input"
          v-model="localGoodName"
          @input="limitName"
        />
      </div>
      <div class="item-container">
        <span class="item-key">详情</span>
        <textarea
          class="text-area"
          v-model="localDetail"
          @input="limitPhone"
        ></textarea>
      </div>
      <div class="item-container">
        <span class="item-key">价格</span>
        <InputNumber :max="99999" :min="0" v-model="localPrice" style="margin-left: 0.2rem;width: 2.2rem"></InputNumber>
      </div>
      <div class="item-container">
        <span class="item-key">库存</span>
        <InputNumber :max="99999" :min="0" v-model="localReserve" style="margin-left: 0.2rem;width: 2.2rem"></InputNumber>
      </div>
      <div class="button-container">
        <Button
          @click="showCancelModal"
        >取消</Button>
        <Button
          type="primary"
          style="margin-left: .4rem"
          @click="showConfirmModal"
          :loading="isLoading"
        >确定</Button>
      </div>
      <Modal
        v-model="cancelModal.isShow"
        title="取消操作"
        @on-ok="cancelHander"
      >
        <p>系统不会保存您的修改，确定退出吗？</p>
      </Modal>
      <Modal
        v-model="confirmModal.isShow"
        title="保存操作"
        @on-ok="confirmHandler"
      >
        <p v-if="isCreate">确定增加商品: </p>
        <p v-else>确定将商品修改为: </p>
        <p>名称: <span style="font-weight: bold;color: #418c5f;font-size: .2rem">{{ localGoodName }}</span></p>
        <p>详情: <span style="font-weight: bold;color: #418c5f;font-size: .2rem">{{ localDetail }}</span></p>
        <p>价格: <span style="font-weight: bold;color: #418c5f;font-size: .2rem">{{ localPrice }}</span></p>
        <p>库存: <span style="font-weight: bold;color: #418c5f;font-size: .2rem">{{ localReserve }}</span></p>
        <p>确定此操作吗？</p>
      </Modal>
    </div>
  </global-layer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import GlobalLayer from "@/components/globalLayer/GlobalLayer.vue";
import FloatLayerHeader from "@/components/floatLayerHeader/FloatLayerHeader.vue";
import {Prop} from "vue-property-decorator";
import {limitString} from "@/utils/shared";
import {operationFailMsg, operationSuccessMsg} from "@/utils/shared/message";
import {goodRequest} from "@/api/GoodRequest";
@Component({
  components: {FloatLayerHeader, GlobalLayer}
})
export default class EditManager extends Vue {
  @Prop(String) goodName!: string;

  @Prop(String) detail!: string;

  @Prop(Number) price!: number;

  @Prop(Number) reserve!: number;

  @Prop(Number) storeId!: number;

  @Prop(Number) goodId!: number;

  localGoodName: string = '';

  localDetail: string = '';

  localReserve: number = 0;

  localPrice: number = 0;

  title: string = '编辑管理员';

  isCreate: boolean = false;

  isLoading: boolean = false;

  cancelModal: any = {
    isShow: false
  };

  confirmModal: any = {
    isShow: false,
    msg: ''
  };

  limitName() {
    this.localGoodName = limitString(this.localGoodName, 16);
  }
  limitPhone() {
    this.localDetail = limitString(this.localDetail, 125);
  }

  closeLayer() {
    this.$emit('on-close');
  }

  showCancelModal() {
    if (this.localGoodName != this.goodName
      || this.localDetail != this.detail
      || this.localReserve != this.reserve
      || this.localPrice != this.price
    ) {
      this.cancelModal.isShow = true;
    } else {
      this.cancelHander();
    }
  }

  confirmHandler() {
    this.isLoading = true;
    if (this.isCreate) {
      goodRequest.addGood({
        name: this.localGoodName,
        price: this.localPrice,
        storeId: this.storeId,
        reserve: this.localReserve,
        detail: this.localDetail
      }).then(res => {
        this.isLoading = false;
        if (res.isSuccess) {
          operationFailMsg('增加商品成功');
          this.renewHandler();
        } else {
          operationFailMsg(res.msg);
        }
      })
    } else {
      goodRequest.updateGood({
        name: this.localGoodName,
        price: this.localPrice,
        reserve: this.localReserve,
        detail: this.localDetail,
        id: this.goodId
      }).then(res => {
        this.isLoading = false;
        if (res.isSuccess) {
          operationFailMsg('修改商品成功');
          this.renewHandler();
        } else {
          operationFailMsg(res.msg);
        }
      })
    }
  }

  renewHandler() {
    this.$emit('on-renew');
    this.cancelHander();
  }

  cancelHander() {
    this.$emit('on-close');
  }

  showConfirmModal() {
    if (this.isLoading) {
      operationFailMsg('请耐心等待后台响应后再点击');
      return ;
    }
    if (this.localGoodName.length == 0) {
      operationFailMsg('请输入账号');
      return ;
    }
    if (this.localPrice <= 0) {
      operationFailMsg('请输入密码');
      return ;
    }
    this.confirmModal.isShow = true;
  }

  beforeMount() {
    if (this.goodId == -1) {
      this.isCreate = true;
      this.title = '新增商品';
    }
    this.localPrice = this.price;
    this.localGoodName = this.goodName;
    this.localDetail = this.detail;
    this.localReserve = this.reserve;
  }
}
</script>
