import React, { Component } from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import update from 'react-addons-update';

class MyPage extends Component { 

    state = {
        uploadFileList : [],
        downloadFileList : [],
        uploadmode : false,
        downloadLength : ''
    }

    componentDidMount() {
        this.getUserUploadFile(this.props.name);
        // this.getUserDownloadFile(this.props.name);
    }

    getUserUploadFile(username) {
        const method = "upload";
        Axios.post('/routes/fileList/getUserUploadFile', {username, method})
        .then(res => {
            const data = res.data.data;
            data.map(item => {
                this.setState({
                    uploadFileList : update(
                        this.state.uploadFileList, {
                            $push : [{
                                filename : item.filename,
                                type : item.type,
                                size : item.size
                            }]
                        }
                    ),
                })
            })

            this.setState({
                uploadmode : true
            })
        })
    }

    getUserDownloadFile(username) {
        const method = "download";

        Axios.post('/routes/fileList/getUserDownloadFile', {username, method})
        .then(res => {
            const data = res.data.data;
            data.mp(item => {
                this.setState({
                    downloadFileList : update(
                        this.state.downloadFileList, {
                            $push : [{
                                filename : item.filename,
                                type : item.type,
                                size : item.size
                            }]
                        }
                    )
                })
            })
        })
    }

    render() {

        return (
            <div>
                <div>
                    {this.state.uploadmode ? 
                        <div>
                            <div>Upload File List </div>
                            <br></br><br></br>
                            {this.state.uploadFileList.map((file,index)=>(
                            
                                <div key={index}><span><i></i>
                                <span>{file.filename}&nbsp;&nbsp;</span>
                                
                                <i></i><span>{file.type}&nbsp;&nbsp;</span>
                                <i></i><span>{file.size}</span>
                                    </span></div>
                                    
                            ))}
                        </div>
                        : null
                    }
                    
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status,
        name : state.authentication.status.name,
        department : state.authentication.status.department
    };
};
export default connect(mapStateToProps, null)(MyPage);
