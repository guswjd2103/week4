import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ShowSubjectFileList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                    {this.props.list.map((file,index)=>(
                        <ul>
                            <li key={index}>
                                <Link to= {"/viewDetail/" + `${file.filename}`} className="link_file"> 
                                    <div className="info_file">
                                        <strong className="tit_file">
                                            {file.filename} - {file.subject}
                                        </strong>
                                        
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    ))}
                </div>
        )
    }
}

export default ShowSubjectFileList;