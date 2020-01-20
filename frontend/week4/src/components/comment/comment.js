import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { commentPostRequest, commentEditRequest, commentListRequest, commentRemoveRequest } from '../../actions/comment';
import '../../style.css';
import $ from 'jquery';
 
class Comment extends Component {
    state = {
        editTitleMode : false,
        editContentMode : false,
        editMode : false,
        content : this.props.data.content,
        title : this.props.data.title,
        comment : this.props.data.comment,
        onRemove : false
    }
    
    toggleEditContent = () => {
        if(this.state.editContentMode) {
            let username = this.props.data.username;
            let filename = this.props.data.filename;
            let comment = this.state.content;

            console.log(comment);

            this.props.onEdit(username, filename, comment).then(() => {
                this.setState({
                    editContentMode: !this.state.editContentMode, 
                    editMode : !this.state.editMode,
                    comment : comment
                })

            })
        } else {
            this.setState({
                editContentMode : !this.state.editContentMode,
                editMode : !this.state.editMode
            })
        }
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleRemove = () => {
        let username = this.props.data.username;
        let comment = this.props.data.comment;

        this.props.commentRemoveRequest(username, comment).then(() => {
            if(this.props.removeStatus.status==="SUCCESS") {
                console.log('hihi');
                this.setState({
                    comment : ''
                })
            }
        })
        // this.props.onRemove(username, comment).then(
        //     () => {
        //         if(this.props.editStatus.status === "SUCCESS") {
        //             console.log('success~');
        //         }
        //     }
        // );
        // if(this.props.editStatus.status === "SUCCESS"){
        //     console.log('success!!!');
        //     this.setState({
        //         onEdit : true
        //     })
        // }
    }

    render() {
        const onRemove = this.state.onRemove;
        const dropDownMenu = (
          <div>
              <ul id={`dropdown-${this.props.data._id}`}>
                  <li><a onClick = {this.toggleEditContent}> Edit comment</a></li>
                  <li><a onClick = {this.handleRemove}>Remove</a></li>
              </ul>
          </div>
        );
        const CommentView = (
          <div>
              <div>
                  <a className="username">{this.props.data.username}</a> 
              </div>
              <div>
                  Comment: {this.state.comment}
                  { this.props.ownership ? dropDownMenu : undefined }
              </div>
              
          </div>
        );
        
        const editContentView = (
            <div>
                <div>
                <div>
                        <input
                            name = "content"
                            type = "text"
                            placeholder = "edit content"
                            content = {this.state.content}
                            onChange = {this.handleChange}>
                        </input>
                    </div>
                    <div>
                        <a onClick={this.toggleEditContent}>OK</a>
                    </div>
                </div>
            </div>
        )
        
        const editView = (
            <div>
                {editContentView}
                {/* {this.state.editTitleMode ? editTitleView : editContentView} */}
            </div>
        )

        return (
            <div>
                { this.state.editMode ? editView : CommentView }
            </div>
        );
    }
}

Comment.propTypes = {
    data : PropTypes.object,
    ownershipt : PropTypes.bool,
    onEdit : PropTypes.func,
    onRemove : PropTypes.func,
    comment_id : PropTypes.number
} 

Comment.defaultProps = {
    data : {
        comment_id : '1',
        // date : new Date(),
        // content : 'Contents',
        // title : 'Title',
        // user_id : '0'
        username : '',
        filename : '',
        // comment_id : '',
        comment : ''
    },
    ownership : true,
    onEdit : (username, filename, comment) => {
        console.log('onEdit function not defined');
    },
    comment_id : -1,
    onRemove : (username, comment) => {
        console.log('onRemove function not defined');
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn : state.authentication.status.isLoggedIn,
        name : state.authentication.status.name,
        department : state.authentication.status.department,
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
        commentEditRequest : (username,filename, comment) => {
            return dispatch(commentEditRequest(username, filename, comment));
        },
        commentListRequest: (isInitial, listType, filename) => {
            return dispatch(commentListRequest(isInitial, listType, filename));
        },
        commentRemoveRequest : (username, comment) => {
            return dispatch(commentRemoveRequest(username, comment));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
