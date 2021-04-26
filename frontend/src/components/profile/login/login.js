import React, {Component} from "react";

import style from './login.module.css';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Login extends Component {

    render() {
        return (
            <div className={style.form}>
                <form className="form-signin">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <label for="email" className="sr-only">Email address</label>
                    <input type="email"  id="email" className="form-control" placeholder="Email address" required autofocus />
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="password" className="form-control" placeholder="Password" required />

                    <button className="btn btn-lg btn-primary btn-block" type="button">Sign in</button>
                </form>
                <div>
                    <Link to="/signup">{'Signup'}</Link>
                </div>
            </div>

        )
    }
}

function  mapStateToProps(state, ownProps) {
    return {
        board: state.game.board,
        moves: state.game.moves,
        chosenPiece: state.game.chosenPiece
    };
}

export default connect(
    mapStateToProps, null
)(Login)