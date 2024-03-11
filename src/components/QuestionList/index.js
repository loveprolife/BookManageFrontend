import { Collapse, Divider, Popover } from 'antd';
import { relative } from 'path';
import React from 'react';
import {connect} from 'dva';
import AddButton from './AddButton';

const Panel = Collapse.Panel;
/*
三个属性
items: 题目列表
currentPage: 当前页
source: 题目来源: chapter章节选题，paper试卷选题，ocr拍搜选题
*/
class QuestionsList extends React.Component {

    render() {
        const { items, currentPage, source } = this.props;
        const items_panels = items? items.map((z, index) => {
            const content = (
                <div>
                <p>{z['paper_title']}</p>
                </div>
            );
            
            const header = (
            <div>
                <div>
                    <strong>题目{(currentPage-1)*10+index+1}</strong>
                    <Popover content={content} title="考试详情" trigger="hover" placement="bottom">
                        <a  style={{position: "absolute", right:20} } onClick = {(e) =>e.stopPropagation()}>考试详情</a>
                    </Popover>
                </div>
                <Divider dashed />
                <div dangerouslySetInnerHTML={{__html: z['stem']}} />
                <Divider dashed />
                <div>
                    <span>作业次数：{z['homework']}</span>
                    <span>课件次数：{z['ppt']}</span>
                    <span>正确率：{z['correct']}</span>
                    {/*可以把题目的详细信息以属性的形式传给addbutton*/}
                    <AddButton itemId={z['item_id']} points={z['points']} source={source} />
                </div>
            </div>
            );
            const points = z.points? (
                z.points.map((p,i)=>
                    <div key={i} style={{color:'blue'}}>{`${p.level}级知识点---${p.name}`}</div>
                )
            ): '无';
            
            
            return (
                <Panel showArrow={false} header={header} key={index} forceRender={true}>
                    <h4>答案：</h4>
                    <div dangerouslySetInnerHTML={{__html: z['answer']}} />
                    <Divider dashed />
                    <h4>提示：</h4>
                    <div dangerouslySetInnerHTML={{__html: z['hint']}} />
                    <Divider dashed />
                    <h4>点评：</h4>
                    <div dangerouslySetInnerHTML={{__html: z['remark']}} />
                    <Divider dashed />
                    <h4>知识点：</h4>
                    <div>{points}</div>
                </Panel>
            )
        }): (<div></div>);

        return (
            <div>
            <Collapse>
                {items_panels}
            </Collapse>
            </div>
        );
    }
}

export default QuestionsList;