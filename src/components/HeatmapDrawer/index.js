import React from 'react';
import { Drawer, Button, Tooltip, Radio } from 'antd';
import {connect} from 'dva';
import HeatMap from './Heatmap'

@connect(({ tree }) => ({
  title: tree.title
}))
class HeatmapDrawer extends React.Component {
  state = { 
    visible: false, 
    childrenDrawer: false,
    fenxiType:'zhenti_analysis'
  };

  componentDidMount() {

  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChangeFenxiRadio = (e) => {
    this.setState({
      fenxiType: e.target.value,
    });
  }

  render() {
    const {fenxiType} = this.state;
    const fenxiRadioOption = [
      <Radio.Button value="qizhong_analysis" key='qizhong_analysis'>期中试卷分析</Radio.Button>,
      <Radio.Button value="qimo_analysis" key='qimo_analysis'>期末试卷分析</Radio.Button>,
      <Radio.Button value="zhenti_analysis" key='zhenti_analysis'>真题试卷分析</Radio.Button>
    ];
    return (
      <div>
        <Tooltip title="选中章节查看对应的考试热点">
          <Button type="primary" onClick={this.showDrawer} >
            考试热点分析
          </Button>
        </Tooltip>
        <Drawer
          title="考试热点分析"
          width={600}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <div>
            <span>分析类型：</span>
            <Radio.Group value={fenxiType} buttonStyle="solid" onChange={this.onChangeFenxiRadio}>
              {fenxiRadioOption}
            </Radio.Group>
          </div>
          <HeatMap />
          <h2>参考试卷:</h2>

        </Drawer>
      </div>
    );
  }
}

export default HeatmapDrawer;