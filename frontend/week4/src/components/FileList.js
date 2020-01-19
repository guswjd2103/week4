import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { render } from '@testing-library/react';

class FileList extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        

        return(
        
            <u1 className="list_file">
                {this.props.list.map((file,index)=>(
                    <li key={index}>
                        <Link to= {"/viewDetail/" + `${file.title}`} className="link_file"> 
                            <div className="info_file">
                                <strong className="tit_file">
                                    {file.title}
                                </strong>
                                {file.producer}
                                {file.illustration}
                            </div>
                        </Link>
                    </li>
                ))}
            </u1>
        )
    }
}

export default FileList;