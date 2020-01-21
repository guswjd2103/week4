import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FileList from '../routes/fileList';
import {Button} from 'semantic-ui-react';
import '../file.css';
import $ from 'jquery';
import '../file.scss'

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
                <div class='file-container'>
                    <div class='sidebar'>
                        {this.props.list.map((file,index)=>(
                            
                                    <div class='navigation-elm' key={index}><span class='nav-text'><i class="fa fa-fw fa-area-chart"></i>
                                    <span class='text-short' onClick={()=>this.handleOnClick(file.subject)}>{file.subject}</span>
                                    <div></div>
                                    <i class="fa fa-fw fa-area-chart"></i><span class='text-long'>{file.professor}</span>
                                        </span></div>
                        ))}
                    </div>
                </div>
                
                <div class="card">
                    <div class="card__header">
                    <div id="lineB-ChartExample"></div>
                    </div>
                    <div class="card__body">
                    <h4>Daily Sales</h4>
                    <p>Lorem ipsum dolor sit.</p>
                    </div>
                    <div class="card__footer">
                    <i class="material-icons">update</i><a href="">Updated 4mins ago</a>
                    </div>
                </div>


                <div>
                    {this.state.subject ? <FileList subject = {this.state.subject}/> : null}
                </div>
            </div>
            
        )
    }
}

export default ShowFileList;