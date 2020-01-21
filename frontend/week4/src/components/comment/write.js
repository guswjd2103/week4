import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStatusRequest } from '../../actions/authentication';

class Write extends Component {
    constructor(props){
        super(props);

        this.state = {
            username : this.props.name,
            filename: this.props.filename,
            content: ''
        }
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handlePost = () => {
        let username = this.state.username;
        let filename = this.state.filename;
        let content = this.state.content;

        this.props.onPost(username, filename, content).then(
            (result) => {
                if(!result){
                    this.setState({
                        username : "",
                        filename : "",
                        content : ""
                    });
                    alert('success');
                } else {
                    alert('fail');
                }
            }
        );
    }

    render() {
        const writeView = (
            <div>
                <div>
                    <div>
                        <input
                                name = "content"
                                placeholder="Write down Comment"
                                type = "text"
                                onChange = {this.handleChange}
                                value = {this.state.content}/>
                    </div>
                    <div>
                        <a onClick = {this.handlePost}>POST</a>
                    </div>
                </div>
            </div>
        )
        return (
            <div>
              <div>
                <div>
                    <div>댓글 등록하기</div>
                </div>
                {writeView}
              </div>
            </div>
        )
    }
}

Write.propTypes = {
    onPost : PropTypes.func
};

Write.defaultProps = {
    onPost : (username, filename, content) => {
        console.error("post function not defined");
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

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Write);

