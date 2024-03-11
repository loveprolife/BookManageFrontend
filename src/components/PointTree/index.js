import React from 'react';
import { Tree } from 'antd';
import {connect} from 'dva';

const { TreeNode } = Tree;

// treeData和selectedKeys状态上提到Model
@connect(({ tree }) => ({
  treeData: tree.treeData,
  selectedKeys: tree.selectedKeys
}))
class PointTree extends React.Component {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
  };

  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  })

  render() {
    const { expandedKeys, autoExpandParent } = this.state;
    const { treeData, selectedKeys, onSelect } = this.props
    return (
      <Tree
        showLine
        onExpand={this.onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );
  }
}

export default PointTree;