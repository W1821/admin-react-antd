import HttpError from '../model/HttpError';
import ServerResponse from '../model/ServerResponse';
import NotificationService from './NotificationService';
import HttpUtil from '../util/HttpUtil';
import history from '../config/history';

/**
 * 让上级处理错误
 */
const handleResponse = (promise) => {
    return promise.then(response => {

        // HttpError
        if (response instanceof HttpError) {
            console.log('HttpError', response);
            return Promise.reject(response);
        }
        // ServerResponse
        if (response.success) {
            console.log('ServerResponse', response);
            return Promise.resolve(response);
        }
        // http响应码是200，但是服务端返回逻辑错误
        return Promise.reject(response);
    });
};

/**
 * 获取http请求成功处理
 * @param serverResponse ServerResponse对象
 */
const handleSuccess = (serverResponse) => {
    return serverResponse;
};

const handleError = (error, needNotice = true) => {
    // 如果请求需要通知
    if (error instanceof HttpError) {
        handleHttpError(error, needNotice);
    }
    if (error instanceof ServerResponse) {
        handleServerResponseError(error, needNotice);
    }
    return error;
};


/**
 * http请求失败
 */
const handleHttpError = (httpError, needNotice) => {
    const status = httpError.status;
    if (status === 401) {
        if (needNotice) {
            NotificationService.error('未登录状态，请登录');
        }
        history.push('/login');
        return;
    }
    if (needNotice) {
        NotificationService.error(status + '错误,请联系管理员');
    }
};

/**
 * 处理服务端返回的逻辑错误
 */
const handleServerResponseError = (serverResponse, needNotice) => {
    const status = serverResponse.code;
    if (status === 401) {
        if (needNotice) {
            NotificationService.error('未登录状态，请登录');
        }
        history.push('/login');
        return;
    }
    if (needNotice) {
        NotificationService.error(serverResponse.code + '错误！' + serverResponse.msg);
    }
};

export default class HttpService {

    static get = (url, params, options) => {
        const promise = HttpUtil.get(url, params, options)
            .then(
                response => handleSuccess(response),
                response => handleError(response)
            );
        return handleResponse(promise);
    };

    static getNotHandleError = (url, params, headers) => {
        const promise = HttpUtil.get(url, params, headers)
            .then(
                response => handleSuccess(response),
                response => handleError(response, false)
            );
        return handleResponse(promise);
    };

    static post = (url, body, headers) => {
        const promise = HttpUtil.post(url, body, headers).then(
            response => handleSuccess(response),
            response => handleError(response)
        );
        return handleResponse(promise);
    };

    static postNotHandleError = (url, body, headers) => {
        const promise = HttpUtil.post(url, body, headers).then(
            response => handleSuccess(response),
            response => handleError(response, false)
        );
        return handleResponse(promise);
    };


}
