import mainService from './main.service';

class ButtonAuthService {

    static getButtonAuth = (authButtons, pathname) => {
        if (!authButtons) {
            return {};
        }
        const menu = mainService.getMenuDataList().find(m => m.routePath === pathname);
        if (!menu) {
            return authButtons;
        }
        const pageButtons = menu.buttons.map(b => b.code);
        if (pageButtons) {
            Object.keys(authButtons).forEach(ab => authButtons[ab] = !!pageButtons.find(pb => pb === ab));
        }
        console.log('ButtonAuthService-> 当前页面的按钮', authButtons);
        return authButtons;
    };

}

export default ButtonAuthService;
