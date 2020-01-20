import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../login.css';
import $ from 'jquery';
import { connect } from 'react-redux';
import '../../spinner.scss'
 
class Authentication extends Component {
    state = {
      email:"",
      password:"",
      name : "",
      mode : true
    }

    handleSpinner=()=>{
        this.preventDefault();
        this.stopPropagation();
        $(this).toggleClass('expanded');
        $('#'+$(this.target).attr('for')).prop('checked',true);
    }

    // $(document).click(function() {
    // $('.dropdown-el').removeClass('expanded');
    // });


    handleRight = () => {
        $("#left").removeClass("left_hover");
        $(".login-s2class").css({ color: "#EE9BA3" });
        $(".login-s1class").css({ color: "#748194" });
        $("#right").addClass("right_hover");
        this.setState({
            mode : false
        })
    }
     
    handleLeft = () => {
        $(".login-s1class").css({ color: "#EE9BA3" });
        $(".login-s2class").css({ color: "#748194" });
        $("#right").removeClass("right_hover");
        $("#left").addClass("left_hover");
        this.setState({
            mode : true
        })
    }
    
    handle = () => {
        $(".login-s1class").css({ color: "#EE9BA3" });
        $(".login-s2class").css({ color: "#748194" });
        $("#right").removeClass("right_hover");
        $("#left").addClass("left_hover");
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
        
        console.log('authentication');
        const inputBoxes = (
            <div>
                <form class="signin">
                    <h1 class="signup1">SIGN IN</h1>
                    <br></br><br></br>
                    <input
                    name="email"
                    type="text"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.email}
                    onKeyPress={this.handleKeyPress}
                    placeholder="email*"/>
                    <input
                    name="password"
                    type="password"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.password}
                    onKeyPress={this.handleKeyPress}
                    placeholder="password*"/>
                </form>
            </div>
        );

        const inputBoxes2 = (
            <div>
                <form class="signup">
                    <h1 class="signup1">SIGN UP</h1>
                    <br></br><br></br>
                    <input
                    name="email"
                    type="text"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.email}
                    onKeyPress={this.handleKeyPress}
                    placeholder="email*"/>
                    <input
                    name="password"
                    type="password"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.password}
                    onKeyPress={this.handleKeyPress}
                    placeholder="password*"/>
                    <input
                    name="name"
                    type="text"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.name}
                    onKeyPress={this.handleKeyPress}
                    placeholder="name*"/>
                    <span class="dropdown-el" onClick={this.handleSpinner}></span>
                    {/* <input
                    name="department"
                    type="text"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.department}
                    onKeyPress={this.handleKeyPress}
                    placeholder="department*"/> */}
                </form>
            </div>
        );
 
        const loginView = (
            
                
            <div class="login-c2">
                {inputBoxes}
                <a class="btn1"
                    onClick={this.handleLogin}>Get Started</a>
            </div>
            
            
        );
 
        const registerView = (
            
                <div class="login-c2">
                    {inputBoxes2}
                    <a class="btn2"
                      onClick={this.handleRegister}>Sign Up</a>
                </div>
            
        );
        
        $(document).ready(function() {
            $(".login-container").fadeIn(0);
         });
         
        return (
        <div class="login-container">
            <div class="login-c1">
            <div class="c11">
                <h1 class="mainhead">MADCAMP</h1>
                <p class="mainp">STUDY and MONEY</p>
            </div>
                    <div id="left" onClick = {this.handleLeft}><h1 class="login-s1class"><span>SIGN</span><span class="su">IN</span></h1></div>
                    <div id="right" onClick = {this.handleRight}> <h1 class="login-s2class"><span>SIGN</span><span class="su">UP</span></h1></div>    
            </div>
                {this.state.mode ? loginView : registerView }

        </div>
        );  
    }
}
 
Authentication.propTypes = {
    mode: PropTypes.bool,
    onRegister: PropTypes.func,
};
 
Authentication.defaultProps = {
    mode: true,
    onRegister: (id, pw, name, department) => { console.error("register function is not defined"); },
    onLogin: (id, pw) => { console.error("login function not defined"); }
};
 
const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status,
        name : state.authentication.status.name,
        department : state.authentication.status.department
    };
};

export default connect(mapStateToProps, null)(Authentication);
