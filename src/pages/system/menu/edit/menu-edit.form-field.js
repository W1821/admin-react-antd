const fields = [
    {
        icon: 'form',
        key: 'pid',
        type: 'select',
        options: [],
        label: '上级菜单',
        placeholder: '请选择上级菜单',
    },
    {
        icon: 'form',
        key: 'menuName',
        type: 'input',
        label: '菜单名称',
        placeholder: '请输入菜单名称',
        rules: [{required: true, message: '请输入菜单名称'}],
    },
    {
        icon: 'form',
        key: 'routePath',
        type: 'input',
        label: '菜单路由',
        placeholder: '请输入菜单路由',
    },
    {
        icon: '',
        key: 'icon',
        type: 'search',
        label: '菜单图标',
        placeholder: '请输入菜单图标',
    },
    {
        icon: 'form',
        key: 'rank',
        type: 'input',
        label: '排序值',
        placeholder: '请输入菜单排序值，升序显示',
    },
    {
        icon: 'form',
        key: 'actions',
        type: 'input',
        label: '注册请求',
        placeholder: '请输入注册请求，逗号分割：/menu/list,/menu/save,/menu/query/{id},/menu/delete',
    },
];

export default fields;
