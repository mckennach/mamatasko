import React, { Component } from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'



const SignUpName = ({createAccount}) => {
  let firstName; let lastName; let email; let password;
  let newUser;
  return(
    <form
      className="signup-form"
      id="signup-name-form"
      onSubmit={(e)=> {
        e.preventDefault();
        newUser = {
          name: firstName.value + ' ' + lastName.value,
          email: email.value,
          password: password.value
        }
        createAccount(newUser);
      }}>
      <h1 className="gradient-text">sign up!</h1>

      <input
        ref={node => {firstName = node;}}
        placeholder="First name"
        className="login-input"
        id="signup-fname"
        type="text" required/>
      <input
        ref={node => {lastName = node;}}
        placeholder="Last name"
        className="login-input"
        id="signup-lname"
        type="text" required/>
      <input
        ref={node => {email = node;}}
        placeholder="Email"
        className="login-input"
        id="signup-email"
        type="email" required/>
      <input
        ref={node => {password = node;}}
        placeholder="Password"
        className="login-input"
        id="signup-password"
        type="password" required/>


      <input value="Create Account" className="login-submit" type="submit"/>

    </form>
  );
}







export default class SignUp extends Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      loggedIn: false,
      newUser: false,
      users: [],
    };

    this.apiUrl = '//5a65519cacd74f00128c6041.mockapi.io/users'
  }

  componentDidMount() {
    axios.get(this.apiUrl)
      .then((res) => {
        this.setState({users:res.data});
      });
  }

  createAccount(newUser){
    var validUser = true;
    let users = this.state.users;
    users.forEach((user) => {
      if(user.email === newUser.email){
        alert('There is already an account attached to this email');
        validUser = false;
      }
    });



    if(validUser){
      axios.post(this.apiUrl, newUser)
         .then((res) => {
            this.state.users.push(res.data);
            this.setState({users: this.state.users});
         });

    }



  }




  render(){
        console.log(this.state)

        return (
          <div className="page-wrapper" id="sign-up">
            <SignUpName createAccount={this.createAccount.bind(this)}/>
          </div>
        );



  }
}
