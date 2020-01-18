import React, { Component } from 'react';
import Header from '../components/header';

class Home extends Component {

    render(){
      /* Check whether current route is login or register using regex */
      let re = /(login|register)/;
      let isAuth = re.test(this.props.location.pathname);
 
      return (
        <div>
          {isAuth ? undefined : <Header/>}
        </div>
      );
    }
}
 
export default Home;
