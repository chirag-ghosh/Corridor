import corridorName from './Assets/corridorName.png';
import loginBanner from './Assets/loginBanner.png'
import defaultProfile from './Assets/defaultProfile.png'
import './App.css';
import { Component } from 'react';
import Signup from './Forms/Signup';
import Signin from './Forms/Signin';
import Post from './Post/Post';
import Lottie from 'react-lottie';
import emptyAnimationData from './Assets/emptyLottie.json';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

class App extends Component {

  state = {
    displayMode : 0, // 0 - SignUp, 1 - SignIn, 2 - Dashboard 
    currentUser : "Jarvis",
    inputMode : "Post",
    posts : [],
    tempPost : {text : "", author : "Jarvis", authorPic : defaultProfile, likes : 0, currentUserLike: 0}
  }

  defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  showNotification = (message) => {
    store.addNotification({
      content: (
        <div className="notificationDiv">{message}</div>
      ),
      type: "success",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000
      }
    });
  }

  changeForm = () => {
    var tempDisplayMode = this.state.displayMode;
    if(tempDisplayMode === 0) tempDisplayMode = 1;
    else tempDisplayMode = 0;
    this.setState({
      displayMode : tempDisplayMode
    });
  }

  formSubmit = (username) => {
    this.showNotification("Successfully signed in as " + username);
    this.setState({
      displayMode : 2,
      currentUser : username,
      tempPost : {text : "", author : username, authorPic : defaultProfile, likes : 0, currentUserLike: 0}
    });
  }

  signOut = () => {
    this.setState({
      displayMode : 0
    });
    this.showNotification("Signed out!");
  }

  inputChangeHandler = (event) => {
      const tempAuthor = this.state.tempPost.author;
      const tempAuthorPic = this.state.tempPost.authorPic;
      const tempLikes = this.state.tempPost.likes;
      const tempCurrentUserLike = this.state.tempPost.currentUserLike;
      this.setState({
        tempPost : {text : event.target.value, author : tempAuthor, authorPic : tempAuthorPic, likes : tempLikes, currentUserLike : tempCurrentUserLike}
      });
  }

  createPost = () => {
    if(this.state.tempPost.text.trim().length === 0) return;
    var tempPostsArr = [...this.state.posts];
    tempPostsArr.unshift(this.state.tempPost);
    if(this.state.inputMode === "Post") {
      this.showNotification("Post shared!");
    }
    else {
      this.showNotification("Post edited!");
    }
    this.setState({
        posts : tempPostsArr,
        inputMode : "Post",
        tempPost : {text : "", author : "Jarvis", authorPic : defaultProfile, likes : 0, currentUserLike : 0}
    });
  }

  editPost = (index) => {
    if(this.state.posts[index].author === this.state.currentUser) {
      var tempPostsArr = [...this.state.posts];
      var postToEdit = tempPostsArr[index];
      tempPostsArr.splice(index, 1);
      this.setState({
        tempPost : {...postToEdit},
        posts : tempPostsArr,
        inputMode : "Edit"
      });
    }
    else {
      this.showNotification("Post can only be edited by the creator.");
    }
  }

  deletePost = (index) => {
    if(this.state.posts[index].author === this.state.currentUser) {
      var tempPostsArr = [...this.state.posts];
      tempPostsArr.splice(index, 1);
      this.setState({
        posts : tempPostsArr
      });
      this.showNotification("Post deleted!");
    }
    else {
      this.showNotification("Post can only be deleted by the creator.");
    }
  }

  likePost = (index) => {
    console.log("Like");
    var tempCurrentUserLike = this.state.posts[index].currentUserLike;
    var tempAllPosts = [...this.state.posts];
    var postToEdit = {...this.state.posts[index]};
    var add;
    if(tempCurrentUserLike === 1) {
      add = -1;
      tempCurrentUserLike = 0;
    }
    else {
      add = 1 - tempCurrentUserLike;
      tempCurrentUserLike = 1;
    }
    postToEdit.currentUserLike = tempCurrentUserLike;
    postToEdit.likes += add;
    tempAllPosts[index] = postToEdit;
    this.setState({
      posts : tempAllPosts
    });
  }

  dislikePost = (index) => {
    console.log("Dislike");
    var tempCurrentUserLike = this.state.posts[index].currentUserLike;
    var tempAllPosts = [...this.state.posts];
    var postToEdit = {...this.state.posts[index]};
    var add;
    if(tempCurrentUserLike === -1) {
      add = 1;
      tempCurrentUserLike = 0;
    }
    else {
      add = -1 - tempCurrentUserLike;
      tempCurrentUserLike = -1;
    }
    postToEdit.currentUserLike = tempCurrentUserLike;
    postToEdit.likes += add;
    tempAllPosts[index] = postToEdit;
    this.setState({
      posts : tempAllPosts
    });
  }


  render () {

    var loginPageDiv = null;
    var loginForm = null;
    var dashboardPageDiv = null;
    var lottieDiv = null;

    if(this.state.posts.length === 0) {
      lottieDiv = (
        <div className="lottie-div">
              <Lottie
                options={this.defaultLottieOptions}
                height={400}
                width={400}
              ></Lottie>
              <div className="emptyText">Your timeline looks empty! Create a post to start....</div>
            </div>
      );
    }

    if(this.state.displayMode === 0) {
      loginForm = (
        <Signup notify={message => this.showNotification(message)} change={this.changeForm} submit={(username) => this.formSubmit(username)}></Signup>
      );
    }
    else {
      loginForm = (
        <Signin notify={message => this.showNotification(message)} change={this.changeForm} submit={(username) => this.formSubmit(username)}></Signin>
      );
    }

    if(this.state.displayMode  !== 2) {
      loginPageDiv = (
        <div className="loginPageBackground">
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
        </div>
      );
    }
    else {
      dashboardPageDiv = (
          <div className="dashboardPageDiv">
            <div className="header">
              <img src={corridorName} className="corridorName" alt="corridorName"></img>
              <div className="currentUserDiv">
                <div className="author-div">
                  <img src={defaultProfile} className="author-pic" alt="ProPic"></img>
                  <div className="author-name">{this.state.currentUser}</div>
                </div>
                <button className="form-btn sign-out-btn" onClick={this.signOut}>Sign Out</button>
              </div>
            </div>
            <div className="createPostDiv">
              <input type="text" className="createPostInput" value={this.state.tempPost.text} onChange={(event) => {this.inputChangeHandler(event)}} required></input>
              <button className="createPostButton" onClick={this.createPost}>{this.state.inputMode}</button>
            </div>
            {lottieDiv}
            <div className="timeline-div">
              {this.state.posts.map((post, index) => {
                return (
                    <Post
                      text={post.text}
                      authorName={post.author}
                      authorPic={post.authorPic}
                      likesCount={post.likes}
                      edit={this.editPost.bind(this, index)}
                      delete={this.deletePost.bind(this, index)}
                      like={this.likePost.bind(this, index)}
                      dislike={this.dislikePost.bind(this, index)}
                      currentUserLike={post.currentUserLike}
                    ></Post>
                );
              })}
            </div>
          </div>
      );
    }

    return (
      <div className="App">
        <ReactNotification/>
        {loginPageDiv}
        {dashboardPageDiv}
      </div>
    );
  }
}

export default App;
