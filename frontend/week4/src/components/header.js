import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'semantic-ui-react'; 
import '../style.css';

class Header extends Component {

    render() {console.log("header");
      const loginButton = (
          <Button><Link to="/login">로그인하기</Link></Button>
      );

      return (
        <div className="container auth">
            <Link className="logo" to="/">MadCamp</Link>
            <div className="card">
                <div className="header blue white-text center">
                    { loginButton }
                </div>
                
            </div>
        </div>
      );
    }
}
 
export default Header;
