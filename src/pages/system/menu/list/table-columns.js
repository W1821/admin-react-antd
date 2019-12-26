import React from "react";
import {Icon, Tag} from "antd";
import {Link} from "react-router-dom";

const columns = [
    {
        dataIndex: 'menuName',
        title: '菜单名称',
        width: 300,
    },
    {
        dataIndex: 'icon',
        title: '图标',
        render: (text, record, index) => {
            if (text) {
                return <Icon key={index} type={text}/>
            }
        }
    },
    {
        dataIndex: 'routePath',
        title: '菜单路由',
        render: (text) => {
            if (text) {
                return <Link to={text}><Tag color="blue">{text}</Tag></Link>
            }
        }
    },
    {
        dataIndex: 'rank',
        title: '排序',
    },
];

export default columns;
