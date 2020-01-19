import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Header from '../components/header';
import FileList from '../components/FileList';

class File extends Component{
    constructor(props){
        super(props);

        this.state={
            school:'school of computing', //default school of computing
            fileList:[] //initial list is empty
        };
    }

        componentDidMount(){
        this._getList();
    }

    _getList(){
        const apiUrl='dummy/file_list.json';

        axios.get(apiUrl) /**axios.get('/filepage') */
        .then(data=> {
            //save get list to state
            this.setState({
                fileList:data.data.fileList
            });
            
            // console.log(this.state.fileList.id);
        })
        .catch(error=>{
            console.log(error);
        });
    }

    filterData = (fileList) => {
        return fileList.filter(file => (
            file.school === this.state.school
        ));
    }

    render(){ 
        return(
            <div>
                {Object.keys(this.state.fileList).length > 0 ? 
                    <FileList list= {this.filterData(this.state.fileList)}/>
                :(
                    <span>
                        LOADING..
                    </span> 
                 )}
            </div>
        )
    }
}

export default File;