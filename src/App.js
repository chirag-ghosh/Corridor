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
    this.setState({
        posts : tempPostsArr,
        inputMode : "Post",
        tempPost : {text : "", author : "Jarvis", authorPic : defaultProfile, likes : 0, currentUserLike : 0}
    });
  }

  editPost = (index) => {
    console.log("Edit");
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
  }

  deletePost = (index) => {
    console.log(this.state.posts[index]);
    if(this.state.posts[index].author === this.state.currentUser) {
      var tempPostsArr = [...this.state.posts];
      tempPostsArr.splice(index, 1);
      this.setState({
        posts : tempPostsArr
      });
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
        {loginPageDiv}
        {dashboardPageDiv}
      </div>
    );
  }
}

export default App;
