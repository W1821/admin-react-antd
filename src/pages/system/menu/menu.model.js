/**
 * 菜单
 */
class Menu {
    id;
    pid;
    pids;
    routePath;
    menuName;
    showName;
    icon;
    rank;
    actions;
    buttons = [];

    children = [];

    constructor(data) {
        this.setDataValue(data);
    }

    setDataValue(data) {
        if (!data) {
            return;
        }
        this.id = data.id;
        this.pid = data.pid;
        this.pids = data.pids;
        this.routePath = data.routePath;
        this.menuName = data.menuName;
        this.showName = data.showName;
        this.icon = data.icon;
        this.rank = data.rank;
        this.actions = data.actions;
        this.buttons = data.buttons.map(e => new Button(e));
    }

}

class Button {

    id;
    buttonName;
    code;
    actions;
    routePath;

    constructor(data) {
        this.setDataValue(data);
    }

    setDataValue(data) {
        if (!data) {
            return;
        }
        this.id = data.id;
        this.buttonName = data.buttonName;
        this.code = data.code;
        this.actions = data.actions;
        this.routePath = data.routePath;
    }
}

export {
    Menu,
    Button,
};
