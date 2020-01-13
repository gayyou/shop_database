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

  public token: string = getToken() || '';

  public userId: number = 0;

  public money: number = 0;

  @Mutation
  public setSuperManager(role: boolean) {
    this.isSuperManager = role;
  }

  @Mutation
  public setUserName(newName: string) {
    this.userName = newName;
  }

  @Mutation
  public setInfo(data: {
    name: string;
    money: number;
    userId: number
  }) {
    this.userId = data.userId;
    this.money = data.money;
    this.userName = data.name;
  }

  @Mutation
  public setToken(token: string) {
    this.token = token;
  }
}

export const userManage = getModule(UserManage);
