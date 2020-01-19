import React, {Component} from 'react';
import axios from 'axios';

class Upload extends Component{
    constructor(props){
        super(props);

        this.state={
            selectedFile:null
        }
    }

    onChangeHandler=event=>{
        console.log(event.target.files[0]);
        this.setState({
            selectedFile:event.target.files[0],
            loaded:0
        })
    }

    onClickHandler=()=>{
        // const apiUrl='dummy/file_list.json';
        const apiUrl='/routes/fileList/uploadFile';
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);

        axios.post(apiUrl, formData)
        .then(res => {
            alert('success');
        }).catch (err => alert('실패')) 
    }

    render(){
        return(
            <div class="container">
                <div class="row">
                    <div class="form-group files">
                        <label>Upload Your File</label>
                        <input type="file" name="file" onChange={this.onChangeHandler}></input>
                    </div>
                    <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
                </div>
            </div>
        )
    }
}

export default Upload;