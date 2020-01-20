import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FileList from '../routes/fileList';
import {Button} from 'semantic-ui-react'; 

class ShowFileList extends Component {

    constructor () {
        super();
        this.state = {
            subject : ''
        };
    }
    
    
    handleOnClick(subject) {
        this.setState({
            subject : subject
        })
    }

    
    render() {
        return (
            <div>
                <div>
                    {this.props.list.map((file,index)=>(
                        <ul>
                            <li key={index}>
                                {/* <Link to= {{
                                    pathname : "/fileList",
                                    state : {
                                        subject : file.subject
                                    }
                                }} className="link_file">  */}
                                    <div className="info_file">
                                        <strong className="tit_file">
                                            <a onClick = {() => this.handleOnClick(file.subject)}>{file.subject} - {file.professor}</a>
                                        </strong>
                                        
                                    </div>
                                {/* </Link> */}
                            </li>
                        </ul>
                    ))}
                </div>
            <div>
                {this.state.subject ? <FileList subject = {this.state.subject}/> : null}
                
            </div>
            </div>
            
        )
    }
}

export default ShowFileList;