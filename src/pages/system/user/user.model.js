/**
 * 用户
 */
class User {

    id;
    phoneNumber;
    userName;
    headPictureUrl;
    headPictureBase64;

    /**
     * 帐号状态，0：可用，1：不可用, 默认可用
     */
    accountStatus = '0';
    createTime;
    roles = [];
    roleIds = [];

    constructor(data) {
        this.setDataValue(data)
    }

    setDataValue(data){
        if (!data) {
            return;
        }
        this.id = data.id;
        this.phoneNumber = data.phoneNumber;
        this.userName = data.userName;
        this.headPictureUrl = data.headPictureUrl;
        this.accountStatus = data.accountStatus;
        this.createTime = data.createTime;
        this.roles = data.roles;
        this.roleIds = data.roles.map(role => role.id);
    }

}

export {User};
