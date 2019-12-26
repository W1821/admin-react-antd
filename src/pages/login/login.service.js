import SessionStorageService from '../../common/service/SessionStorageService';
import HttpService from '../../common/service/HttpService';
import {User} from '../system/user/user.model';

/**
 * 清理缓存
 */
const clearLoginInfo = () => {
    SessionStorageService.clear();
};

/**
 * 登录成功处理逻辑
 */
const loginSuccess = (response) => {
    const userInfo = new User(response.data);
    SessionStorageService.set(USER, userInfo);
    return response;
};

/**
 * 登录失败处理逻辑
 */
const loginError = (error) => {
    return error;
};

const USER = 'user';

class LoginService {

    getUserInfo = () => {
        return SessionStorageService.get(USER);
    };

    /**
     * 发送登录请求
     */
    login = (userName, password) => {
        const authorization = 'Basic ' + btoa(userName + ':' + password);
        const options = {Authorization: authorization};
        return HttpService.getNotHandleError('system/login', null, options).then(loginSuccess, loginError);
    };

    /**
     * 退出
     */
    logout = () => {
        // 这里可能是服务端退出登录有重定向功能
        return HttpService.getNotHandleError('system/logout').then(this.clearLoginInfo, this.clearLoginInfo);
    };

    clearLoginInfo = () => {
        clearLoginInfo();
    };
}

const loginService = new LoginService();

export default loginService;
