import React, {Component} from 'react';
import {Button, Divider, Form, Tag} from 'antd';
import {EditModal} from '../../../../components';
import MenuButtonModal from './MenuButtonModal';

import './MenuButtonModal.css';

import {Menu} from '../menu.model';

import NotificationService from '../../../../common/service/NotificationService';
import menuService from '../menu.service';

import formFields from './menu-edit.form-field';
import PropTypes from 'prop-types';
import MenuIconModal from './MenuIconModal';

const FormItem = Form.Item;

class MenuEdit extends Component {

    static propTypes = {
        saveSuccess: PropTypes.func,
    };

    state = {
        menu: new Menu(),
        menuArray: [],
        showAddButton: false,
    };

    isFirstOpen = true;

    componentDidMount() {
        // 让父组件可以调用方法,父组件必须有props：onFef，否则报错
        this.props.onRef(this);
        // 初始化上级菜单选项
        this.initMenuInfo();
    }

    componentWillUnmount() {
        this.setState = () => {
        };
    }

    initMenuInfo = () => {
        menuService.list().then(res => {
            if (res) {
                this.setState({menuArray: res.data});
                let options = res.data
                    .filter(menu => menu.pids.split(',').length < 2)
                    .map(menu => {
                        return {label: menu.showName, value: menu.id};
                    });
                options = [{label: '--无--', value: null}, ...options];
                // 上级菜单下拉选初始化
                formFields.forEach(field => {
                    if (field.key === 'pid') {
                        field.options = options;
                        field.onChange = this.onPidChange;
                    }
                    if (field.key === 'icon') {
                        field.onSearch = this.clickIconSearch;
                    }
                });
            }
        });
    };

    onPidChange = (value) => {
        if (!value) {
            this.setState({showAddButton: false});
        } else {
            const pMenu = this.state.menuArray.find(m => m.id === value);
            const showAddButton = !!(pMenu && pMenu.pids && pMenu.pids.split(',').length === 1);
            this.setState({showAddButton});
        }
    };

    clickIconSearch = () => {
        this.menuIconModalRef.openModal();
    };

    /**
     * 增加页面
     */
    openAddModal = (id) => {
        this.openModal();
        this.setState({menu: new Menu()});
        if (id === null) {
            return;
        }
        // 增加下级，给上级下拉选赋值
        if (this.isFirstOpen) {
            // 增加菜单,延迟设置
            setTimeout(() => this.props.form.setFieldsValue({pid: id}), 100);
            this.isFirstOpen = false;
        } else {
            this.props.form.setFieldsValue({pid: id});
        }
        this.onPidChange(id);
    };
    /**
     * 修改页面
     */
    openEditModal = (id) => {
        menuService.query(id).then(res => {
            if (res) {
                const menu = new Menu(res.data);
                this.setState({menu});
                // 表单赋值
                const fieldsValue = {};
                formFields.forEach(field => {
                    fieldsValue[field.key] = menu[field.key];
                    if (field.key === 'icon') {
                        field.icon = menu.icon;
                    }
                });
                const menuIds = menu.menuIds;
                this.props.form.setFieldsValue({menuIds, ...fieldsValue});
                this.onPidChange(menu.pid);
            }
        });
        this.openModal();
    };

    openModal = () => {
        this.editModalRef.openModal();
    };

    /**
     * 保存
     */
    save = (values) => {
        const pids = this.getPids();
        if (pids.split(',').length > 2) {
            NotificationService.error('请选择正确的上级菜单，三级菜单不可作为上级菜单');
            return Promise.resolve(false);
        }

        const id = this.state.menu.id;

        const body = {id, pids, ...values, buttons: this.state.menu.buttons};

        let promise;
        if (id !== undefined && id !== null) {
            promise = menuService.update(body);
        } else {
            promise = menuService.add(body);
        }
        return promise.then(res => {
            if (res) {
                // 保存成功，刷新list页面
                this.props.saveSuccess();
            }
            return !!res;
        });
    };

    /**
     * 得到上级菜单
     */
    getPids = () => {
        let pids = '';
        const pMenu = this.state.menuArray.find(menu => this.props.form.getFieldValue('pid') === menu.id);
        if (pMenu) {
            pids = pMenu.pids ? pMenu.pids + ',' + pMenu.id : pMenu.id;
        }
        return pids;
    };

    openButtonModal = (index, button) => {
        this.menuButtonModalRef.openModal(index, button);
    };

    onClickButtonModalOk = (index, button) => {
        const menu = this.state.menu;
        const buttons = [...menu.buttons];
        if (index === null) {
            // 增加
            if (buttons.find(b => b.buttonName === button.buttonName)) {
                NotificationService.error('按钮名称不能重复');
                return Promise.resolve(false);
            }
            buttons.push(button);
        } else {
            // 修改
            const identicalIndex = buttons.findIndex(b => b.buttonName === button.buttonName);
            if (identicalIndex !== -1 && identicalIndex !== index) {
                NotificationService.error('按钮名称不能重复');
                return Promise.resolve(false);
            }
            buttons.splice(index, 1, button);
        }
        menu.buttons = buttons;
        this.setState({menu});
        return Promise.resolve(true);
    };

    onClickIconModalOk = (icon) => {
        this.props.form.setFieldsValue({icon});
        formFields.forEach(field => {
            if (field.key === 'icon') {
                field.icon = icon;
            }
        });
    };


    handleTagClose = (button) => {
        const menu = this.state.menu;
        console.log('menu', menu.buttons);
        menu.buttons = menu.buttons.filter(b => b !== button);
        console.log('menu', menu.buttons);
        this.setState({menu});
    };


    renderAddButton = () => {
        return (
            <div>
                <Divider/>

                <FormItem colon={false} label={' '}>
                    <Button icon='plus' onClick={this.openButtonModal}>
                        添加按钮
                    </Button>
                </FormItem>

                <FormItem label='注册按钮'>
                    {this.renderTags()}
                </FormItem>
            </div>
        );
    };

    renderTags = () => {
        const buttons = this.state.menu.buttons;
        console.log('renderTags', buttons);
        return buttons.map((button, index) => (
                <Tag key={button.buttonName}
                     onClose={event => {
                         event.stopPropagation();
                         this.handleTagClose(button);
                     }}
                     onClick={() => this.openButtonModal(index, button)}
                     closable
                     color="blue"
                >
                    {button.buttonName}
                </Tag>
            )
        );
    };

    render() {
        return (
            <EditModal
                {...this.props}
                onRef={ref => this.editModalRef = ref}
                formFields={formFields}
                saveCallback={this.save}>

                {this.state.showAddButton ? this.renderAddButton() : null}

                <MenuButtonModal onRef={ref => this.menuButtonModalRef = ref} onClickOk={this.onClickButtonModalOk}/>

                <MenuIconModal onRef={ref => this.menuIconModalRef = ref} onClickOk={this.onClickIconModalOk}/>

            </EditModal>
        );
    }
}

export default Form.create()(MenuEdit);
