import React from 'react';
import {Button} from 'antd';
import ua from '@/utils/ua';
import styles from './index.less';


class TakePhoto extends React.Component {
    /**
     * 拍照或相册选择
     */

    render() {
        const { onBury = () => {}, onChange } = this.props;
        return (
            <span onClick={onBury}>
                {ua.qq && ua.os.android && (
                    <span>
                    <span>拍照</span>
                    <input
                        accept="image/*"
                        value=""
                        onChange={onChange}
                        type="file"
                        capture="camera"
                    />
                    </span>
                )}
                {!(ua.qq && ua.os.android) && (
                    <span>
                    <span>上传图片</span>
                    <input
                        accept="image/*"
                        value=""
                        onChange={onChange}
                        type="file"
                    />
                    </span>
                )}
            </span>
        );
    }
}

export default TakePhoto;