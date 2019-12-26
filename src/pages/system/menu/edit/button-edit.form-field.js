const fields = [
    {
        icon: 'form',
        key: 'buttonName',
        type: 'input',
        label: '按钮名称',
        placeholder: '请输入按钮名称',
        rules: [{required: true, message: '请输入按钮名称'}],
    },
    {
        icon: 'form',
        key: 'code',
        type: 'input',
        label: '按钮标识',
        placeholder: '请输入按钮标识',
        rules: [{required: true, message: '请输入按钮标识'}],
    },
    {
        icon: 'form',
        key: 'actions',
        type: 'input',
        label: '注册请求',
        placeholder: '请输入注册请求，逗号分割：/menu/list,/menu/save',
    },

];

export default fields;
