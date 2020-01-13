import {Request} from "@/api/config";

class OrderRequest extends Request{
  public addOrder(data: {
    goodList: {
      goodId: number;
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
}

export const orderRequest = new OrderRequest();
