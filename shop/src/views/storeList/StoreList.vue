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
      name="我的商店"
      :no-slot="true"
      @on-search="searchUser"
      @on-add="showAddModal"
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
            @click="editStore(index)"
          >编辑</word-button>
          <word-button
            style="margin-left: .2rem"
            type="delete"
            @click="deleteStore(index)"
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
    <Modal
      v-model="buyModal.isShow"
      title="创建商店"
      @on-ok="addStore"
    >
      <div class="item-container">
        <span class="item-key">名称</span>
        <input class="item-input" v-model="storeName" style="margin-left: .2rem" placeholder="请输入商店名称"></input>
      </div>
    </Modal>
    <Modal
      v-model="showEditStoreLayer"
      title="编辑商店"
      @on-ok="updateStore"
    >
      <div class="item-container">
        <span class="item-key">名称</span>
        <input class="item-input" v-model="buyModal.name" style="margin-left: .2rem" placeholder="请输入商店名称"></input>
      </div>
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
import {storeRequest} from "@/api/StoreRequest";
import {userManage} from "@/store/modules/UserManage";
import {isUndef} from "@/utils/shared";
@Component({
  components: {WordButton, CustomTable, CustomHeader},
  name: 'StoreList'
})
export default class StoreList extends Vue {
  get storeId() {
    return userManage.storeId;
  }

  columns: any[] = [
    {
      title: '序号',
      key: 'index'
    },
    {
      title: '商店名称',
      key: 'name'
    },
    {
      title: '商店销量',
      key: 'count'
    },
    {
      title: '操作',
      slot: 'action'
    }
  ];

  displayData: {
    index: number;
    id: number;
    name: string;
    count: number;
  }[] = [

  ];

  filteredData: {
    index: number;
    id: number;
    name: string;
    count: number;
  }[] = [

  ];

  cachedData: {
    id: number;
    name: string;
    count: number;
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

  showEditStoreLayer: boolean = false;

  page: number = 1;

  pageIsLoading: boolean = false;

  storeName: string = '';

  searchUser(value: string) {
    this.page = 1;
    this.searchValue = value;
    this.changeFilteredData();
  }

  showAddModal() {
    this.buyModal.isShow = true;
    this.storeName = '';
  }

  editStore(index: number) {
    this.buyModal.name = this.displayData[index].name;
    this.showEditStoreLayer = true;
  }

  deleteStore() {
    if (this.storeId == 0) {
      return ;
    }
    storeRequest.deleteStore({
      id: this.storeId
    }).then(res => {
      if (res.isSuccess) {
        operationSuccessMsg('删除门店成功');
        userManage.setStoreId(0);
        setTimeout(() => {
          this.getBlackList();
        }, 10);
      } else {
        operationFailMsg(res.msg);
      }
    });
  }

  updateStore() {
    storeRequest.updateStore({
      id: this.storeId,
      name: this.buyModal.name
    }).then(res => {
      if (res.isSuccess) {
        operationSuccessMsg('更新门店成功');
        this.getBlackList();
      } else {
        operationFailMsg(res.msg);
      }
    });
  }

  addStore() {
    if (this.storeId != 0) {
      operationFailMsg('一个商家只允许拥有一个商店');
      return ;
    }
    storeRequest.addStore({
      name: this.storeName
    }).then(res => {
      if (res.isSuccess) {
        operationSuccessMsg('增加商店成功');
        userManage.setStoreId(res.data);
        this.getBlackList();
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
      this.pageIsLoading = false;
      if (res.isSuccess) {
        this.cachedData = [];
        if (!isUndef(res.data.id)) {
          this.cachedData.push({
            id: res.data.id,
            count: res.data.count,
            name: res.data.name
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
      if (!isUndef(item.name) && item.name.indexOf(this.searchValue) != -1
        || this.searchValue.length == 0) {
        this.filteredData.push({
          index: count++,
          id: item.id,
          name: item.name,
          count: item.count
        });
      }
    }
    this.changeDisplayData();
  }

  mounted() {
    setTimeout(() => {
      this.getBlackList();
    }, 200);
  }
}
</script>
