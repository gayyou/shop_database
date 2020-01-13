import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {isNumber} from '@/utils/shared';
import {ModuleItem, routeConfig} from '@/store/routeConfig';
import store from "@/store/store";

interface ModuleInfo {
  // 模块名称
  name: string;
  // 模块图标位置
  iconUrl: string;
  // 模块id
  id: number;
  // 模块路径
  url: string;
}

/**
 * @description store模块化的用法，其中到出去的模块可以直接用
 */
@Module({
  dynamic: true,
  store,
  name: 'IndexManage',
})
class IndexManageModule extends VuexModule {
  public headImage: string = require('@assets/images/icons/logo.png');

  public moduleList: Array<ModuleItem> = routeConfig;

  public currentModuleID: number = -1;

  @Mutation
  public setCurrentModuleID(id: number) {
    this.currentModuleID = id;
  }

  @Mutation
  public resetModuleList() {
    this.moduleList = routeConfig.concat();
  }

  @Mutation
  public removeModule(name: string) {
    let index = -1;
    for (let i = 0; i < this.moduleList.length; i++) {
      if (this.moduleList[i].name == name) {
        index = i;
        break;
      }
    }
    this.moduleList.splice(index, 1);
  }

  /**
   * @description 得到当前页面的基础路径匹配到左侧选择栏的哪一个配置（有可能是一级配置，也有可能是二级配置）
   * 思路是首先先看看在一级配置找不找得到相应url的内容，找不到则去子目录找一下是否匹配，将匹配的选项id放到currentModuleID中
   * @param path 得到处理后的url，根据需求是3次斜杠获取内容
   */
  @Action
  public setCurrentModuleIDByPath(path: string) {
    for (let i = 0; i < this.moduleList.length; i++) {
      if (path == this.moduleList[i].url) {
        // @ts-ignore
        this.setCurrentModuleID(this.moduleList[i].id);
        // @ts-ignore
      } else if (this.moduleList[i].children && this.moduleList[i].children.length > 0) {
        // @ts-ignore
        let childrenList: any[] = this.moduleList[i].children;
        for (let j = 0; j < childrenList.length; j++) {
          if (path == childrenList[j].url) {
            this.setCurrentModuleID(childrenList[j].id);
          }
        }
      }
    }
  }
}

export const indexManageStore = getModule(IndexManageModule);
