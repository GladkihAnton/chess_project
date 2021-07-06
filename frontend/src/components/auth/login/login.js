import React, {Component} from "react";

import style from './login.module.css';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import request from "../../../utils/request";
import {doLogin} from "../utils";

class Login extends Component {

    constructor(props) {
        super(props);
        this.email = props.email;
        this.password = props.password;
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    render() {
        return (
            <div className={style.form}>
                <form className="form-signin" onSubmit={this.TryLogin.bind(this)}>
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input type="email"  id="email" ref={this.emailInput} className="form-control"
                           placeholder="Email address" onChange={this.updateField.bind(this)} required autoFocus />
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" id="password" ref={this.passwordInput} className="form-control"
                           placeholder="Password" onChange={this.updateField.bind(this)} required />

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
                <div>
                    <Link to="/auth/signup">{'Signup'}</Link>
                </div>
            </div>

        )
    }

    TryLogin(e) {
        e.preventDefault();
        request.post('/auth/login',
            {
                email: this.email,
                password: this.password
            },
            {}
        )
        .then((response) => {
            return response['data'];
        })
        .then((data) => {
            if ('error' in data) {
                this.showError(data['error']);
                return;
            }
            doLogin(data['access_token']);
        });
    }

    showError(error) {
        console.log(error);
    }

    updateField(element) {
        this[element.target.id] = element.target.value;
    }
}


export default connect(
    null, null
)(Login)