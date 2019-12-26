/**
 * http响应对象
 */
export default class ServerResponse {

    success;
    code;
    msg;
    data;

    constructor(response) {
        // 判断返回结果类型
        switch (typeof response) {
            case 'object':
                this.success = response.errorCode === 0;
                this.code = response.errorCode;
                this.msg = response.errorMsg || '未知错误';
                this.data = response.data || null;
                break;
            case 'string':
                this.success = true;
                this.code = 0;
                this.data = response;
                break;
            default:
                break;
        }
    }

}
