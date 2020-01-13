// @ts-ignore
const _fileReader = new FileReader();

function getFileUrl(file: any): Promise<any> {
  return new Promise((resolve: any) => {
    _fileReader.onloadend = (e: any) => {
      resolve({
        isSuccess: true,
        isFail: false,
        url: e.target.result
      });
    };
    _fileReader.onerror = (e: any) => {
      resolve({
        isSuccess: false,
        isFail: true,
        url: ''
      });
    };
    _fileReader.readAsDataURL(file);
  });
}

export class PreviewImage {
  private _file: any;
  private _previewUrl: string = '';

  get file(): any {
    return this._file;
  }

  set file(value: any) {
    this._file = value;
  }

  get previewUrl(): string {
    return this._previewUrl;
  }

  set previewUrl(value: string) {
    this._previewUrl = value;
  }

  constructor(file: any) {
    this._file = file;
  }

  /**
   * @description 得到图片预览的url
   * @param file
   */
  public async getPreviewUrl(file = this.file) {
    let { isSuccess, url } = await getFileUrl(file);
    if (isSuccess) {
      this._previewUrl = url;
      return {
        isSuccess: true,
        url
      };
    } else {
      return {
        isSuccess: false,
      }
    }

  }
}
