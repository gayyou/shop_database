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
      name="订单列表"
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
          >编辑</word-button>
          <word-button
            style="margin-left: .2rem"
            type="delete"
            @click="buy(index)"
          >删除</word-button>
        </div>
      </template>
    </custom-table>
    <Page
      :total="filteredData.length"
      :current="page"
      class="turn-page-container"
      @on-change="changePage"
    />
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
import {cartRequest} from "@/api/CartRequest";
import {orderRequest} from "@/api/OrderRequest";
@Component({
  components: {WordButton, CustomTable, CustomHeader},
  name: 'OrderList'
})
export default class OrderList extends Vue {
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
      title: '订单号',
      key: 'id'
    },
    {
      title: '下单时间',
      key: 'time'
    },
    {
      title: '商品名称',
      key: 'name'
    },
    {
      title: '商品价格',
      key: 'price'
    },
    {
      title: '总价',
      key: 'allMoney'
    },
    {
      title: '状态',
      key: 'statusMsg'
    }
    // {
    //   title: '操作',
    //   slot: 'action'
    // }
  ];

  displayData: {
    index: number;
    id: number;
    time: string;
    name: string;
    price: number;
    allMoney: number;
    storeId: number;
    tag: number;
    statusMsg: string;
  }[] = [

  ];

  filteredData: {
    index: number;
    id: number;
    time: string;
    name: string;
    price: number;
    allMoney: number;
    storeId: number;
    tag: number;
    statusMsg: string;
  }[] = [

  ];

  cachedData: {
    id: number;
    time: string;
    name: string;
    price: number;
    allMoney: number;
    storeId: number;
    tag: number;
    statusMsg: string;
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
        operationFailMsg('下单成功');
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
  }

  addToCart(index: number) {
    let item = this.displayData[index];
    this.cartModal.isShow = true;
    this.cartModal.count = 0;
    this.cartModal.price = item.price;
    this.cartModal.id = item.id;
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
    orderRequest.getUserOrderList().then(res => {
      this.pageIsLoading = false;
      if (res.isSuccess) {
        this.cachedData = [];
        for (let i = 0; i < res.data.length; i++) {
          let item = res.data[i];
          this.cachedData.push({
            id: item.goodId,
            price: item.price,
            name: item.goodName,
            time: item.time,
            storeId: item.storeId,
            allMoney: item.money,
            tag: item.tag,
            statusMsg: item.tag == 0 ? '未处理' : item.tag == 1 ? '已同意' : '拒绝'
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
      if (item.name.indexOf(this.searchValue) != -1
        || this.searchValue.length == 0) {
        this.filteredData.push({
          index: count++,
          id: item.id,
          storeId: item.storeId,
          price: item.price,
          allMoney: item.allMoney,
          time: item.time,
          name: item.name,
          tag: item.tag,
          statusMsg: item.statusMsg
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
