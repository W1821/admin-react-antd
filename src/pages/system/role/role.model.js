/**
 * 用户
 */
class Role {

    id;
    roleName;
    roleStatus = '0';
    description;
    createTime;
    menuIds = [];
    buttonIds = [];

    constructor(data) {
        this.setDataValue(data);
    }

    setDataValue(data) {
        if (!data) {
            return;
        }
        this.id = data.id;
        this.roleName = data.roleName;
        this.roleStatus = data.roleStatus;
        this.description = data.description;
        this.createTime = data.createTime;
        this.menuIds = data.menuIds;
        this.buttonIds = data.buttonIds;
    }

}
export {
    Role,
};
