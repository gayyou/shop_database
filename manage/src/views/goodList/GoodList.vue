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
}
</style>

<template>
  <div class="package-manage-container">
    <custom-header
      name="商品列表"
      :no-slot="true"
      :no-create="true"
      @on-search="searchUser"
    ></custom-header>
    <custom-table
      :data="displayData"
      :columns="columns"
      style="margin-top: .2rem"
    >
      <template
        slot-scope="{ index }"
        slot="action"
      >
        <div class="operate-container">
          <word-button
            type="primary"
            @click="addToCart(index)"
          >加入购物车</word-button>
          <word-button
            style="margin-left: .2rem"
            @click="buy(index)"
          >直接购买</word-button>
        </div>
      </template>
    </custom-table>
    <Page
      :total="filteredData.length"
      :current="page"
      class="turn-page-container"
      @on-change="changePage"
    />
    <Modal
      v-model="cartModal.isShow"
      title="加入购物车"
      @on-ok="addToCartHandler"
    >
      <p>商品名称：<span style="color: #418c5f;font-weight: bold">{{cartModal.name}}</span></p>
      <div class="item-container">
        <span class="item-key">请输入商品数量</span>
        <InputNumber :max="cartModal.reserve" :min="0" style="margin-left: .2rem"  v-model="cartModal.count"></InputNumber>
      </div>
      <p>商品总价：<span style="color: #418c5f;font-weight: bold">{{cartMoney}}</span></p>
    </Modal>
    <Modal
      v-model="buyModal.isShow"
      title="直接购买"
      @on-ok="buyHandler"
    >
      <p>商品名称：<span style="color: #418c5f;font-weight: bold">{{buyModal.name}}</span></p>
      <div class="item-container">
        <span class="item-key">请输入商品数量</span>
        <InputNumber :max="buyModal.reserve" :min="0" style="margin-left: .2rem" v-model="buyModal.count"></InputNumber>
      </div>
      <p >商品总价：<span style="color: #418c5f;font-weight: bold">{{buyMoney}}</span></p>
    </Modal>
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
import {operationFailMsg, operationSuccessMsg} from '@/utils/shared/message';
import {goodRequest} from "@/api/GoodRequest";
import {cartRequest} from "@/api/CartRequest";
import {orderRequest} from "@/api/OrderRequest";
@Component({
  components: {WordButton, CustomTable, CustomHeader},
  name: 'GoodList'
})
export default class GoodList extends Vue {
  get cartMoney() {
    return (this.cartModal.count * this.cartModal.price).toFixed(2);
  }

  get buyMoney() {
    return (this.buyModal.count * this.buyModal.price).toFixed(2);
  }

  columns: any[] = [
    {
      title: '序号',
      key: 'index'
    },
    {
      title: '商品名称',
      key: 'goodName'
    },
    {
      title: '商品详情',
      key: 'detail'
    },
    {
      title: '商店名称',
      key: 'storeName'
    },
    {
      title: '商品价格',
      key: 'price'
    },
    {
      title: '商品库存',
      key: 'reserve'
    },
    {
      title: '操作',
      slot: 'action'
    }
  ];

  displayData: {
    index: number;
    id: number;
    storeId: number;
    goodName: string;
    storeName: string;
    price: number;
    reserve: number;
    detail: string;
  }[] = [

  ];

  filteredData: {
    index: number;
    id: number;
    storeId: number;
    goodName: string;
    storeName: string;
    price: number;
    reserve: number;
    detail: string;
  }[] = [

  ];

  cachedData: {
    id: number;
    storeId: number;
    goodName: string;
    storeName: string;
    price: number;
    reserve: number;
    detail: string;
  }[] = [];

  cartModal: any = {
    isShow: false,
    id: -1,
    count: 0,
    price: 0,
    name: '',
    reserve: 0
  };

  buyModal: any = {
    isShow: false,
    id: -1,
    count: 0,
    price: 0,
    name: '',
    reserve: 0
  };

  searchValue: string = '';

  page: number = 1;

  pageIsLoading: boolean = false;

  searchUser(value: string) {
    this.page = 1;
    this.searchValue = value;
    this.changeFilteredData();
  }

  buyHandler() {
    if (this.buyModal.count % 1 != 0) {
      operationFailMsg('请输入整数的购物数量');
      return ;
    }
    if (this.buyModal.count <= 0) {
      operationFailMsg('请输入正确的购物数量');
      return ;
    }
    orderRequest.addOrder({
      goodList: [{
        goodId: this.buyModal.id,
        count: this.buyModal.count,
        money: this.buyModal.price * this.buyModal.count
      }]
    }).then(res => {
      if (res.isSuccess) {
        operationSuccessMsg('下单成功');
        this.getBlackList();
      } else {
        operationFailMsg(res.msg);
      }
    });
  }

  buy(index: number) {
    let item = this.displayData[index];
    this.buyModal.isShow = true;
    this.buyModal.count = 0;
    this.buyModal.price = item.price;
    this.buyModal.id = item.id;
    this.buyModal.name = item.goodName;
    this.buyModal.reserve = item.reserve;
  }

  addToCart(index: number) {
    let item = this.displayData[index];
    this.cartModal.isShow = true;
    this.cartModal.count = 0;
    this.cartModal.price = item.price;
    this.cartModal.id = item.id;
    this.cartModal.name = item.goodName;
    this.cartModal.reserve = item.reserve;
  }

  addToCartHandler() {
    if (this.cartModal.count % 1 != 0) {
      operationFailMsg('请输入整数的购物数量');
      return ;
    }
    if (this.cartModal.count <= 0) {
      operationFailMsg('请输入正确的购物数量');
      return ;
    }
    cartRequest.addGoodToCart({
      id: this.cartModal.id,
      count: this.cartModal.count,
      price: this.cartModal.price
    }).then(res => {
      if (res.isSuccess) {
        operationSuccessMsg('加入购物车成功');
        this.cartModal.isShow = false;
      } else {
        operationFailMsg(res.msg);
      }
    });
  }

  getBlackList() {
    this.pageIsLoading = true;
    goodRequest.getGoodList().then(res => {
      if (res.isSuccess) {
        this.pageIsLoading = false;
        this.cachedData = [];
        for (let i = 0; i < res.data.length; i++) {
          let item = res.data[i];
          this.cachedData.push({
            id: item.id,
            storeId: item.storeId,
            reserve: item.reserve,
            price: item.price,
            goodName: item.goodName,
            storeName: item.storeName,
            detail: item.detail
          });
        }
        this.changeFilteredData();
      } else {
        operationFailMsg(res.msg);
      }
    });
  }

  changePage(page: number) {
    this.page = page;
    this.changeDisplayData();
  }

  changeDisplayData() {
    this.displayData = [];
    for (let i = (this.page - 1) * 10; i < this.page * 10 && i < this.filteredData.length; i++) {
      this.displayData.push(this.filteredData[i]);
    }
    if (this.displayData.length == 0 && this.page != 1) {
      this.page--;
      this.changeDisplayData();
    }
  }

  changeFilteredData() {
    this.filteredData = [];
    let count = 1;
    for (let i = 0; i < this.cachedData.length; i++) {
      let item = this.cachedData[i];
      if (item.goodName.indexOf(this.searchValue) != -1
        || item.storeName.indexOf(this.searchValue) != -1
        || this.searchValue.length == 0) {
        this.filteredData.push({
          index: count++,
          id: item.id,
          storeId: item.storeId,
          reserve: item.reserve,
          price: item.price,
          goodName: item.goodName,
          storeName: item.storeName,
          detail: item.detail
        });
      }
    }
    this.changeDisplayData();
  }

  beforeMount() {

  }

  created() {
    this.getBlackList();
  }
}
</script>
