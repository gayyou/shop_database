import axios from 'axios';
import router from '@/router/router';
import {message, operationFailMsg} from '@/utils/shared/message';
import {userManage} from "@/store/modules/UserManage";
import {getToken} from "@/utils/shared/localStorage";
import {isUndef} from "@/utils/shared";
import {getResultResData} from "@/utils/shared/formate";

let baseUrl: string;

if (process.env.NODE_ENV === 'production') {
  // 生产环境下使用真实路径
  baseUrl = 'http://localhost:8080'
} else {
  // 非生产环境下，都使用代理服务器
  baseUrl = '/api';
}

// @ts-ignore
const _Request = axios.create({
  baseURL: baseUrl,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * 统一对请求进行处理
 */
_Request.interceptors.request.use((config: any): any => {
  // 当存在token的时候，将token加到请求头上面
  let token = getToken();

  // @ts-ignore
  if (!isUndef(token) && token.length != 0) {
    config.headers.token = token;
  }

  return config;
}, error => {});

/**
 * 统一对返回的数据进行过滤
 */
_Request.interceptors.response.use((result: any): any => {
  // 当没有前面的问题的时候，返回请求对象的数据
  return getResultResData(result.data);
}, (error: any) => {
  if (isUndef(error.response)) {
    return {
      status: -2,
      data: {},
      message: '请求发不出去，请检查您的网络。如果您的网络正常，请联系服务器管理人员'
    }
  }

  let status = error.response.status;

  switch (status) {
    case 404: {
      return {
        status: -2,
        data: error,
        message: '服务器请求地址出错，请联系服务器管理人员'
      };
    }

    case 500: {
      return {
        status: -2,
        data: error,
        message: '服务器出现异常，请联系服务器管理人员'
      };
    }

    default: {
      return {
        status: -2,
        data: error,
        message: '请求发生错误，请重新刷新页面'
      };
    }
  }
});

interface ReturnData {
  isSuccess: boolean;
  msg: string;
  data?: any;
}

export class Request {
  public get(url: string): Promise<ReturnData> {
    return _Request.get(url);
  }

  public post(url: string, data: any): Promise<ReturnData> {
    return _Request.post(url, data);
  }

  public upload(url: string, data: any): Promise<ReturnData> {
    return _Request.post(url, data, {
      headers:{'Content-Type':'multipart/form-data'}
    });
  }

  public put(url: string, data: any): Promise<ReturnData> {
    return _Request.put(url, data);
  }

  public delete(url: string, data: any): Promise<ReturnData> {
    return _Request.delete(url);
  }
}
