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
        this.setState({
            selectedFile:event.target.files[0],
            loaded:0
        })
    }

    onClickHandler=()=>{
        const data=new FormData()
        data.append('file', this.state.selectedFile)

        const apiUrl='dummy/file_list.json';

        axios.post(apiUrl, data, {
            //receive two parameter endpoint url, from data
        })
        .then(res=>{//then print response status
            console.log(res.statusText)
        })
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