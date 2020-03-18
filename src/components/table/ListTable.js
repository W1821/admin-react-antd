import React from 'react';
import {Table} from 'antd';
import PropTypes from 'prop-types';

import HttpService from '../../common/service/HttpService';

class ListTable extends React.Component {
    static propTypes = {
        dataSourceUrl: PropTypes.string,
        searchBody: PropTypes.object,
        pageSize: PropTypes.number,
        columns: PropTypes.array,
        rowKey: PropTypes.func,
        onRef: PropTypes.func,              //
        expandedRowRender: PropTypes.func, // 展开行渲染方法
    };

    /**
     * 查询条件
     * @type {{}}
     */

    state = {
        loading: false,         // 是否正在加载数据
        dataSource: [],         // 列表数据
        pagination: {           // 分页配置
            current: 1,
            pageSize: this.props.pageSize || 9,        // 默认页面大小10
            total: 0,
        },
        expandedRowRender: this.props.expandedRowRender,  // 展开行渲染方法，如果有展开行需要配置此方法
        rowSelection: null,     // 行选中配置，如果有批量操作需要配置此处
        scroll: {},              // 表格滚动配置
    };

    componentDidMount() {
        // 让父组件可以调用方法
        if (this.props.onRef) {
            this.props.onRef(this);
        }
        this.load();
    }

    componentWillUnmount() {
        // 有异步更新state的情况，这里需要处理下，防止可能出现内存泄漏。
        this.setState = () => {
        };
    }

    /**
     * 条件查询，从第一页开始
     */
    search() {
        this.load(1);
    }


    handleChange = (pagination, filters, sorter) => {
        this.load(pagination.current, sorter);
    };


    /**
     * 加载数据，加载当前页数据
     */
    load = (index, sorter = {}) => {
        const searchBody = {...this.props.searchBody};
        searchBody.index = index || this.state.pagination.current;
        searchBody.size = this.state.pagination.pageSize;
        // 排序功能
        searchBody.sortField = sorter.field;
        searchBody.sortOrder = sorter.order;
        // 加载圈开始
        this.setState({loading: true});
        // 执行http请求
        HttpService.postNotHandleError(this.props.dataSourceUrl, searchBody).then(this.loadSuccess, this.loadError);
    };

    /**
     * 处理成功返回数据
     */
    loadSuccess = response => {
        // 加载圈结束
        this.setState({loading: false});
        if (!response.success) {
            return;
        }
        // 处理成功返回数据
        const data = response.data;
        // 分页接口返回格式
        this.setState({
            dataSource: data.content,
            pagination: {
                current: data.number + 1, // 接口返回页码从0开始
                pageSize: data.size,      // 后台接口会限制分页大小
                total: data.totalElements,
            }
        });
    };

    loadError = () => {
        // 加载圈结束
        this.setState({loading: false});
    };

    render() {
        return (
            <div style={{marginTop: 10}}>
                <Table
                    {...this.state}
                    columns={this.props.columns}
                    rowKey={this.props.rowKey || 'id'}
                    onChange={this.handleChange}
                    bordered
                />
            </div>
        );
    }
}

export default ListTable;
