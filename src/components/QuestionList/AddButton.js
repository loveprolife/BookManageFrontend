import { Collapse } from 'antd';
import React from 'react';
import {connect} from 'dva';

/*
    从资料篮添加移出题目，现在没有扩展到课件
*/

@connect(({ basket }) => ({
    resourceList: basket.resourceList
  }))
class AddButton extends React.Component {
    state = {
        content:''
    }
    addItem = '加入资料篮';
    deleteItem = '移出资料篮';

    componentDidMount() {
        const {resourceList, itemId} = this.props;
        resourceList.find(v=>v.id===itemId)?(
            this.setState(
                {content:this.deleteItem}
            )
        ):(
            this.setState(
                {content:this.addItem}
            )
        );
    }

    handleClick = (e) => {
        e.stopPropagation();
        const {resourceList, dispatch, points, source, itemId} = this.props; 
        const d = {type:source, id:itemId, points:points}; //type用变量
        const txt = e.target.text;
        if(txt===this.addItem){
            dispatch(
                {
                    type:'basket/saveResource',
                    payload: resourceList.concat(d)
                }
            );
            this.setState({
                content: this.deleteItem
            });
        } else {
            dispatch(
                {
                    type:'basket/saveResource',
                    payload: resourceList.filter(v=>!(v.type===source&&v.id===itemId))
                }
            );
            this.setState({
                content: this.addItem
            });
        }
    };

    render() {
        const {itemId, resourceList} = this.props;
        const {content} = this.state;
        return (
            <a style={{position: "absolute", right:20}} onClick = {this.handleClick} >{content}</a>
        );
    }
}

export default AddButton;
