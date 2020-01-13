import {Request} from "@/api/config";
import {getReqDataSequence} from "@/utils/shared";

class GoodRequest extends Request{
  public updateGood(data: {
    name: string;
    price: number;
    reserve: number;
    id: number;
  }) {
    return this.post('/good/updateGood', data);
  }

  public getGoodList() {
    return this.get('/good/getGoodList');
  }

  public getGoodListByStoreId(data: {
    storeId: number
  }) {
    return this.get('/good/getGoodListByStoreId?' + getReqDataSequence(data));
  }

  public addGood(data: {
    name: string;
    price: number;
    reserve: number;
    storeId: number;
  }) {
    return this.post('/good/addGood', data);
  }

  public deleteGood(data: {
    goodId: number
  }) {
    return this.post('/good/deleteGood', data);
  }
}

export const goodRequest = new GoodRequest();
