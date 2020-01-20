import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'semantic-ui-react'; 
import '../header.css';

class Header extends Component {
    constructor (props) {
        super(props);
      }

    render() {
      return (
        <div>
            <nav class="header-navigation" id="header-navigation">
                <div class="header-container">
                    <div class="header-logo">MadCamp</div>
                    <u1 class="header-navigation-links">
                        <li class="active">Files</li>
                        <li>Upload</li>
                        <li>MyPage</li>
                    </u1>
                </div>
            </nav>
        </div>
      );
    }
}
 
export default Header;