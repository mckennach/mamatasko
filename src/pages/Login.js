import React, { Component } from 'react';
import axios from 'axios';
import SignUp from './SignUp';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom'


const LoginForm = ({validateUser}) => {
  let username; let password;
  return(
    <form
      id="login-form"
      onSubmit={(e)=>{
        e.preventDefault();
        validateUser(username.value, password.value)
      }}>
      <h1 className="gradient-text">mama tasko</h1>
      <input
        ref={node => {username = node;}}
        placeholder="Username or email"
        className="login-input"
        id="login-username"
        type="text" required/>
      <input
        ref={node => {password = node;}}
        placeholder="password"
        className="login-input"
        id="login-password"
        type="password" required/>
      <span id="error-message"></span>
      <input value="Login" className="login-submit" type="submit"/>
      <label>
        <input className="input-check" type="checkbox" checked="checked"/>
        Remember me
      </label>
      <div id="login-footer">
        <NavLink to="/signup"><button className="login-btn" id="signup-btn">Sign Up</button></NavLink>
        <button className="login-btn" id="forgot-account-btn">Forgot username/password?</button>
      </div>
    </form>
  );
}



export default class Login extends Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [],
      validUser: false,
      loggedIn: this.props.loggedIn
    };
    this.apiUrl = '//5a65519cacd74f00128c6041.mockapi.io/users'
  }

  componentDidMount() {
    axios.get(this.apiUrl)
      .then((res) => {
        this.setState({data:res.data});
      });
  }

  validateUser(username, password){
    let data = this.state.data;
    let error = 'Username not found';
    let textNode;
    var validUser = false;
    document.getElementById('error-message').innerHTML = ""
    data.some((user) => {
      console.log(username);
      console.log(user.email)
      if(user.email === username){
        if(user.password === password){
          validUser = true;
          return;
        } else {
          error = "Incorrect Password"
        }
      }
    });

    if(validUser){
      alert('Valid!');

    } else {
      textNode = document.createTextNode(error);

      document.getElementById('error-message').appendChild(textNode);
    }

  }

  render(){
    console.log(this.state);
    return (

        <div className="page-wrapper" id="login">

          <LoginForm validateUser={this.validateUser.bind(this)}/>


        </div>

    );
  }
}
