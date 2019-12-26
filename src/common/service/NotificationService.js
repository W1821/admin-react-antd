import {notification} from 'antd';

/**
 * 全局配置方法，在调用前提前配置，全局一次生效
 */
notification.config({
    duration: 2,
});

const openNotification = (type, message, description) => {
    notification[type]({
        message: message,
        description: description,
    });
};

class NotificationService {

    static success = (description = '') => {
        openNotification('success', '成功通知', description);
    };

    static info = (description = '') => {
        openNotification('info', '信息通知', description);
    };

    static warning = (description = '') => {
        openNotification('warning', '警告通知', description);
    };

    static error = (description = '', code = '错误通知') => {
        openNotification('error', code, description);
    };

}

export default NotificationService;
