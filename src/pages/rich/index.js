import React from 'react'
import {Button, Card,Modal} from 'antd'
import { Editor } from 'react-draft-wysiwyg';   //导入editor
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';      //导入css样式
import draftToHtml from 'draftjs-to-html' //获取编辑器html内容

export default class Rich extends React.Component{
    state={}

    //当编辑内容发生改变时保存
    onEditorStateChange=(editorState)=>{
        this.setState({
            editorState,
            showRichText:false
        })
    }
     //内容发生变化,参数为输入的内容
     onEditorChange=(editorContent)=>{
        this.setState({
            editorContent
        });
    }

    //清空事件
    handleClearContent=()=>{
        this.setState({
            editorState: ''
        })
    }
    
    //获取html
    handleGetHtml=()=>{
        this.setState({
            showRichText:true
        })
    }

    render(){
        const {editorState} = this.state;
        return(
            <div>
                <Card>
                    <Button type='danger' onClick={this.handleClearContent}>清空内容</Button>
                    <Button onClick={this.handleGetHtml}>获取HTML</Button>
                </Card>
                <Card title='富文本编辑器' >
                    <Editor
                        // style={{height:500}}
                        editorState={editorState}
                        onContentStateChange={this.onEditorChange}    //获取内容变化值
                        onEditorStateChange={this.onEditorStateChange}      //编辑器状态发生变化
                        />
                </Card>
                <Modal
                title='获取html内容'
                visible={this.state.showRichText}
                onCancel={()=>{
                    this.setState({showRichText:false})
                }}
                footer={null}
                >
                    {draftToHtml(this.state.editorContent)}
                </Modal>
            </div>
        );
    }
}