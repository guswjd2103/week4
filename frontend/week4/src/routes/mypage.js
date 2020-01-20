import React, { Component } from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import update from 'react-addons-update';

class MyPage extends Component { 

    state = {
        uploadFileList : [],
        downloadFileList : []
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
            console.log(res.data.data);
            console.log(res.data.data[0]);
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
                    )
                })
            })
        })
    }

    getUserDownloadFile(username) {
        const method = "download";

        Axios.post('/routes/fileList/getUserDownloadFile', {username, method})
        .then(res => {
            const data = res.data.data;
            console.log(data);
            console.log(res.data.data[0]);

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
        console.log(this.state.uploadFileList);

        return (
            <div>
                
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
