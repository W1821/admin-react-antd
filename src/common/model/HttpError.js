/**
 * http请求错误对象
 */
export default class HttpError {

  // 响应状态码
  status;

  // 响应状态描述
  statusText;

  constructor(status, statusText) {
    this.status = status;
    this.statusText = statusText;
  }
}
