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
            <div class='file-container'>
                <div class='sidebar'>
                    {this.props.list.map((file,index)=>(
                        <ul>
                            <li key={index}>
                                <div class='navigation-elm'><span class='nav-text'><i class="fa fa-fw fa-area-chart"></i>
                                <span class='text-short' onClick={()=>this.handleOnClick(file.subject)}>{file.subject}</span>
                                <span class='text-long'>{file.professor}</span>
                                    </span></div>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
            // <div>
            //     {this.state.subject ? <FileList subject = {this.state.subject}/> : null}
            // </div>
        )
    }
}

export default ShowFileList;