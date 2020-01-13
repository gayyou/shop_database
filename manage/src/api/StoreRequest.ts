import {Request} from "@/api/config";

class StoreRequest extends Request {
  public getStoreList() {
    return this.post('/store/getList', {});
  }

  public getStoreById(data: {
    id: number;
  }) {
    return this.post('/store/getStoreById', data);
  }

  public addStore(data: {
    name: string;
  }) {
    return this.post('/store/addStore', data);
  }
}

export const storeRequest = new StoreRequest();
