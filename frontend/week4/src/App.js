import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {Login, Register, Home, File, ViewDetail, Upload} from './routes';
import {Menu} from './components';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";


class App extends Component {
  constructor (props) {
    super(props);
  } 
  render() {
    return (
      <Router>
          <div>
            <Route exact path="/" component={Login}/>
            <Switch>
              <Route path ="/viewDetail/:filename" component = {ViewDetail}/>
              <Route path="/Menu" component= {Menu}/>
              <Route path="/upload" component= {Upload}/>
            </Switch>
          </div>
      </Router>
        
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  ...dispatch
})
export default connect(mapStateToProps, mapDispatchToProps)(App); //connect react binding from react-redux
