const fields = [
    {
        icon: 'user',
        key: 'userName',
        type: 'input',
        label: '姓名',
        placeholder: '请输入姓名',
        rules: [{required: true, message: '请输入姓名'}],
    },
    {
        icon: 'phone',
        key: 'phoneNumber',
        type: 'input',
        label: '手机号码',
        placeholder: '请输入手机号码',
        rules: [{required: true, message: '请输入手机号码'}],
    },
    {
        icon: 'lock',
        key: 'password',
        type: 'input',
        inputType: 'password',
        label: '密码',
        placeholder: '请输入密码,增加用户不填使用系统默认密码，修改用户不填保留原密码',
    },
    {
        key: 'accountStatus',
        type: 'radio',
        options: [
            {label: '可用', value: '0'},
            {label: '禁用', value: '1'}
        ],
        initialValue: '0',
        label: '帐号状态',
        placeholder: '帐号状态',
        rules: [{required: true, message: '帐号状态!'}],
    },
];

export default fields;
