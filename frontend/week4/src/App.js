import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {Login, Register, Home, File, ViewDetail} from './routes';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";


class App extends Component {
  constructor (props) {
    super(props);
  } 
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          
            <Route path ="/login" component = {Login}/>
            <Route path ="/register" component = {Register}/>
            <Route path ="/viewDetail/:fileId" component = {ViewDetail}/>
            <Route path="/file" component={File}/>
          
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
