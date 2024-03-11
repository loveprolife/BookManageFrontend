import React, { PureComponent } from 'react';
import request from '@/utils/request';
import { Card, Row, Col, Divider, Cascader, Select, Input, Badge, Upload, Button, Icon, Switch, message, Collapse, List, Pagination, Modal, Form, Alert } from 'antd';
import router from 'umi/router';
import storage from '../../utils/storage';
import Grid from 'antd/lib/card/Grid';
import { T } from 'antd/lib/upload/utils';
import { title } from '@/defaultSettings';

const Panel = Collapse.Panel;

class Book extends React.Component {
    state = {
        list:[],
        totalBooks: 0,
        pageSize: 10,
        pageNum: 1,
        pageHtml: null,
        searchedBookId: 0,
        modalSearchVisible: false,
        modalUpdateVisible: false,
        modalInsertVisible: false,
        bookInfo: null,
        bookIdU: "uid_0",
        bookNameU: "uname_1",
        bookAuthorU: "uauthor_2",
        bookPublicationyearU: "upublicationyear_3",
        bookIsbnU: "uisbn_4",
        bookIdW: "wid_0",
        bookNameW: "wname_1",
        bookAuthorW: "wauthor_2",
        bookPublicationyearW: "wpublicationyear_3",
        bookIsbnW: "wisbn_4",
        bookIdI: "iid_0",
        bookNameI: "iname_1",
        bookAuthorI: "iauthor_2",
        bookPublicationyearI: "ipublicationyear_3",
        bookIsbnI: "iisbn_4",
        alertName: null,
        alertAuthor: null,
        alertPublicationyear: null,
        alertISBN: null,
        alertSearch: null
    };

    uNameRef = React.createRef();

    componentDidMount() {
        const pageNum = this.props.location.query.pageNum ? this.props.location.query.pageNum : 1;
        const pageSize = this.props.location.query.pageSize ? this.props.location.query.pageSize : 10;
        this.setState({pageNum: pageNum, pageSize: pageSize});
        this.loadPointList(pageNum, pageSize);
    }

    loadPointList(pageNum, pageSize){
        request('http://123.57.58.105:8000/getList/?pageNum='+pageNum+'&pageSize='+pageSize, {
            method:'get'
        }).then((res)=>{
            this.setState({list: res.books, totalBooks: res.totalBooks});
            this.setState({pageHtml: <Pagination style={{display: "flex", alignItems: "center", justifyContent: "center"}} showQuickJumper defaultCurrent={parseInt(pageNum)} total={res.totalBooks} pageSize={parseInt(pageSize)} onChange={this.onPageChange} />});
        });
    }

    onPageChange = (pageNum) => {
        location.href="/book/book?pageNum="+pageNum+"&pageSize="+this.state.pageSize;
    }

    deleteBookById = (bookId) => {
        request('http://123.57.58.105:8000/delete?bookId='+bookId, {
            method:'get'
        }).then((res)=>{
            request('http://123.57.58.105:8000/getList/?pageNum=1&pageSize=10', {
            method:'get'
            }).then((data)=>{
                if(parseInt(this.state.pageNum) > 1){
                    if((parseInt(this.state.pageNum) - 1)*parseInt(this.state.pageSize) == parseInt(data.totalBooks)){
                        location.href="/book/book?pageNum="+(parseInt(this.state.pageNum) - 1)+"&pageSize="+this.state.pageSize;
                        return;
                    }
                }
                location.href="/book/book?pageNum="+(parseInt(this.state.pageNum))+"&pageSize="+this.state.pageSize;
            });
        });
    }

    updateSearchedBookId = (SearchInputObj) => {
        this.setState({searchedBookId: SearchInputObj.target.value });
    }

    searchBookById = () => {
        if(parseInt(this.state.searchedBookId)>0){
            request('http://123.57.58.105:8000/getBookById/?bookId='+this.state.searchedBookId, {
                method:'get'
            }).then((res)=>{
                if(res.book != null){
                    this.setState({modalSearchVisible: true});
                    this.setState({bookInfo: res.book});
                }else{
                    this.setState({alertSearch: <Alert style={{width: "250px"}} message="This BookId is not exist!" type="error" showIcon />});
                    setTimeout(() => {
                        this.setState({alertSearch: null});
                      }, 3000);
                }
            });
        }else{
            this.setState({alertSearch: <Alert style={{width: "250px"}} message="Please input the Book Id!" type="warning" showIcon />});
            setTimeout(() => {
                this.setState({alertSearch: null});
              }, 3000);
        }
    }

    handleSearchModalOk = (e) => {
        this.setState({modalSearchVisible: false});
    }

    handleSearchModalCancel = (e) => {
        this.setState({modalSearchVisible: false});
    }

    updateBookInfoById = (bookId) => {
        request('http://123.57.58.105:8000/getBookById/?bookId='+bookId, {
            method:'get'
        }).then((res)=>{
            this.setState({modalUpdateVisible: true});
            this.setState({bookIdU: res.book.id,
                           bookNameU:res.book.name,
                           bookAuthorU:res.book.author,
                           bookPublicationyearU:res.book.publicationyear,
                           bookIsbnU:res.book.isbn,
                           bookIdW: res.book.id,
                           bookNameW:res.book.name,
                           bookAuthorW:res.book.author,
                           bookPublicationyearW:res.book.publicationyear,
                           bookIsbnW:res.book.isbn,});
        });
    }

    insertBookInfo = () => {
        this.setState({modalInsertVisible: true});
    }

    handleInsertModalOk = (e) => {
        var tmp = 0;
        if (this.state.bookNameI.length <= 0 || this.state.bookNameI == 'iname_1'){
            this.setState({alertName: <Alert message="Name should not be empty" type="error" showIcon />});
            tmp = 1;
        }
        if (this.state.bookAuthorI.length <= 0 || this.state.bookAuthorI == 'iauthor_2'){
            this.setState({alertAuthor: <Alert message="Author should not be empty" type="error" showIcon />});
            tmp = 1;
        }
        if (this.state.bookPublicationyearI.length <= 0 || this.state.bookPublicationyearI == 'ipublicationyear_3'){
            this.setState({alertPublicationyear: <Alert message="Publication Year should not be empty" type="error" showIcon />});
            tmp = 1;
        }
        if (this.state.bookIsbnI.length <= 0 || this.state.bookIsbnI == 'iisbn_4'){
            this.setState({alertISBN: <Alert message="ISBN should not be empty" type="error" showIcon />});
            tmp = 1;
        }
        if (tmp ==0){
            request('http://123.57.58.105:8000/insert?name='+this.state.bookNameI+'&author='+this.state.bookAuthorI+'&publicationyear='+this.state.bookPublicationyearI+'&ISBN='+this.state.bookIsbnI, {
                method:'get'
            }).then((res)=>{
                this.setState({modalInsertVisible: false});
                location.href="/book/book?pageNum=1&pageSize="+this.state.pageSize;
            });
        }
    }
    handleInsertModalCancel = (e) => {
        this.setState({modalInsertVisible: false});
    }

    handleUpdateModalOk = (e) => {
        if (this.state.bookNameW.length <= 0){
            return;
        }
        if (this.state.bookAuthorW.length <= 0){
            return;
        }
        if (this.state.bookPublicationyearW.length <= 0){
            return;
        }
        if (this.state.bookIsbnW.length <= 0){
            return;
        }
        request('http://123.57.58.105:8000/update?bookId='+this.state.bookIdU+'&name='+this.state.bookNameW+'&author='+this.state.bookAuthorW+'&publicationyear='+this.state.bookPublicationyearW+'&ISBN='+this.state.bookIsbnW, {
            method:'get'
        }).then((res)=>{
            this.setState({modalUpdateVisible: false});
            location.href="/book/book?pageNum="+(parseInt(this.state.pageNum))+"&pageSize="+this.state.pageSize;
        });
    }

    handleUpdateModalCancel = (e) => {
        this.setState({modalUpdateVisible: false});
    }

    updateNameU = (e) => {
        this.setState({bookNameW: e.currentTarget.value});
        if (e.currentTarget.value.length > 0){
            this.setState({alertName: null});
        }else{
            this.setState({alertName: <Alert message="Name should not be empty" type="error" showIcon />});
        }
    }
    updateAuthorU = (e) => {
        this.setState({bookAuthorW: e.currentTarget.value});
        if (e.currentTarget.value.length > 0){
            this.setState({alertAuthor: null});
        }else{
            this.setState({alertAuthor: <Alert message="Author should not be empty" type="error" showIcon />});
        }
    }
    updatePublicationyearU = (e) => {
        this.setState({bookPublicationyearW: e.currentTarget.value});
        if (e.currentTarget.value.length > 0){
            this.setState({alertPublicationyear: null});
        }else{
            this.setState({alertPublicationyear: <Alert message="Publication Year should not be empty" type="error" showIcon />});
        }
    }
    updateIsbnU = (e) => {
        this.setState({bookIsbnW: e.currentTarget.value});
        if (e.currentTarget.value.length > 0){
            this.setState({alertISBN: null});
        }else{
            this.setState({alertISBN: <Alert message="ISBN should not be empty" type="error" showIcon />});
        }
    }

    insertNameI = (e) => {
        this.setState({bookNameI: e.currentTarget.value});
        if (e.currentTarget.value.length > 0){
            this.setState({alertName: null});
        }else{
            this.setState({alertName: <Alert message="Name should not be empty" type="error" showIcon />});
        }
    }
    insertAuthorI = (e) => {
        this.setState({bookAuthorI: e.currentTarget.value});
        if (e.currentTarget.value.length > 0){
            this.setState({alertAuthor: null});
        }else{
            this.setState({alertAuthor: <Alert message="Author should not be empty" type="error" showIcon />});
        }
    }
    insertPublicationyearI = (e) => {
        this.setState({bookPublicationyearI: e.currentTarget.value});
        if (e.currentTarget.value.length > 0){
            this.setState({alertPublicationyear: null});
        }else{
            this.setState({alertPublicationyear: <Alert message="Publication Year should not be empty" type="error" showIcon />});
        }
    }
    insertIsbnI = (e) => {
        this.setState({bookIsbnI: e.currentTarget.value});
        if (e.currentTarget.value.length > 0){
            this.setState({alertISBN: null});
        }else{
            this.setState({alertISBN: <Alert message="ISBN should not be empty" type="error" showIcon />});
        }
    }

    render() {
        // const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 14 },
            },
          };
        return (
            <div style={{width: "500px", margin: "0px auto"}}>
                <div style={{width: "500px", margin: "0px auto"}}>
                    {this.state.alertSearch}
                    <span><Input style={{width: "250px"}} onChange={this.updateSearchedBookId} type='number' placeholder="Input Book Id (Must Int Type)" /></span>
                    <span><Button onClick={this.searchBookById}>Search</Button></span>
                    <span style={{float: "right"}}><Button onClick={this.insertBookInfo}>Add Book</Button></span>
                </div>
                <List
                    style={{
                        width: "500px",
                        alignItems: "center",
                        justifyContent: "center"}}
                    itemLayout="vertical"
                    dataSource={this.state.list}
                    renderItem={item => (
                            <List.Item
                            id="book"
                            grid={{
                                gutter: 16,
                                column: 20,
                            }} >
                                <table style={{width: "100%"}}>
                                    <tr>
                                        <td>
                                            <div style={{width: "250px", wordWrap: "break-word"}}>ID: {item["id"]}</div>
                                            <div style={{width: "250px", wordWrap: "break-word"}}>Name: {item["name"]}</div>
                                            <div style={{width: "250px", wordWrap: "break-word"}}>Author: {item["author"]}</div>
                                            <div style={{width: "250px", wordWrap: "break-word"}}>Publication Year: {item["publicationyear"]}</div>
                                            <div style={{width: "250px", wordWrap: "break-word"}}>ISBN: {item["isbn"]}</div>
                                        </td>
                                        <td style={{textAlign: "right"}}>
                                            <table style={{width: "100%"}}>
                                                <tr>
                                                    <td><Button onClick={this.updateBookInfoById.bind(this, item["id"])}>Update</Button></td>
                                                    <td><Button onClick={this.deleteBookById.bind(this, item["id"])}>Delete</Button></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </List.Item>
                    )}
                />
                {this.state.pageHtml}
                <Modal
                    title="Search Book Info"
                    visible={this.state.modalSearchVisible}
                    onOk={this.handleSearchModalOk}
                    onCancel={this.handleSearchModalCancel}>
                        <p>ID: {this.state.bookInfo?this.state.bookInfo.id:""}</p>
                        <p>Name: {this.state.bookInfo?this.state.bookInfo.name:""}</p>
                        <p>Author: {this.state.bookInfo?this.state.bookInfo.author:""}</p>
                        <p>Publication Year: {this.state.bookInfo?this.state.bookInfo.publicationyear:""}</p>
                        <p>ISBN: {this.state.bookInfo?this.state.bookInfo.isbn:""}</p>
                </Modal>
                <Modal
                    title="Update Book Info"
                    visible={this.state.modalUpdateVisible}
                    onOk={this.handleUpdateModalOk}
                    onCancel={this.handleUpdateModalCancel}>
                        {this.state.alertName}
                        {this.state.alertAuthor}
                        {this.state.alertPublicationyear}
                        {this.state.alertISBN}
                        <Form>
                            <Form.Item
                                {...formItemLayout}
                                label="Id"
                                >
                                {(
                                    <Input key={this.state.bookIdU} defaultValue={this.state.bookIdU} disabled="true" />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="Name"
                                >
                                {(
                                    <Input onChange={this.updateNameU.bind(this)} key={this.state.bookNameU} defaultValue={this.state.bookNameU} />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="Author"
                                >
                                {(
                                    <Input onChange={this.updateAuthorU.bind(this)} key={this.state.bookAuthorU} defaultValue={this.state.bookAuthorU} />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="Publication Year"
                                >
                                {(
                                    <Input onChange={this.updatePublicationyearU.bind(this)} key={this.state.bookPublicationyearU} defaultValue={this.state.bookPublicationyearU} />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="ISBN"
                                >
                                {(
                                    <Input onChange={this.updateIsbnU.bind(this)} key={this.state.bookIsbnU} defaultValue={this.state.bookIsbnU} />
                                )}
                            </Form.Item>
                        </Form>
                </Modal>
                <Modal
                    title="Insert Book Info"
                    visible={this.state.modalInsertVisible}
                    onOk={this.handleInsertModalOk}
                    onCancel={this.handleInsertModalCancel}>
                        {this.state.alertName}
                        {this.state.alertAuthor}
                        {this.state.alertPublicationyear}
                        {this.state.alertISBN}
                        <Form>
                            <Form.Item
                                {...formItemLayout}
                                label="Name"
                                >
                                {(
                                    <Input onChange={this.insertNameI.bind(this)} />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="Author"
                                >
                                {(
                                    <Input onChange={this.insertAuthorI.bind(this)} />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="Publication Year"
                                >
                                {(
                                    <Input onChange={this.insertPublicationyearI.bind(this)} />
                                )}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="ISBN"
                                >
                                {(
                                    <Input onChange={this.insertIsbnI.bind(this)} />
                                )}
                            </Form.Item>
                        </Form>
                </Modal>
            </div>
        );
    }
}

export default Book;
