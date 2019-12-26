const fields = [
    {
        icon: 'user',
        key: 'userName',
        rules: [{required: true, message: '请输入手机号码!'}],
        type: 'input',
        placeholder: '请输入手机号码',
        initialValue: '15256639988'
    },
    {
        icon: 'lock',
        key: 'password',
        rules: [{required: true, message: '请输入新密码!'}],
        type: 'input',
        inputType: 'password',
        placeholder: '请输入新密码',
        initialValue: '2'
    },
];

export default fields;
