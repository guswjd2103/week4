import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.css';  
import {CommentList, Write} from '../components';
import Materialize from 'materialize-css';
import $ from 'jquery';
import { commentPostRequest, commentEditRequest, commentListRequest, commentRemoveRequest } from '../actions/comment';
import axios from 'axios';
import FileView from '../components/fileView'

class ViewDetail extends Component {
    
    constructor(props){
        super(props);
        console.log('hihihihi');
        console.log(this.props.list);
        this.state={
            fileId:parseInt(this.props.match.params.fileId, 10),//get fileId to integer
            file:{}//file object
        }
    }

    handlePost = (username, filename, content) => {
        return this.props.commentPostRequest(username, filename, content).then(
            () => {
                console.log(this.props.postStatus.status);
                if(this.props.postStatus.status ==="SUCCESS") {
                    // Materialize.toast('Success!', 2000);
                    console.log('success');
                } 
            }
        );
    }
    
    handleEdit = (username, comment_id, filename, content) => {
        return this.props.commentEditRequest(username, comment_id, filename, content).then(
            () => {
                if(this.props.editStatus.status ==="SUCCESS") {
                    Materialize.toast('Success!',2000);
                } else {
                    let errorMessage = [
                        'Something broke',
                        'Contents should be string',
                        'Please write something',
                        'You are not logged in',
                        'That  does not exist anymore',
                        'You do not have permission'
                    ];
 
                    let error = this.props.editStatus.error;
 
                    // NOTIFY ERROR
                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[error - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);
 
                    // IF NOT LOGGED IN, REFRESH THE PAGE AFTER 2 SECONDS
                    if(error === 4) {
                        // setTimeout(()=> {location.reload(false)}, 2000);
                    }
                }
            }
        )
    }

    handleRemove = (user_id, comment_id) => {
        this.props.commentRemoveRequest(user_id, comment_id).then(() => {
            if(this.props.removeStatus.status==="SUCCESS") {
            } else {
                let errorMessage = [
                    'Something broke',
                    'You are not logged in',
                    'That memo does not exist',
                    'You do not have permission'
                ];
 
                 // NOTIFY ERROR
                let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.removeStatus.error - 1] + '</span>');
                Materialize.toast($toastContent, 2000);
 
 
                // IF NOT LOGGED IN, REFRESH THE PAGE
                if(this.props.removeStatus.error === 2) {
                    // setTimeout(()=> {location.reload(false)}, 2000);
                }
            }
        });
    }

    componentDidMount() {
        this.props.commentListRequest(true, undefined, undefined);

        this._getFile();
    }

    _getFile(){
        const apiUrl='/dummy/file_list.json';

        axios.get(apiUrl) /**axios.get('/download/:name') */
        .then(data=> {
            //save file that matches fileId
            this.setState({
                file:data.data.fileList.filter(f=>(
                    f.id===this.state.fileId
                ))
            });
            console.log("this.state.fileId"+this.state.fileId); //NaN
            console.log("props"+this.props.match.params.fileId); //${file.id}
            console.log("propsInt"+parseInt(this.props.match.params.fileId)); //NaN
        })
        .catch(error=>{
            console.log(error);
        });
    }

    render() {
        console.log(this.props.commentData);
        console.log(this.props.commentData.data);
        const write = (<Write onPost = {this.handlePost}/>);
        return (
            <div className = "wrapper">
                
                {this.state.file.id?(
                    <FileView file={this.state.file}/>
                ):(
                    <span>LOADING...</span>
                )}

                {write}
                <CommentList data = {this.props.commentData}
                             onEdit = {this.handleEdit}
                             onRemove = {this.handlePost}/> 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn : state.authentication.status.isLoggedIn,
        postStatus : state.comment.post,
        editStatus : state.comment.edit,
        removeStatus : state.comment.remove,
        commentData : state.comment.list.data,
        listStatus : state.comment.list.status,
        isLast : state.comment.list.isLast
    };
};

const mapDispatchToProps = (dispatch) =>{
    return {
        commentPostRequest: (username, title, content) => {
            return dispatch(commentPostRequest(username, title, content));
        }, 
        commentEditRequest : (username, comment_id , title, content) => {
            return dispatch(commentEditRequest(username, comment_id, title, content));
        },
        commentListRequest: (isInitial, listType, filename) => {
            return dispatch(commentListRequest(isInitial, listType, filename));
        },
        commentRemoveRequest : (user_id, comment_id) => {
            return dispatch(commentRemoveRequest(user_id, comment_id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewDetail); 