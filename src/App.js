import logo from './Assets/logo.svg';
import loginBanner from './Assets/loginBanner.png'
import './App.css';
import { Component } from 'react';
import Signup from './Forms/Signup';
import Signin from './Forms/Signin';

class App extends Component {

  state = {
    displayMode : 0 // 0 - SignUp, 1 - SignIn, 2 - Dashboard 
  }

  changeForm = () => {
    var tempDisplayMode = this.state.displayMode;
    if(tempDisplayMode === 0) tempDisplayMode = 1;
    else tempDisplayMode = 0;
    this.setState({
      displayMode : tempDisplayMode
    });
  }

  formSubmit = (event) => {
    event.preventDefault();
  }


  render () {

    var loginPageDiv = null;
    var loginForm = null;

    if(this.state.displayMode === 0) {
      loginForm = (
        <Signup change={this.changeForm} submit={(event) => this.formSubmit(event)}></Signup>
      );
    }
    else {
      loginForm = (
        <Signin change={this.changeForm} submit={(event) => this.formSubmit(event)}></Signin>
      );
    }

    loginPageDiv = (
      <div className="loginPageDiv">
        <div className="bannerArea">
          <img src={logo} className="logo" alt="app logo"></img>
          <div className="AppTitle">&nbsp;orridor</div>
          <div className="loginBannerDiv">
            <img src={loginBanner} className="loginBanner" alt="login banner"></img>
          </div>
        </div>
        <div className="formArea">
          {loginForm}
        </div>
      </div>
    );

    return (
      <div className="App">
        {loginPageDiv}
      </div>
    );
  }
}

export default App;
