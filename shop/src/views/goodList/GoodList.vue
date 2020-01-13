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
      :name="'我的商店' + title"
      :no-slot="true"
      @on-search="searchUser"
      @on-add="addStore"
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
    <edit-good
      v-if="editModal.isShow"
      :store-id="storeId"
      :detail="editModal.goodDetail"
      :good-name="editModal.goodName"
      :good-id="editModal.goodId"
      :price="editModal.price"
      :reserve="editModal.reserve"
      @on-renew="getBlackList"
      @on-close="editModal.isShow = false"
    ></edit-good>
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
import {storeRequest} from "@/api/StoreRequest";
import {userManage} from "@/store/modules/UserManage";
import EditGood from "@/views/goodList/editGood/EditGood.vue";
@Component({
  components: {EditGood, WordButton, CustomTable, CustomHeader},
  name: 'GoodList'
})
export default class GoodList extends Vue {
  get storeId() {
    return userManage.storeId;
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

  editModal = {
    isShow: false,
    goodId: -1,
    goodName: '',
    goodDetail: '',
    price: 0,
    reserve: 0
  };

  searchValue: string = '';

  page: number = 1;

  title: string = '';

  pageIsLoading: boolean = false;

  searchUser(value: string) {
    this.page = 1;
    this.searchValue = value;
    this.changeFilteredData();
  }

  addStore() {
    if (this.storeId == 0) {
      operationFailMsg('请先创建商店');
      return ;
    }
    this.editModal = {
      isShow: true,
      price: 0,
      goodName: '',
      reserve: 0,
      goodDetail: '',
      goodId: -1
    }
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
        id: this.buyModal.id,
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
    goodRequest.deleteGood({
      id: this.displayData[index].id
    }).then(res => {
      if (res.isSuccess) {
        operationSuccessMsg('删除商品成功');
        this.getBlackList();
      } else {
        operationFailMsg(res.msg);
      }
    })
  }

  addToCart(index: number) {
    let item = this.displayData[index];
    this.editModal = {
      isShow: true,
      price: item.price,
      goodName: item.goodName,
      reserve: item.reserve,
      goodDetail: item.detail,
      goodId: item.id
    }
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
    storeRequest.getStoreById({
      id: this.storeId
    }).then(res => {
      if (res.isSuccess) {
        this.title = '-' + (res.data.name || '暂无商店');
      } else {
        operationFailMsg(res.msg);
      }
    });
    goodRequest.getGoodListByStoreId({
      storeId: this.storeId
    }).then(res => {
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

  mounted() {
    setTimeout(() => {
      this.getBlackList();
    }, 100);

  }

  created() {

  }
}
</script>
