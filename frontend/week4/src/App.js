import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {Login, Register, Home} from './routes';
import {Switch, Route} from "react-router-dom";


class App extends Component {
  constructor (props) {
    super(props);
  } 
  render() {
    return (
      <div>
        <Route exact path="/" component={Home}/>
        <Switch>
          <Route path ="/login" component = {Login}/>
          <Route path ="/register" component = {Register}/>
        </Switch>
        
      </div>
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
