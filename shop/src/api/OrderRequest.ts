import {Request} from "@/api/config";

class OrderRequest extends Request{
  public addOrder(data: {
    goodList: {
      id: number;
      count: number;
      money: number
    }[]
  }) {
    return this.post('/order/addOrder', data);
  }

  public getUserOrderList() {
    return this.post('/order/getUserOrderList', {});
  }

  public getStoreOrderList() {
    return this.post('/order/getStoreOrderList', {});
  }

  public updateGoodStatus(data: {
    id: number;
    tag: number;
  }) {
    return this.post('/order/updateOrderStatus', data);
  }

  public deleteOrder(data: {
    id: number;
  }) {
    return this.post('/order/deleteOrder', data);
  }
}

export const orderRequest = new OrderRequest();
