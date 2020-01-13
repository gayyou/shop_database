import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store/store";
import {getToken, setToken} from "@/utils/shared/localStorage";

@Module({
  dynamic: true,
  store,
  name: 'UserManage',
})
class UserManage extends VuexModule {
  public isSuperManager: boolean = false;

  public userName: string = '管理员';

  public money: number = 0;

  public userId: number = 0;

  public storeId: number = 0;

  public account: string = '';

  public token: string = getToken() || '';

  @Mutation
  public setSuperManager(role: boolean) {
    this.isSuperManager = role;
  }

  @Mutation
  public setUserName(newName: string) {
    this.userName = newName;
  }

  @Mutation
  public setMoney(money: number) {
    this.money = money;
  }

  @Mutation
  public setUserId(userId: number) {
    this.userId = userId;
  }

  @Mutation
  public setStoreId(storeId: number) {
    this.storeId = storeId;
  }

  @Mutation
  public setAccount(account: string) {
    this.account = account;
  }

  @Mutation
  public setToken(token: string) {
    this.token = token;
  }
}

export const userManage = getModule(UserManage);
