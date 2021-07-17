import React from 'react';
import './Forms.css';

const Signin = (props) => {
    return (
        <div className="signup">
            <div className="form-redirect">
                <div className="form-change-text">Don't an account ?</div>
                <button className="form-btn form-change-btn" onClick={props.change}>Sign Up</button>
            </div>
            <div className="form-heading">Welcome back to the Corridor!</div>
            <div className="form-subheading">Log back in</div>
            <form className="login-form">
                <div className="login-form-group">
                    <div className="login-form-subgroup">
                        <label className="input-label">Email</label>
                        <br/>
                        <input type="email" placeholder="harry@example.com" className="input-field"></input>
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

export default Signin;