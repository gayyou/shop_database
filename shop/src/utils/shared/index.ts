// @ts-ignore
const _toString = Object.prototype.toString;

/**
 * @description 判断目标是否是未定义
 */
export function isUndef(v: any): boolean {
  return v === undefined || v === null;
}

/**
 * @description 判断是否是对象
 * @author Weybn
 * @version 1.0.0
 */
export function isObject(obj: any): boolean {
  return obj != null && typeof obj === 'object';
}

/**
 * @description 判断是否是纯对象，纯对象的概念就是用 new Object() 或者 {} 赋值的变量
 * @author Weybn
 * @version 1.0.0
 */
export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]';
}

/**
 * @description 从数组里面去除某个项
 * @author Weybn
 * @version 1.0.0
 */
export function removeItemFromArray(array: any[], item: any): any[] | void {
  if (array.length) {
    const index = array.indexOf(item);
    if (index > -1) {
      return array.splice(index, 1);
    }
  }

  return ;
}

/**
 * @description 创建一个具有闭包缓存的函数并返回，
 * @param fn 这个函数的需要有一个返回值，并且这个返回值可能会多次用到
 * @return fn 这个是增加缓存散列表后的函数，执行函数的时候会先看有没有缓存，如果有的话则进行读取缓存，无需执行函数
 */
export function cached(fn: any) {
  const cacheMap = Object.create(null);
  return ((parameter: any) => {
    return cacheMap[parameter] || (cacheMap[parameter] = fn(parameter));
  });
}

export function isPrimitive(value: any) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  );
}

export function isString(str: any) {
  return (typeof str === 'string') && str.constructor === String;
}

export function isNumber(tar: any) {
  return !isNaN(tar) && typeof tar === 'number';
}

/**
 * @description 判断这个字符串是否是一个完全由数字构成的字符串
 * @param tar
 */
export function isNumberTypeString(tar: string) {
  for (let i = 0; i < tar.length; i++) {
    if (tar[i] < '0' || tar[i] > '9') {
      return false;
    }
  }
  return true;
}

export function isBoolean(tar: any) {
  return typeof tar === 'boolean';
}

export function isArray(tar: any) {
  return Object.prototype.toString.call(tar) === '[object Array]';
}

/**
 * @description 找出字符串中第n个子下标,如果不存在，就返回 - 1
 * @param str 父字符串
 * @param tar 子串
 * @param count 下标是从0开始，想要第几个字符串
 */
export function indexOfCount(str: string, tar: string, count: number) {
  let index = str.indexOf(tar);

  if (index == -1) {
    return -1;
  }

  for (let i = 0; i < count; i++) {
    index = str.indexOf(tar, index + 1);
  }

  return index;
}

/**
 * @description 查找item是否在array数组中
 * @author Weybn
 * @param array
 * @param item
 */
export function isInArray(array: any[], item: any) {
  return array.indexOf(item) != -1;
}

/**
 * @description 得到A数组中的项的集合，这些项是不在B中存在的。并且传入的第三个参数是一个判断函数，实现方法的个性化
 * @param array1
 * @param array2
 * @param conditionFn
 */
export function getDifferentArray(array1: any[], array2: any[], conditionFn: Function) {
  let resultArray: any[] = [];
  let isFound = false;

  for (let i = 0; i < array1.length; i++) {
    isFound = false;
    for (let j = 0; j < array2.length; j++) {
      if (conditionFn(array1[i], array2[j])) {
        isFound = true;
        break;
      }
    }

    if (!isFound) {
      resultArray.push(array1[i]);
    }
  }

  return resultArray;
}

/**
 * @author Weybn
 * @description 将get请求参数序列化
 * @param obj
 */
export function getReqDataSequence(obj: any) {
  if (!isPlainObject(obj)) {
    return '';
  }

  let keys = Object.keys(obj);
  let result = '';

  for (let i = 0; i < keys.length; i++) {
    result += keys[i] + '=' + obj[keys[i]] + '&';
  }

  return result.substring(0, result.length - 1);
}

/**
 * @author Weybn
 * @description 通过conditionFn来获取想要的数组的第一个项
 * @param array 数组
 * @param conditionFn 条件判断函数，第一个参数是数组元素
 */
export function getItemFromArrayByCondition(array: any[], conditionFn: Function) {
  for (let i = 0; i < array.length; i++) {
    if (conditionFn(array[i])) {
      return array[i];
    }
  }

  return null;
}

/**
 * @description 从数组中
 * @param array
 * @param conditionFn
 */
export function removeItemFromArrayByCondition(array: any[], conditionFn: Function) {
  for (let i = 0; i < array.length; i++) {
    if (conditionFn(array[i])) {
      array.splice(i, 1);
    }
  }
}

/**
 * @author Weybn
 * @description 交换数组内部下标元素
 * @param array
 * @param i
 * @param j
 */
export function swapItemInArray(array: any[], i: number, j: number) {
  if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
    return false;
  }

  [array[i], array[j]] = [array[j], array[i]];

  return true;
}

/**
 * @author Weybn
 * @description 判断一个对象是否是一个纯对象并且这个对象是一个空的对象
 * @param tar
 */
export function isPlainEmptyObject(tar: any) {
  return isPlainObject(tar) && Object.keys(tar).length == 0;
}

/**
 * @description 检查文件类型是否是图片
 * @param file
 */
export const isImageType = (file: File): boolean => {
  return file.type.indexOf('image') != -1;
};

/**
 * @description
 */
export const isZip = (file: File): boolean => {
  return file.type.indexOf('zip') != -1;
};

/**
 * @description 限制表单填写的长度
 * @param str
 * @param count
 */
export const limitString = (str: string, count: number) => {
  return str.length <= count ? str : str.slice(0, count);
};
