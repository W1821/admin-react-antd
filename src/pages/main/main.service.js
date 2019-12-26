import SessionStorageService from '../../common/service/SessionStorageService';
import HttpService from '../../common/service/HttpService';
import menuService from '../system/menu/menu.service';

const setMenuData = (response) => {
    if (response) {
        // 菜单数据
        const menuDataList = menuService.getSortedMenuList(response.data);
        const menuDataTree = menuService.getMenuTree(menuDataList);
        SessionStorageService.set(MENU_DATA_LIST, menuDataList);
        SessionStorageService.set(MENU_DATA_TREE, menuDataTree);
    }
};

const REDIRECT_URL = 'redirectUrl';     //F5刷新跳转路由
const MENU_DATA_LIST = 'menuDataList';  // 菜单集合，扁平结构，易于查找
const MENU_DATA_TREE = 'menuDataTree';  // 缓存用户的菜单数据, 树状结构

class MainService {

    getRedirectUrl = () => {
        return SessionStorageService.get(REDIRECT_URL);
    };

    setRedirectUrl = (redirectUrl) => {
        return SessionStorageService.set(REDIRECT_URL, redirectUrl);
    };

    getMenuDataList = () => {
        return SessionStorageService.get(MENU_DATA_LIST);
    };

    getMenuDataTree = () => {
        return SessionStorageService.get(MENU_DATA_TREE);
    };

    /**
     * 处理用户的菜单数据
     */
    init = () => {
        // 这里从后台数据库读取
        return HttpService.get('/menu/main/list').then(setMenuData, error => error);
    };

    /**
     * 修改密码
     * @param data 请求体
     */
    modifyPwd = (data) => {
        return HttpService.post('/user/modify/ownPwd', data).then(res => res, () => null);
    };
}


const mainService = new MainService();

export default mainService;
