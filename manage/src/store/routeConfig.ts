// 模块项的定义
export interface ModuleItem {
  // 模块的id，这个是区别不同的模块，方便选择列表样式的修改
  id?: number;
  // 模块的基础url,也就是这个模块的基础路径
  url: string;
  // 模块名称，左侧选择栏使用的
  disable?: boolean;
  isAuthority?: boolean;
  name: string;
  // 图标的url
  iconUrl?: string;
  activeIconUrl?: string;
  children?: ModuleItem[];
  isUser?: boolean;
  isKeeper?: boolean;
}

let uid = 1;
/**
 * @description 为底层模块加上id，方便到时候进行修改左边侧边栏的样式
 */
const makeRouteConfigMap = (routeConfig: ModuleItem[]) => {
  let map = new Map();
  for (let i = 0; i < routeConfig.length; i++) {
    routeConfig[i].id = uid;
    uid++;
    map.set(routeConfig[i].url, routeConfig[i]);
    // @ts-ignore
    if (routeConfig[i].children && routeConfig[i].children.length) {
      let baseUrl = routeConfig[i].url;
      // @ts-ignore
      let childrenList: ModuleItem[] = routeConfig[i].children;

      childrenList.forEach(item => {
        item.url = baseUrl+ '/' + item.url;
        map.set(item.url, item);
        item.id = uid;
        uid++;
      })
    }
    // 处理完子项后再将父的url设置为空
    if (routeConfig[i].disable) {
      routeConfig[i].url = '';
    }
  }

  return map;
};

const routeConfig: ModuleItem[] = [
  {
    name: '商品列表',
    url: '/index/good',
    isUser: true,
    isKeeper: true,
    iconUrl: require('@assets/images/icons/pre_order.png'),
    activeIconUrl: require('@assets/images/icons/pre_order.png'),
  },
  {
    name: '我的订单',
    url: '/index/orderlist',
    isUser: true,
    isKeeper: true,
    iconUrl: require('@assets/images/icons/package_manage.png'),
    activeIconUrl: require('@assets/images/icons/package_manage.png')
  },
  {
    name: '购物车列表',
    url: '/index/cartList',
    isUser: true,
    iconUrl: require('@assets/images/icons/order_manage.png'),
    activeIconUrl: require('@assets/images/icons/order_manage.png')
  },
  // {
  //   name: '商店列表',
  //   url: '/index/storeList',
  //   isUser: true,
  //   isKeeper: true,
  //   iconUrl: require('@assets/images/icons/manager.png'),
  //   activeIconUrl: require('@assets/images/icons/manager.png')
  // },
  {
    name: '充值中心',
    url: '/index/info',
    isUser: true,
    isKeeper: true,
    iconUrl: require('@assets/images/icons/refund_manage.png'),
    activeIconUrl: require('@assets/images/icons/refund_manage.png')
  }
];

export const routeMap = makeRouteConfigMap(routeConfig);

export { routeConfig };
