import {isUndef} from '@/utils/shared/index';

export const is360 = () => {
  return !isUndef(window.navigator.mimeTypes[40]) || !window.navigator.mimeTypes.length;
};

export const isEdge = () => {

};
