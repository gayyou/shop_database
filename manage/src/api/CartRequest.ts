import {Request} from "@/api/config";

class CartRequest extends Request {
  public updateCart(data: {
    goodList: {
      id: number;
      count: number;
      money: number;
    }[]
  }) {
    return this.post('/cart/updateCart', data);
  }

  public addGoodToCart(data: {
    id: number;
    count: number;
    price: number;
  }) {
    return this.post('/cart/addGood', data);
  }

  public removeGoodFromCart(data: {
    id: number;
  }) {
    return this.post('/cart/deleteGood', data);
  }

  public updateGood(data: {
    id: number;
    count: number;
    price: number;
  }) {
    return this.post('/cart/updateGood', data);
  }

  public getCartGoods() {
    return this.get('/cart/getCart')
  }

  public addOrder(data: {
    goodList: {
      goodId: number;
      count: number;
      money: number
    }[]
  }) {
    return this.post('/cart/addOrder', data);
  }
}

export const cartRequest = new CartRequest();
