import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'semantic-ui-react'; 
import {Upload, File, MyPage} from '../routes';
import '../header.css';

class Header extends Component {
    state = {
      fileonClick : true,
      uploadonClick : false,
      mypageonClick : false
    }

    handleUploadClick = () => {
      this.setState({
        uploadonClick : true,
        fileonClick : false,
        mypageonClick : false
      })
    }

    handleFileClick = () => {
      this.setState({
        uploadonClick : false,
        fileonClick : true,
        mypageonClick : false
      })
    }

    handleMyPageClick = () => {
      this.setState({
        uploadonClick : false,
        fileonClick : false,
        mypageonClick : true
      })
    }

    render() {
      return (
        <div>
          <div>
              <nav class="header-navigation" id="header-navigation">
                  <div class="header-container">
                      <div class="header-logo">MadCamp</div>
                      <u1 class="header-navigation-links">
                          <li class="active"><a onClick = {this.handleFileClick}>Files</a></li>
                          <li><a onClick = {this.handleUploadClick}>Upload</a></li>
                          <li><a onClick = {this.handleMyPageClick}>MyPage</a></li>
                      </u1>
                  </div>
              </nav>
          </div>
          <div>
              {this.state.fileonClick ? <File /> : null}
              {this.state.uploadonClick ? <Upload /> : null}
              {this.state.mypageonClick ? <MyPage /> : null}
          </div>
        </div>
        
      );
    }
}
 
export default Header;
