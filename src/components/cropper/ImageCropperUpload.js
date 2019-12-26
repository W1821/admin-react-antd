import React, {Component} from 'react';
import {Icon, Modal, Upload} from 'antd';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import PropTypes from 'prop-types';

import NotificationService from '../../common/service/NotificationService';
import HttpService from '../../common/service/HttpService';

/**
 * 图片裁剪上传组件
 *
 */
class ImageCropperUpload extends Component {
    static propTypes = {
        uploadUrl: PropTypes.string,        // 上传后台接口url
        imageUrl: PropTypes.string,          // 显示图片地址
        onSuccess: PropTypes.func,           // 成功方法
    };

    state = {
        modalVisible: false,
        avatarLoading: false,
        selectedImageUrl: '',
    };

    reader = new FileReader();

    componentDidMount() {
        this.reader.addEventListener('load', this.fileLoadSuccess);
    }

    componentWillUnmount() {
        this.reader.removeEventListener('load', this.fileLoadSuccess);
    }

    fileLoadSuccess = () => {
        this.setState({
            selectedImageUrl: this.reader.result,
            modalVisible: true,
        });
    };

    clickCancel = () => {
        this.setState({modalVisible: false});
    };

    cropImage = () => {
        const croppedImageUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
        if (this.props.uploadUrl) {
            // 上传图片，返回图片访问相对地址
            this.upload(croppedImageUrl);
        } else {
            // 裁剪图片返回base64格式字符串
            this.props.onSuccess(croppedImageUrl);
            this.clickCancel();
        }
    };

    /**
     * antd Upload组件上传前执行方法，返回false阻断上传动作
     * @param file
     * @returns {boolean}
     */
    beforeUpload = (file) => {
        const isImage = file.type.startsWith('image');
        if (!isImage) {
            NotificationService.error('请选择图片格式！');
        } else {
            this.reader.readAsDataURL(file);
        }
        return false;
    };


    upload = (file) => {
        const body = {file: file.toString()};
        HttpService.post(this.props.uploadUrl, body).then(json => {
            if (json.success) {
                this.setState({modalVisible: false});
                this.props.onSuccess(json.data);
            }
        });
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.avatarLoading ? 'loading' : 'plus'}/>
                <div>上传</div>
            </div>
        );
        const avatar = (<img alt="头像" style={{width: '100%'}} src={this.props.imageUrl}/>);
        return (
            <div>
                <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}>
                    {this.props.imageUrl ? avatar : uploadButton}
                </Upload>
                <Modal
                    title='上传图片'
                    visible={this.state.modalVisible}
                    width={800}
                    onOk={this.cropImage}
                    onCancel={this.clickCancel}
                    maskClosable={false}
                >
                    <Cropper
                        ref='cropper'
                        src={this.state.selectedImageUrl}
                        style={{width: '100%', height: 500,}}
                        aspectRatio={1}
                        autoCropArea={0.4}
                        viewMode={1}
                        guides={true}/>
                </Modal>
            </div>
        );
    }
}

export default ImageCropperUpload;
