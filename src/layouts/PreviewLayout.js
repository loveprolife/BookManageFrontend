import React from 'react';
import {connect} from 'dva';
import { Layout,Icon } from 'antd';

class PreviewLayout extends React.Component {

    render() {
        const { children } = this.props;
        return (
            <div>{children}</div>
        );
    }
}

export default PreviewLayout;