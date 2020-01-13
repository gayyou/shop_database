import {Request} from "@/api/config";

class UserRequest extends Request{
  public login(data: {
    account: string;
    pwd: string;
  }) {
    return this.post('/user/login', data);
  }

  public register(data: {
    account: string;
    pwd: string;
    name: string;
  }) {
    return this.post('/user/register', data);
  }

  public getInfo(data: {
    userId: number;
  }) {
    return this.post('/user/getInfo', data);
  }

  public updateMoney(data: {
    money: number;
  }) {
    return this.post('/user/addMoney', data);
  }
}

export const userRequest = new UserRequest();
