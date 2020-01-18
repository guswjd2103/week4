import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../style.css';
import $ from 'jquery';
 
class Comment extends Component {
    state = {
        editTitleMode : false,
        editContentMode : false,
        editMode : false,
        content : this.props.data.content,
        title : this.props.data.title
    }
    
    toggleEditContent = () => {
        if(this.state.editContentMode) {
            let username = this.props.data.username;
            let comment_id = this.props.data.comment_id;
            let comment = this.state.comment;

            this.props.onEdit(username, comment_id, null, comment).then(() => {
                this.setState({
                    editContentMode: !this.state.editContentMode, 
                    editMode : !this.state.editMode
                })

            })
        } else {
            this.setState({
                editContentMode : !this.state.editContentMode,
                editMode : !this.state.editMode
            })
        }
    }

    // toggleEditTitle= () => {
    //     if(this.state.editTitleMode) {
    //         let username = this.props.data.username;
    //         let comment_id = this.props.data.comment_id;
    //         let title = this.state.title

    //         this.props.onEdit(user_id, comment_id, title, null).then(() => {
    //             this.setState({
    //                 editTitleMode: !this.state.editTitleMode,
    //                 editMode : !this.state.editMode
    //             })

    //         })
    //     } else {
    //         this.setState({
    //             editTitleMode : !this.state.editTitleMode,
    //             editMode : !this.state.editMode
    //         })
    //     }
    // }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleRemove = () => {
        let user_id = this.props.data.user_id;
        let comment_id = this.props.data.comment_id;
        this.props.onRemove(user_id, comment_id);
    }

    render() {
        const dropDownMenu = (
          <div className="option-button">
              {/* <a className='dropdown-button'
                   id={`dropdown-button-${this.props.data.comment_id}`}
                   data-activates={`dropdown-${this.props.data.comment_id}`}>
                  <i className="material-icons icon-button">more_vert</i>
              </a> */}
              <ul id={`dropdown-${this.props.data._id}`} className='dropdown-content'>
                  {/* <li><a onClick = {this.toggleEditTitle}> Edit title</a></li> */}
                  <li><a onClick = {this.toggleEditContent}> Edit comment</a></li>
                  <li><a onClick = {this.handleRemove}>Remove</a></li>
              </ul>
          </div>
        );
        const CommentView = (
          <div className="card">
              <div className="info">
                  <a className="username">{this.props.data.username}</a> 
              </div>
              {/* <div className="card-content">
                  Title: {this.props.data.title}
              </div> */}
              <div className="card-content">
                  Comment: {this.props.data.comment}
                  { this.props.ownership ? dropDownMenu : undefined }
              </div>
              
          </div>
        );
        
        const editTitleView = (
            <div className="write">
                <div className="card">
                    <div className="card-content">
                        <input
                            className="materialize-textarea"
                            name = "title"
                            type = "text"
                            placeholder = "edit title"
                            content = {this.state.title}
                            onChange = {this.handleChange}>
                        </input>
                    </div>
                    <div className="card-action">
                        <a onClick={this.toggleEditTitle}>OK</a>
                    </div>
                </div>
            </div>
        )

        const editContentView = (
            <div className="write">
                <div className="card">
                <div className="card-content">
                        <input
                            className="materialize-textarea"
                            name = "content"
                            type = "text"
                            placeholder = "edit content"
                            content = {this.state.content}
                            onChange = {this.handleChange}>
                        </input>
                    </div>
                    <div className="card-action">
                        <a onClick={this.toggleEditContent}>OK</a>
                    </div>
                </div>
            </div>
        )
        
        const editView = (
            <div className="write">
                {this.state.editTitleMode ? editTitleView : editContentView}
            </div>
        )

        return (
            <div className="container memo">
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
        date : new Date(),
        content : 'Contents',
        title : 'Title',
        user_id : '0'
    },
    ownership : true,
    onEdit : (user_id, comment_id, title, content) => {
        console.log('onEdit function not defined');
    },
    comment_id : -1,
    onRemove : (user_id, comment_id) => {
        console.log('onRemove function not defined');
    }
}
export default Comment;
