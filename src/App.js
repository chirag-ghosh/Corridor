import corridorName from './Assets/corridorName.png';
import loginBanner from './Assets/loginBanner.png'
import './App.css';
import { Component } from 'react';
import Signup from './Forms/Signup';
import Signin from './Forms/Signin';

class App extends Component {

  state = {
    displayMode : 2 // 0 - SignUp, 1 - SignIn, 2 - Dashboard 
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
    this.setState({
      displayMode : 2
    });
  }

  signOut = () => {
    this.setState({
      displayMode : 0
    });
  }


  render () {

    var loginPageDiv = null;
    var loginForm = null;
    var dashboardPageDiv = null;

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

    if(this.state.displayMode  !== 2) {
      loginPageDiv = (
        <div className="loginPageDiv">
          <div className="bannerArea">
            <img src={corridorName} className="corridorName" alt="corridorName"></img>
            <div className="loginBannerDiv">
              <img src={loginBanner} className="loginBanner" alt="login banner"></img>
            </div>
          </div>
          <div className="formArea">
            {loginForm}
          </div>
        </div>
      );
    }
    else {
      dashboardPageDiv = (
          <div className="dashboardPageDiv">
            <div className="header">
              <img src={corridorName} className="corridorName" alt="corridorName"></img>
              <button className="form-btn sign-out-btn" onClick={this.signOut}>Sign Out</button>
            </div>
            <div className="createPostDiv">
              <input type="text" className="createPostInput" required></input>
              <button className="createPostButton">Post</button>
            </div>
          </div>
      );
    }

    return (
      <div className="App">
        {loginPageDiv}
        {dashboardPageDiv}
      </div>
    );
  }
}

export default App;
