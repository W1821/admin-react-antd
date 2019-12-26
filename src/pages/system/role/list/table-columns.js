import React from "react";
import {Tag} from "antd";

const columns = [
    {
        dataIndex: 'roleName',
        title: '角色名',
    },
    {
        dataIndex: 'description',
        title: '描述',
    },
    {
        dataIndex: 'roleStatus',
        title: '状态',
        render: (text, record, index)  => {
            if (text === '0') {
                return <Tag key={index} color="green">启用</Tag>;
            } else {
                return <Tag key={index} color="orange">禁用</Tag>;
            }
        }
    },
    {
        dataIndex: 'createTime',
        title: '创建时间',
    },
];

export default columns;
