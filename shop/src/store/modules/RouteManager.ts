import {Action, getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '../store';
import {routeConfig, routeMap} from '@/store/routeConfig';

interface BreadcrumbItem {
  // name是这个面包屑的项的名称
  name: string;
  // url是这个项的url路径
  url: string;
}

/**
 * @description store模块化的用法，其中到出去的模块可以直接用
 */
@Module({
  dynamic: true,
  store,
  name: 'RouteManager',
})
class RouteManager extends VuexModule {
  public breadcrumbList: BreadcrumbItem[] = [];

  @Mutation
  public addBreadItem(item: BreadcrumbItem) {
    this.breadcrumbList.push(item);
  }

  /**
   * @Author: 郑浩瀚
   * @param {type}
   * @return:
   * @description: 替换掉面包屑的最后一个元素
   */
  @Mutation
  public resetLastBreadcrumb(item: BreadcrumbItem) {
    this.breadcrumbList.pop();
    this.breadcrumbList.push(item);
  }

  @Mutation
  public cleanBreadcrumbList() {
    this.breadcrumbList = [];
  }

  @Mutation
  private setBreadList(index: number) {
    this.breadcrumbList = this.breadcrumbList.slice(0, index + 1);
  }


  @Mutation
  private concatBreadList(itemList: BreadcrumbItem[]) {
    this.breadcrumbList = [...this.breadcrumbList, ...itemList];
  }

  @Mutation
  public replaceIndexBreadcrumb(options: { index: number; newValue: { name: string; url: string; }}) {
    const { index, newValue } = options;
    this.breadcrumbList[index] = newValue;
    this.breadcrumbList.push({
      name: '',
      url: '',
    });
    this.breadcrumbList.pop();
  }

  @Action
  public async resetBreadcrumbList(path: string) {
    const len = this.breadcrumbList.length;

    for (let i = 0; i < len; i++) {
      if (path === this.breadcrumbList[i].url) {
        this.context.commit('setBreadList', i);
        return ;
      }
    }

    this.context.commit('setBasePath', path);
  }

  @Mutation
  public setBasePath(path: string) {
    const routeItem = routeMap.get(path);
    this.breadcrumbList = [];
    this.breadcrumbList.push({
      url: routeItem.url,
      name: routeItem.name,
    });
  }
}

export const routeManager = getModule(RouteManager);
