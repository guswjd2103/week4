import React from 'react';

const FileView=(props)=>{
    const subject = props.subject;
    const producer = props.producer;
    const illustration = props.illustration;
    const filename = props.filename;
    console.log('fileview comp');
    return(
        <div>
            <strong>{filename}</strong>
            <div>
                subject : {subject}
            </div>
            <div>
                producer : {producer}
            </div>
            <div>
                illustration : {illustration}
            </div>
        </div>
    )
}

export default FileView