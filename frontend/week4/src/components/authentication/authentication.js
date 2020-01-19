import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../style.css';  
 
class Authentication extends Component {
    state = {
      email:"",
      password:"",
      name : ""
    }
   
    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
 
    handleRegister = () => {
        let id = this.state.email;
        let pw = this.state.password;
        let name = this.state.name;
        let department = this.state.department;
 
        this.props.onRegister(id, pw, name, department).then(
            (result) => {
                if(!result) {
                    this.setState({
                        email: '',
                        password: '',
                        name : '',
                        department : ''
                    });
                }
            }
        );
    }
 
    handleLogin = () => {
        let id = this.state.email;
        let pw = this.state.password;
 
        this.props.onLogin(id, pw).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    handleKeyPress = (e) => {
        if(e.charCode===13) {
            if(this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }
 
    render() {
        const inputBoxes = (
            <div>
                <div className="input-field col s12 username">
                    <label>Email</label>
                    <input
                    name="email"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.email}
                    onKeyPress={this.handleKeyPress}/>
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                    name="password"
                    type="password"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.password}
                    onKeyPress={this.handleKeyPress}/>
                </div>
            </div>
        );

        const inputBoxes2 = (
            <div>
                <div className="input-field col s12 username">
                    <label>Email</label>
                    <input
                    name="email"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.email}
                    onKeyPress={this.handleKeyPress}/>
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                    name="password"
                    type="password"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.password}
                    onKeyPress={this.handleKeyPress}/>
                </div>
                <div className="input-field col s12">
                    <label>NickName</label>
                    <input
                    name="name"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.name}
                    onKeyPress={this.handleKeyPress}/>
                </div>
                <div className="input-field col s12">
                    <label>Department</label>
                    <input
                    name="department"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.department}
                    onKeyPress={this.handleKeyPress}/>
                </div>
            </div>
        );
 
        const loginView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        {inputBoxes}
                        <a className="waves-effect waves-light btn"
                          onClick={this.handleLogin}>SUBMIT</a>
                    </div>
                </div>
 
 
                <div className="footer">
                    <div className="card-content">
                        <div className="right" >
                        New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>
 
            </div>
        );
 
        const registerView = (
            <div className="card-content">
                <div className="row">
                    {inputBoxes2}
                    <a className="waves-effect waves-light btn"
                      onClick={this.handleRegister}>CREATE</a>
                </div>
            </div>
        );
        return (
          <div className="container auth">
              <Link className="logo" to="/">MadCamp</Link>
              <div className="card">
                  <div className="header blue white-text center">
                      <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                  </div>
                  {this.props.mode ? loginView : registerView }
              </div>
          </div>
        );
    }
}
 
Authentication.propTypes = {
    mode: PropTypes.bool,
    onRegister: PropTypes.func,
    onLogin: PropTypes.func
};
 
Authentication.defaultProps = {
    mode: true,
    onRegister: (id, pw, name, department) => { console.error("register function is not defined"); },
    onLogin: (id, pw) => { console.error("login function not defined"); }
};
 
export default Authentication;
