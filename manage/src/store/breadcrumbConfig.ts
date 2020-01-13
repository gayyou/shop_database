interface BreadcrumbItem {
  name: string;
  list: { name: string; url: string }[];
}

/**
 * @description 面包屑配置，采用全局统一处理+局部特殊化处理
 */
export const breadcrumbConfig: BreadcrumbItem[] = [
  {
    name: '门店管理',
    list: [
      {
        name: '综合管理',
        url: ''
      },
      {
        name: '门店管理',
        url: '/index/integratemanage/shopmanage'
      }
    ]
  },
  {
    name: '自习室管理',
    list: [
      {
        name: '综合管理',
        url: ''
      },
      {
        name: '自习室管理',
        url: '/index/integratemanage/studyroommanage'
      }
    ]
  },
  {
    name: '充值订单',
    list: [
      {
        name: '订单管理',
        url: ''
      },
      {
        name: '充值订单',
        url: '/index/ordermanage/rechargeorder'
      }
    ]
  },
  {
    name: '套餐订单',
    list: [
      {
        name: '订单管理',
        url: ''
      },
      {
        name: '套餐订单',
        url: '/index/ordermanage/packageorder'
      }
    ]
  },
  {
    name: '预约订单',
    list: [
      {
        name: '订单管理',
        url: ''
      },
      {
        name: '预约订单',
        url: '/index/ordermanage/reservationorder'
      }
    ]
  },
  {
    name: '用户信息',
    list: [
      {
        name: '用户管理',
        url: ''
      },
      {
        name: '用户信息',
        url: '/index/usermanage/userinfo'
      }
    ]
  },
  {
    name: '用户黑名单',
    list: [
      {
        name: '用户管理',
        url: ''
      },
      {
        name: '用户黑名单',
        url: '/index/usermanage/blacklist'
      }
    ]
  },
  {
    name: '房间管理',
    list: [
      {
        name: '综合管理',
        url: ''
      },
      {
        name: '门店管理',
        url: '/index/integratemanage/shopmanage'
      },
      {
        name: '房间管理',
        url: '/index/integratemanage/shopmanage/-1'
      }
    ]
  },
  {
    name: '座位管理',
    list: [
      {
        name: '综合管理',
        url: ''
      },
      {
        name: '门店管理',
        url: '/index/integratemanage/shopmanage'
      },
      {
        name: '房间管理',
        url: '/index/integratemanage/shopmanage/-1'
      },
      {
        name: '座位管理',
        url: '/index/integratemanage/shopmanage/-1/-1'
      }
    ]
  }
];

function makeMap(list: any[]) {
  let map: Map<string, any> = new Map<string, any>();
  list.forEach(item => {
    map.set(item.name, item.list);
  });

  return map;
}

export const breadcrumbListMap = makeMap(breadcrumbConfig);
