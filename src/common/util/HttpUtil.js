import HttpError from '../model/HttpError';
import ServerResponse from '../model/ServerResponse';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '没有权限访问',
    403: '访问被禁止',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

const getUrlParams = (url, params) => {
    if (params) {
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&');
        } else {
            url += '&' + paramsArray.join('&');
        }
    }
    return url;
};

const getOptions = (options) => {
    const defaultOptions = {
        /* 表示是否发送Cookie, 这个需要服务端CORS配置 configuration.setAllowCredentials(true); */
        credentials: 'include',
    };
    const newOptions = {...defaultOptions, ...options};
    if (newOptions.method === 'POST') {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers,
            };
            newOptions.body = JSON.stringify(newOptions.body);
        }
    } else {
        newOptions.headers = {
            Accept: 'application/json',
            ...newOptions.headers,
        };
    }
    return newOptions;
};

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response.text();
    }
    const errorText = codeMessage[response.status] || response.statusText;
    throw new HttpError(response.status, errorText);
};

/**
 * http请求响应码200，需要处理服务逻辑错误
 */
const handleResponse = (response, resolve, reject) => {
    if (response.success) {
        // 服务端的逻辑正确
        resolve(response);
    } else {
        // 服务端的逻辑错误
        reject(response);
    }
};

const request = (url, options, resolve, reject) => {
    options = getOptions(options);
    fetch(url, options)
        .then(checkStatus)
        .then((response) => {
            try {
                return JSON.parse(response);
            } catch (e) {
                return response;
            }
        })
        .then(response => new ServerResponse(response)) // 把http服务端响应数据封装为 @see ServerResponse 对象
        .then(response => handleResponse(response, resolve, reject)) // 需要处理服务逻辑错误

        // 把HttpResponseError处理成为 HttpError对象
        .catch(error => {
            console.log('HttpUtil->request->catch->error', error);
            const status = error.status ? error.status : '500';
            let statusText = error.statusText ? error.statusText : '系统错误，请稍后再试！';
            reject(new HttpError(status, statusText));
        });

};

class HttpUtil {

    static get = (url, params, headers) => {
        url = getUrlParams(url, params);
        let options = {
            method: 'GET',
            headers: headers,
        };
        return new Promise((resolve, reject) => request(url, options, resolve, reject));
    };

    static post = (url, params, headers) => {
        let options = {
            method: 'POST',
            headers: headers,
            body: params,
        };
        return new Promise((resolve, reject) => request(url, options, resolve, reject));
    };

}

export default HttpUtil;

