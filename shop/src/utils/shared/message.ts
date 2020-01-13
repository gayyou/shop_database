import { Notice } from 'view-design';

export const message: any = {};

message.setNotice = (info: { title?: string, desc?: string }) => {
  (<any>Notice).open(info);
};

export const operationFailMsg = (des: string) => {
  if (des.length == 0) {
    return ;
  }
  message.setNotice({
    title: '操作失败',
    desc: des
  });
};

export const operationSuccessMsg = (des: string) => {
  if (des.length == 0) {
    return ;
  }
  message.setNotice({
    title: '操作成功',
    desc: des
  });
};
