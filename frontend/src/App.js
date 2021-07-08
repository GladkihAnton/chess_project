import React, {Component} from 'react';
import './App.module.css';
import Board from "./components/dashboard/game/board/board";
import style from './App.module.css';

import {BrowserRouter} from "react-router-dom";
import {Route, Redirect} from "react-router";
import {Provider} from "react-redux/lib/alternate-renderers";
import store from "./redux/store";
import Login from "./components/auth/login/login";
import Register from "./components/auth/register/register";
import {getSessionData} from "./components/auth/session/session"
import {connect} from "react-redux";
import {doLogout} from "./components/auth/utils";
import Dashboard from "./components/dashboard/dashboard/dashboard";


class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    {this.props.isAuthenticate &&
                            <div className={style.main}>
                                <a href='#' onClick={doLogout}>Logout</a>
                                <Route path='/game' component={() => <Board/>}/>
                                <Route path='/dashboard' component={() => <Dashboard/>}/>
                                <Route path='*' component={() => <Redirect to="/dashboard"/>}/>
                                {/*<Route exact path='/auth/login' component={() => <Login/>}/>*/}
                                {/*<Route path='/signup' render={() => true ? (<Redirect to="/"/> ) : (<Register/>)}/>*/}
                            </div>
                    }
                    {!this.props.isAuthenticate &&
                        <div>
                            <Route path='/auth/login' component={() => <Login/>}/>
                            <Route path='/auth/signup' component={() => <Register/>}/>
                            <Route path='*' component={() => <Redirect to="/auth/login"/>}/>
                        </div>
                    }
                </BrowserRouter>
            </Provider>
        );
    }
}

function  mapStateToProps(state, ownProps) {
    return {
        isAuthenticate: state.auth.isAuthenticate,
    };
}

export default connect(
    mapStateToProps, null
)(App);

getSessionData(store);
