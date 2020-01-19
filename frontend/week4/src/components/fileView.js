import React from 'react';

const FileView=(props)=>{
    const file=props.file;
    return(
        <div className="wrap_file">
            <div className="info_file">
                <strong className="tit_file">{file.title}</strong>
            </div>
        </div>
    )
}

export default FileView