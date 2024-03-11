import React from 'react';
import "antd/dist/antd.css";
import $ from 'jquery'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/heatmap';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/grid';
import {connect} from 'dva';



@connect(({ tree }) => ({
    title: tree.title
  }))
class HeatMap extends React.Component {

    componentDidMount() {
        const { title } = this.props;
        $.get('/api/heatmap', result => this.showChart(result,title));
    }

    componentDidUpdate() {
        const { title } = this.props;
        $.get('/api/heatmap', result => this.showChart(result,title));
    }

    showChart = (result, title) => {
        const chartDom = document.getElementById('gaokao-heatmap')
        const data = result[title];
        console.log(data);
        if(data) {
            const Chart = echarts.init(chartDom);
            const {xdata,ydata} = data;
            const option = {
                tooltip: {
                    triger:'axis',
                    formatter:function(p){
                        let xlab = xdata[p.data[0]];
                        let ylab = ydata[p.data[1]];
                        return '知识点：' + ylab + '<br/>' + '年份：' + xlab +'<br/>' + '分值：' + p.data[2]
                    }
        
                },
                legend: {
                    show: false
                },
                grid: {
                    x: 250
                },
                xAxis: {
                    type: 'category',
                    data: xdata,
                    axisLabel: {
                        interval: 0,
                        rotate: 90
                    }
                },
                yAxis: {
                    type: 'category',
                    data: ydata
                },
                visualMap: {
                    min: 0,
                    max: 20,
                    calculable: true,
                    realtime: false,
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    }
                },
                series: [{
                    name: '知识点',
                    type: 'heatmap',
                    data: data.data,
                    itemStyle: {
                        emphasis: {
                            borderColor: '#333',
                            borderWidth: 1
                        }
                    },
                    progressive: 1000,
                    animation: false
                }]
            };
            Chart.setOption(option);
         } else {
            console.log('empty');
         };
    };    

    render() {
        return (
            <div id='gaokao-heatmap' style={{height:1400}}>好好学习，天天向上！</div>
        );
    }
}

export default HeatMap