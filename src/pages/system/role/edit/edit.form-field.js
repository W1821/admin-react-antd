const fields = [
    {
        icon: 'user',
        key: 'roleName',
        type: 'input',
        label: '角色名',
        placeholder: '请输入角色名',
        rules: [{required: true, message: '请输入角色名'}],
    },
    {
        icon: 'phone',
        key: 'description',
        type: 'input',
        label: '描述',
        placeholder: '请输入描述',
    },
    {
        key: 'roleStatus',
        type: 'radio',
        options: [
            {label: '启用', value: '0'},
            {label: '禁用', value: '1'}
        ],
        label: '状态',
        rules: [{required: true, message: '状态'}],
    },
];

export default fields;
