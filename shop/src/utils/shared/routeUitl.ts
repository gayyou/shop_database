/**
 * @author Weybn
 * @version 1.0.0
 * @description 从url中获取某个路径的名称
 * @param url url路径
 * @param index 第index下标的路径，index是从0开始的
 */
import {indexOfCount} from '@/utils/shared/index';

export function getRouteNameFromUrl(url: string, index: number) {
  let routeNameList: Array<string> = url.split('/');
  return routeNameList[index] ? routeNameList[index] : '';
}

/**
 * @description 根据主页的路由特点得到这个路由的基础路径
 * @param path
 */
export function getIndexBaseRoute(path: string, count: number) {
  let endCount = indexOfCount(path, '/', count);
  endCount = endCount <= 0 ? path.length : endCount;
  return path.substring(0, endCount);
}

export function changeTitle(title: string) {
  document.title = title;
}
