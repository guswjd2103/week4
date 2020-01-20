import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'; 
import Axios from 'axios';

class FileView extends Component {

    handleDownload= (filename) => {
        Axios.get('/routes/fileList/download/', {params : {name : filename}})
        .then(res => {
            console.log('download success');
            alert('success');
        }).catch(err => alert('실패'))
    }

    render() {
        const subject = this.props.subject;
        const producer = this.props.producer;
        const illustration = this.props.illustration;
        const filename = this.props.filename;

        return(
            <div>
                <strong>{filename}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                <Button onClick = {() => this.handleDownload(filename)}>Download</Button>
                <div>
                    subject : {subject}
                </div>
                <div>
                    producer : {producer}
                </div>
                <div>
                    illustration : {illustration}
                </div>
            </div>
        )
    }
    
}

export default FileView