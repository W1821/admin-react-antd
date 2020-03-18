import React, {Component} from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Button, Card, Modal, Tabs } from 'antd';

import './MenuIconModal.css';

const {TabPane} = Tabs;

const directionalIcons = ['step-backward', 'step-forward', 'fast-backward', 'fast-forward', 'shrink', 'arrows-alt', 'down', 'up', 'left', 'right', 'caret-up', 'caret-down', 'caret-left', 'caret-right', 'up-circle', 'down-circle', 'left-circle', 'right-circle', 'double-right', 'double-left', 'vertical-left', 'vertical-right', 'vertical-align-top', 'vertical-align-middle', 'vertical-align-bottom', 'forward', 'backward', 'rollback', 'enter', 'retweet', 'swap', 'swap-left', 'swap-right', 'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'play-circle', 'up-square', 'down-square', 'left-square', 'right-square', 'login', 'logout', 'menu-fold', 'menu-unfold', 'border-bottom', 'border-horizontal', 'border-inner', 'border-outer', 'border-left', 'border-right', 'border-top', 'border-verticle', 'pic-center', 'pic-left', 'pic-right', 'radius-bottomleft', 'radius-bottomright', 'radius-upleft', 'fullscreen', 'fullscreen-exit'];
const suggestedIcons = ['question', 'question-circle', 'plus', 'plus-circle', 'pause', 'pause-circle', 'minus', 'minus-circle', 'plus-square', 'minus-square', 'info', 'info-circle', 'exclamation', 'exclamation-circle', 'close', 'close-circle', 'close-square', 'check', 'check-circle', 'check-square', 'clock-circle', 'warning', 'issues-close', 'stop'];
const editorIcons = ['edit', 'form', 'copy', 'scissor', 'delete', 'snippets', 'diff', 'highlight', 'align-center', 'align-left', 'align-right', 'bg-colors', 'bold', 'italic', 'underline', 'strikethrough', 'redo', 'undo', 'zoom-in', 'zoom-out', 'font-colors', 'font-size', 'line-height', 'colum-height', 'dash', 'small-dash', 'sort-ascending', 'sort-descending', 'drag', 'ordered-list', 'unordered-list', 'radius-setting', 'column-width'];
const dataIcons = ['area-chart', 'pie-chart', 'bar-chart', 'dot-chart', 'line-chart', 'radar-chart', 'heat-map', 'fall', 'rise', 'stock', 'box-plot', 'fund', 'sliders'];
const brandLogosIcons = ['android', 'apple', 'windows', 'ie', 'chrome', 'github', 'aliwangwang', 'dingding', 'weibo-square', 'weibo-circle', 'taobao-circle', 'html5', 'weibo', 'twitter', 'wechat', 'youtube', 'alipay-circle', 'taobao', 'skype', 'qq', 'medium-workmark', 'gitlab', 'medium', 'linkedin', 'google-plus', 'dropbox', 'facebook', 'codepen', 'amazon', 'google', 'codepen-circle', 'alipay', 'ant-design', 'ant-cloud', 'aliyun', 'zhihu', 'slack', 'slack-square', 'behance', 'behance-square', 'dribbble', 'dribbble-square', 'instagram', 'yuque', 'alibaba', 'yahoo', 'reddit', 'sketch'];
const applicationIcons = ['account-book', 'alert', 'api', 'appstore', 'audio', 'bank', 'bell', 'book', 'bug', 'build', 'bulb', 'calculator', 'calendar', 'camera', 'car', 'carry-out', 'cloud', 'code', 'contacts', 'compass', 'container', 'control', 'credit-card', 'crown', 'customer-service', 'dashboard', 'database', 'dislike', 'environment', 'experiment', 'eye', 'file-excel', 'file-exclamation', 'file-add', 'file-image', 'file-markdown', 'file-ppt', 'file-pdf', 'file-text', 'file-unknown', 'file-zip', 'file', 'file-word', 'filter', 'flag', 'fire', 'folder-add', 'folder-open', 'folder', 'frown', 'funnel-plot', 'gift', 'hdd', 'heart', 'home', 'hourglass', 'idcard', 'insurance', 'interaction', 'layout', 'like', 'lock', 'mail', 'medicine-box', 'meh', 'message', 'mobile', 'money-collect', 'notification', 'pay-circle', 'phone', 'picture', 'play-square', 'printer', 'profile', 'project', 'property-safety', 'pushpin', 'read', 'reconciliation', 'red-envelope', 'rest', 'rocket', 'safety-certificate', 'save', 'schedule', 'security-scan', 'setting', 'shop', 'shopping', 'skin', 'smile', 'sound', 'star', 'switcher', 'tablet', 'tag', 'tags', 'thunderbolt', 'tool', 'trophy', 'unlock', 'usb', 'video-camera', 'wallet', 'apartment', 'audit', 'barcode', 'bars', 'block', 'border', 'branches', 'ci', 'cloud-download', 'cloud-server', 'cloud-sync', 'cloud-upload', 'cluster', 'coffee', 'column-height', 'copyright', 'deployment-unit', 'desktop', 'disconnect', 'dollar', 'download', 'ellipsis', 'euro', 'exception', 'export', 'file-done', 'file-jpg', 'file-protect', 'file-search', 'file-sync', 'fork', 'gateway', 'global', 'gold', 'history', 'import', 'inbox', 'key', 'laptop', 'line', 'link', 'loading-3-quarters', 'loading', 'man', 'menu', 'monitor', 'more', 'number', 'paper-clip', 'percentage', 'pound', 'poweroff', 'pull-request', 'qrcode', 'reload', 'robot', 'safety', 'scan', 'search', 'select', 'shake', 'share-alt', 'shopping-cart', 'solution', 'sync', 'table', 'team', 'to-top', 'trademark', 'transaction', 'upload', 'user-add', 'user-delete', 'user', 'usergroup-add', 'usergroup-delete', 'wifi', 'woman'];

const tabList = [
    {key: '0', tab: '方向性图标'},
    {key: '1', tab: '提示建议性图标'},
    {key: '2', tab: '编辑类图标'},
    {key: '3', tab: '数据类图标'},
    {key: '4', tab: '品牌和标识'},
    {key: '5', tab: '网站通用图标'},
];

class MenuIconModal extends Component {

    state = {
        modalVisible: false,
        cardKey: 0,
        tabContents: [directionalIcons, suggestedIcons, editorIcons, dataIcons, brandLogosIcons, applicationIcons]
    };

    componentDidMount() {
        this.props.onRef(this);
    }

    openModal = () => {
        this.setState({modalVisible: true});
    };

    clickOk = () => {
        this.clickCancel();
    };

    clickCancel = () => {
        this.setState({modalVisible: false});
    };

    selectIcon = (icon) => {
        this.props.onClickOk(icon);
        this.clickCancel();
    };

    renderTabPane = () => {
        return tabList.map(tab => (
                <TabPane tab={tab.tab} key={tab.key}>
                    <Card className='icon-content'>
                        {this.state.tabContents[tab.key]
                            .map(icon => (
                                    <Card.Grid
                                        key={icon}
                                        onClick={() => this.selectIcon(icon)}
                                        className='icon-card-grid'>
                                        <LegacyIcon type={icon}/>
                                    </Card.Grid>
                                )
                            )}
                    </Card>
                </TabPane>
            )
        );
    };

    render() {
        return (
            <Modal
                visible={this.state.modalVisible}
                onCancel={this.clickCancel}
                width={'70%'}
                footer={[<Button key='cancel' onClick={this.clickCancel}>取消</Button>]}
                title='选择图标'>

                <Tabs>
                    {this.renderTabPane()}
                </Tabs>

            </Modal>
        );
    }

}

export default MenuIconModal;
