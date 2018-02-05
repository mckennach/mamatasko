import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom'

//Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';



class App extends Component{
  constructor(){
    super();
    this.state = {
      loggedIn: false
    },
    this.user = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
    }
  }

  render(){
    console.log(this.state);
    return (
      <Router>
      <div id="App">
        <Route
          exact path="/"
          render={(props) => (
            this.state.loggedIn ? (
              <Redirect to="/dashboard"/>
            ) : (
              <Login {...props} loggedIn={this.state.loggedIn}/>
            )
          )}
        />
        <Route
          path="/signup"
          render={(props) => (
            this.state.loggedIn ? (
              <Redirect to="/dashboard"/>
            ) : (
              <SignUp {...props} loggedIn={this.state.loggedIn}/>
            )
          )}
        />


        <Route

        />


      </div>
      </Router>
    );
  }
}

export default App;
