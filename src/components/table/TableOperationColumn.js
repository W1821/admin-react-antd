import React, {Component} from 'react';
import {Button, Divider, Icon, Popconfirm,} from 'antd';
import PropTypes from 'prop-types';

class TableOperationColumn extends Component {
    static propTypes = {
        options: PropTypes.array,
        text: PropTypes.object,
        record: PropTypes.object,
        index: PropTypes.number,
    };

    createOperationButton = () => {
        const result = [];
        const {options, record} = this.props;
        for (let i = 0; i < options.length; i++) {
            const opt = options[i];
            // 是否显示判断
            if (opt.showButton && !opt.showButton(record)) {
                continue;
            }
            switch (opt.type) {
                case 'button':
                    result.push(this.renderButton(opt, i, record));
                    break;
                case 'confirm':
                    result.push(this.renderConfirm(opt, i, record));
                    break;
                default:
                    result.push(this.renderDefault(opt, i, record));
                    break;
            }
            if (i !== options.length - 1) {
                result.push(this.renderDivide(i));
            }
        }

        return result;
    };

    renderButton = (opt, key, record) => {
        return (
            <Button
                key={key}
                type={opt.buttonType}
                icon={opt.icon}
                onClick={() => opt.option(record)}
            >
                {opt.title}
            </Button>
        );
    };
    renderConfirm = (opt, key, record) => {
        return (
            <Popconfirm
                key={key}
                placement="topRight"
                title={opt.confirmTitle}
                onConfirm={() => opt.option(record)}
                okText="是"
                cancelText="否"
            >
                <Button type={opt.buttonType} icon={opt.icon}>{opt.title}</Button>
            </Popconfirm>
        );
    };
    renderDefault = (opt, key, record) => {
        return (
            <div
                key={key}
                style={{cursor: 'pointer'}}
                onClick={e => {
                    e.preventDefault();
                    opt.option(record);
                }}
            >
                <Icon key={'pointer' + opt.title} type={opt.icon}/>{opt.title}
            </div>
        );
    };

    renderDivide = (key) => {
        return <div key={'divider' + key}><Divider type='vertical'/></div>;
    };

    render() {
        return (
            <div style={{width: '100%', display: 'flex'}}>
                {this.createOperationButton()}
            </div>
        );
    }
}

export default TableOperationColumn;
