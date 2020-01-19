import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ShowSubjectFileList extends Component {
    render() {
        return (
            <div>
                    {this.props.list.map((file,index)=>(
                        <ul>
                            <li key={index}>
                                <Link to= {{
                                    pathname : "/viewDetail",
                                    state : {
                                        subject : file.subject
                                    }
                                }} className="link_file"> 
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