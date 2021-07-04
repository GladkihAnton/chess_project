import React, {Component} from "react";

import style from './register.module.css';
import {connect} from "react-redux";
import configFile from "../../../config.json"
import axios from "axios";
import request from "../../../utils/request";

class Register extends Component {

    constructor(props) {
        super(props);
        this.email = props.email;
        this.password = props.password;
        this.confirmPassword = props.confirmPassword;
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.confirmPasswordInput = React.createRef();
    }

    render() {
        return (<div className={style.form}>{this.prepareForm()}</div>)
    }

    prepareForm() {
        return (
            <form className="form-signup" onSubmit={this.registerProfile.bind(this)}>
                <h2 className="form-signup-heading">Please sign up</h2>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="email" ref={this.emailInput} className="form-control"
                       value={this.email} onChange={this.updateField.bind(this)} placeholder="Email address" required
                       autoFocus/>
                <div className={style.user_already_exist_tip}>Пользователя с такой почтой уже существует</div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input type="password" id="password" ref={this.passwordInput} className="form-control"
                       value={this.password} onChange={this.updateField.bind(this)}
                       placeholder="Password" required/>
                <div className={style.passwords_dont_match_tip}>Пароли не совпадают</div>
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <input type="password" id="confirmPassword" ref={this.confirmPasswordInput} className="form-control"
                       value={this.confirmPassword} onChange={this.updateField.bind(this)}
                       placeholder="ConfirmPassword" required/>

                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
            </form>
        )
    }

    registerProfile(e) {
        e.preventDefault();
        this.clearError();
        if (this.password !== this.confirmPassword) {
            this.showError('passwords_dont_match');
            return;
        }

        request.post('/auth/signup',
            {
                body: JSON.stringify({email: this.email, password: this.password})
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
            localStorage.setItem('expiresAt', this.parseJwt(data['access_token'])['exp']);
            localStorage.setItem('accessToken', data['access_token']);
        });
    }

    updateField(element) {
        this[element.target.id] = element.target.value;
    }

    showError(error) {
        switch (error) {
            case 'passwords_dont_match':
                this.passwordInput.current.classList.add(style.passwords_dont_match, 'is-invalid');
                this.confirmPasswordInput.current.classList.add('is-invalid');
                break;
            case 'user_already_exist':
                this.emailInput.current.classList.add(style.user_already_exist, 'is-invalid');
                break;
        }
    }

    clearError() {
        const classes = [style.passwords_dont_match, style.user_already_exist, 'is-invalid'];

        this.passwordInput.current.classList.remove(...classes);
        this.confirmPasswordInput.current.classList.remove(...classes);
        this.emailInput.current.classList.remove(...classes);
    }

    parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
}

export default connect(
    null, null
)(Register)