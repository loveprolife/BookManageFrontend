import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Popover,Button,Icon,Divider,Badge } from 'antd';
import request from '@/utils/request';
import { stringify } from 'qs';
import { message } from 'antd';

@connect(({ basket }) => ({
    resourceList: basket.resourceList
}))
class Basket extends React.Component {
    componentDidMount() {
        // 从cookie或后端数据库加载已有的资源列表
    };

    makePaper = (e) => {
        const {resourceList} = this.props;
        if(resourceList.length == 0){
            message.config({top: '40%', duration: 2, maxCount: 3});
            message.info('请先往资料蓝加入试题');
        }else{
            const params = {
                resource_list:resourceList
            };
            request('http://127.0.0.1:50218/make_paper/', {
                method:'post',
                data: params
            }).then(v=>{
                console.log(v);
                setTimeout(()=>window.open(`http://${v.file_link}`),3000);
            }).catch(v=>{
                console.log(v);
            })
        }
    };

    makeCourseware = (e) => {
        const {resourceList} = this.props;
        const params = {
            courseware_type:1,
            grade_type:0,
            subject:2,
            term:3,
            textbook_type:0,
            template_source_type:1,
            resource_type:1,
            title:"garden" + Math.round(Math.random()*10) + Math.round(Math.random()*10) + Math.round(Math.random()*10) + Math.round(Math.random()*10),
            template_type:1,
            resource_list:resourceList
        };
        if(resourceList.length == 0){
            message.config({top: '40%', duration: 2, maxCount: 3});
            message.info('请先往资料蓝加入试题');
        }else{
            request('http://127.0.0.1:50218/gen_courseware/', {
                method:'post',
                data: params
            }).then(v=>{
                console.log(v);
                window.open(v.data.list.url);
            }).catch(v=>{
                console.log(v);
            })
            //router.push('/preview');    
        }
    };

    tu_pre_view = () => {
      router.push('/history/basketpreview');
    }

    render() {
        const {resourceList} = this.props;
        const content = (
            <div>
                <div><strong>练习题：</strong>{5}</div>
                <Divider dashed style={{marginTop:5,marginBottom:5}} />
                <div><strong>PPT：</strong>{0}</div>
                <Divider dashed style={{marginTop:5,marginBottom:5}} />
                <div><strong>视频：</strong>{0}</div>
                <Divider dashed style={{marginTop:5,marginBottom:5}} />
                <div style={{'text-align': 'center'}}><Button style={{'width': '100%'}} type='primary' onClick={this.tu_pre_view}>预览</Button></div>
                <Divider dashed style={{marginTop:5,marginBottom:5}} />
                <Button type='primary' onClick={this.makePaper}>生成试卷</Button>
                <Button type='primary' onClick={this.makeCourseware}>生成课件</Button>
            </div>
        );
        return (
            <Popover content={content} trigger="hover" placement="left">
                <Button type="primary" size='large' style={{ position: 'fixed', top: 250, right: 40, width:50, height:120}}>
                <Icon type="shopping-cart" /><br />
                资<br />料<br />篮 <br />
                <Badge count={resourceList.length} />
                </Button>
            </Popover>
        );
    }
}

export default Basket;
