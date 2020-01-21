import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'; 
import Axios from 'axios';

class FileView extends Component {

    handleDownload= (filename) => {
        fetch('/routes/fileList/download/', {params : {name : filename}})
        .then(res => {
            res.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
            })
        })
        // Axios.get('/routes/fileList/download/', {params : {name : filename}})
        // .then(res => {
        //     console.log('download success');
        //     // window.open("http://localhost:8000/routes/fileList/download?" + filename);
        //     alert('success');
        // }).catch(err => alert('실패'))
    }

    render() {
        const subject = this.props.subject;
        const producer = this.props.producer;
        const illustration = this.props.illustration;
        const filename = this.props.filename;

        return(
            <div class="middle-container my-container">
                    <div class="profile my-block">
                        <br></br><br></br>
                        <h1 class="my-user-name"><font color="#fff">{filename}</font></h1>
                    <div class="profile-description">
                        <p class="scnd-font-color"><font color="#fff">subject: {subject}</font></p>
                        <p class="scnd-font-color"><font color="#fff">producer : {producer}</font></p>
                        <p class="scnd-font-color"><font color="#fff">illustration : {illustration}</font></p>
                    </div>
                    <a class="bt3" onClick = {() => this.handleDownload(filename)}>Download File</a>
                    </div>
                </div>
        )
    }
    
}

export default FileView