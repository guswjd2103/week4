import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Header from '../components/header';
import FileList from '../components/FileList';

console.log('file');
class File extends Component{

    render() {
        console.log('inside');
        return (
            <div>
                <Header />
            </div>
        )
    }

    // state={
    //     school:'school of computing', //default school of computing
    //     fileList:[] //initial list is empty
    // }
    
    // _getList(){
    //     console.log("get file");
        //get file list
        // const apiUrl='dummy/file_list.json';

        // axios.get(apiUrl) /**axios.get('/filepage') */
        // .then(data=> {
        //     //save get list to state
        //     this.setState({
        //         fileList:data.data.fileList    
        //     });
        //     console.log("set filelist");
        // })
        // .catch(error=>{
        //     console.log(error);
        // });
    // }

    // componentDidMount(){
    //     console.log("file component");
    //     this._getList();
    // }

    // render(){
    //     console.log("hi");
    //     return(
    //         <div>
    //             <Header/>
    //             {/* {this.state.fileList.length>0 ? (
    //                 <FileList list={
    //                     this.state.fileList.filter(file=> (
    //                         file.school===this.state.school 
    //                     ))
    //                 }/>
    //             ):(
    //                 <span>
    //                     LOADING..
    //                 </span> */}
    //             {/* )} */}
    //         </div>
    //     )
    // }
}


export default connect(null, null)(File);