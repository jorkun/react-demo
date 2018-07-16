import React, { Component } from "react";
import LoginForm from "./form.jsx";
import "./index.scss";

export default class Login extends Component {
    render() {
        return (
            <div className="pg-login">
                <section className="left">
                    <div className="footer">2007~2017© XXXXXxxxx. All Rights Reserved.</div>
                </section>
                <section className="right">
                    <div className="login-form">
                        <i className="logo"></i>
                        <LoginForm />
                    </div>
                </section>
            </div>
        );
    }
}