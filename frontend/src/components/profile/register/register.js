import React, {Component} from "react";

import style from './register.module.css';
import {connect} from "react-redux";
import {updateField} from "../../../redux/actions/actions";
import configFile from "../../../config.json"

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

    componentDidUpdate(prevProps) {
        if (this.email !== prevProps.email) {
            this.email = prevProps.email
        }
        if (this.password !== prevProps.password) {
            this.password = prevProps.password
        }
        if (this.confirmPassword !== prevProps.confirmPassword) {
            this.confirmPassword = prevProps.confirmPassword
        }
    }

    render() {
        return (<div className={style.form}>{this.prepareForm()}</div>)
    }

    prepareForm() {
        return (
            <form className="form-signup" onSubmit={this.registerProfile.bind(this)}>
                <h2 className="form-signup-heading">Please sign in</h2>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="email" ref={this.emailInput} className="form-control"
                       value={this.props.email} onChange={this.props.updateField} placeholder="Email address" required
                       autoFocus/>
                <label htmlFor="password" className="sr-only">Password</label>
                <input type="password" id="password" ref={this.passwordInput} className="form-control"
                       value={this.props.password} onChange={this.props.updateField}
                       placeholder="Password" required/>

                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <input type="password" id="confirmPassword" ref={this.confirmPasswordInput} className="form-control"
                       value={this.props.confirmPassword} onChange={this.props.updateField}
                       placeholder="ConfirmPassword" required/>

                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
            </form>
        )
    }

    registerProfile(e) {
        e.preventDefault();
        if (this.password !== this.confirmPassword) {
            this.showError();
            return;
        }

        fetch(`${configFile.SERVER_URL}/signup`, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({email: this.email, password: this.password})
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });
    }

    showError() {
        this.passwordInput.current.classList.add('is-invalid');
        this.confirmPasswordInput.current.classList.add('is-invalid');
    }
}


function  mapStateToProps(state, ownProps) {
    return {
        email: state.profile.signup.email,
        password: state.profile.signup.password,
        confirmPassword: state.profile.signup.confirmPassword,
    };
}

const actions = {updateField}

export default connect(
    mapStateToProps, actions
)(Register)