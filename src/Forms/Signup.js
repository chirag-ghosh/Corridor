import React from 'react';
import './Forms.css';

const Signup = (props) => {
    return (
        <div className="signup">
            <div className="form-redirect">
                <div className="form-change-text">Already have an account ?</div>
                <button className="form-btn form-change-btn" onClick={props.change}>Sign In</button>
            </div>
            <div className="form-heading">Welcome to the Corridor!</div>
            <div className="form-subheading">Register your account</div>
            <form className="login-form">
                <div className="login-form-group">
                    <div className="login-form-subgroup">
                        <label className="input-label">Name</label>
                        <br/>
                        <input type="name" placeholder="Type your name here" className="input-field"></input>
                    </div>
                    <br/>
                </div>
                <br/>
                <div className="login-form-group">
                    <div className="login-form-subgroup">
                        <label className="input-label">Email</label>
                        <br/>
                        <input type="email" placeholder="harry@example.com" className="input-field"></input>
                    </div>
                    <div className="login-form-subgroup">
                        <label className="input-label">Phone</label>
                        <br/>
                        <input type="number" placeholder="Enter Phone Number" className="input-field"></input>
                    </div>
                    <br/>
                </div>
                <br/>
                <div className="login-form-group">
                    <div className="login-form-subgroup">
                        <label className="input-label">Password</label>
                        <br/>
                        <input type="password" className="input-field" placeholder="6+ characters"></input>
                    </div>
                    <div className="login-form-subgroup">
                        <label className="input-label">Confirm Password</label>
                        <br/>
                        <input type="password" className="input-field" placeholder="6+ characters"></input>
                    </div>
                    <br/>
                </div>
                <br/><br/>
                <div className="login-form-group">
                    <button onClick={props.submit} className="form-btn form-submit-btn">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;