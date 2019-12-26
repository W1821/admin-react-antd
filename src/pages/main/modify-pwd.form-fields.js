const fields = [
    {
        icon: 'eye',
        key: 'oldPwd',
        type: 'input',
        inputType: 'password',
        label: '旧密码',
        placeholder: '请输入旧密码',
        rules: [{required: true, message: '请输入旧密码!'}],
    },
    {
        icon: 'eye',
        key: 'newPwd',
        type: 'input',
        inputType: 'password',
        label: '新密码',
        placeholder: '请输入新密码',
        rules: [{required: true, message: '请输入新密码!'}],
    },
    {
        icon: 'eye',
        key: 'verifiedPwd',
        type: 'input',
        inputType: 'password',
        label: '确认密码',
        placeholder: '确认密码',
        rules: [{required: true, message: '确认密码!'}],
    },
];

export default fields;
