/**
 * @description 处理请求返回值的数据，这里是请求成功的时候的返回值
 * @param res
 */
function getSuccessResData(res: any): {
  isSuccess: boolean;
  msg: string;
  data: any;
}  {
  return {
    isSuccess: true,
    data: res.data ? res.data : {},
    msg: res.msg ? res.msg : ''
  }
}

function getFailResData(res: any): {
  isSuccess: boolean;
  msg: string;
  data: any;
} {
  return {
    isSuccess: false,
    data: res.data ? res.data : {},
    msg: res.msg ? res.msg : ''
  }
}

export function getResultResData(res: {
  status: number;
  msg: string;
  data?: any;
}): {
  isSuccess: boolean;
  msg: string;
  data: any;
} {
  if (res.status == 0) {
    return getSuccessResData(res);
  }

  return getFailResData(res);
}
