import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.css';  
import {FileView, CommentList, Write} from '../components';
import Materialize from 'materialize-css';
import $ from 'jquery';
import { commentPostRequest, commentEditRequest, commentListRequest, commentRemoveRequest } from '../actions/comment';


class ViewDetail extends Component {
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
    }

    render() {
        console.log(this.props.commentData);
        console.log(this.props.commentData.data);
        const write = (<Write onPost = {this.handlePost}/>);
        return (
            <div className = "wrapper">
                {/* <FileView /> */}
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