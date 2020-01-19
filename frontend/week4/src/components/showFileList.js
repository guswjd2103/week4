import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ShowFileList extends Component {
    render() {
        console.log(this.props.list);
        return (
            <div>
                {this.props.list.map((file,index)=>(
                    <ul>
                        <li key={index}>
                            <Link to= {"/viewDetail/" + `${file.subject}`} className="link_file"> 
                                <div className="info_file">
                                    <strong className="tit_file">
                                        {file.subject}
                                    </strong>
                                    {file.producer}
                                </div>
                            </Link>
                        </li>
                    </ul>
                ))}
            </div>
        )
    }
}

export default ShowFileList;