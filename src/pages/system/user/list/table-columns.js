import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import {Avatar, Tag} from 'antd';

const columns = [
    {
        dataIndex: 'headPictureUrl',
        title: '头像',
        render: (text) => {
            return <Avatar icon={<UserOutlined />} src={text}/>;
        }
    },
    {
        dataIndex: 'userName',
        title: '姓名',
        sorter: true,
    },
    {
        dataIndex: 'phoneNumber',
        title: '手机号码'
    },
    {
        dataIndex: 'accountStatus',
        title: '帐号状态',
        render: (text, record, index) => {
            if (text === '0') {
                return <Tag key={index} color="green">可用</Tag>;
            } else {
                return <Tag key={index} color="orange">禁用</Tag>;
            }
        }
    },
    {
        dataIndex: 'createTime',
        title: '创建时间'
    },
    {
        dataIndex: 'roles',
        title: '角色',
        render: (text) => {
            return text.map((role, key) => <Tag key={key} color="green">{role.roleName}</Tag>);
        }
    },
];

export default columns;
