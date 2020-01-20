import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import '../../style.css';

class Write extends Component {
    state = {
        username : '',
        filename: '',
        content: ''
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
                }
            }
        );
    }

    render() {
        console.log('write components');
        const writeView = (
            <div>
                <div>
                    <div>
                        <input
                                name = "filename"
                                placeholder="Filename"
                                type = "text"
                                onChange = {this.handleChange}
                                value = {this.state.filename}/>
                    </div>
                    <div>
                        <input
                                name = "content"
                                placeholder="Write down notification"
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
                    <div>파일 등록하기</div>
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

export default Write;

