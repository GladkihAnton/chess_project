import React, {Component} from 'react';
import './App.module.css';
import Board from "./components/game/board/board";
import style from './App.module.css';

import {BrowserRouter} from "react-router-dom";
import {Route, Redirect} from "react-router";
import {Provider} from "react-redux/lib/alternate-renderers";
import store from "./redux/store";
import Login from "./components/profile/login/login";
import Register from "./components/profile/register/register";
import {getSessionData} from "./components/profile/session/session"
import {connect} from "react-redux";


class App extends Component {

    render() {
        console.log(this.props.isAuthenticate);
        return (
            <Provider store={store}>
                <BrowserRouter>
                    {this.props.isAuthenticate &&
                            <div className={style.main}>
                                <Route path='/game' component={() => <Board/>}/>
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
        isAuthenticate: state.profile.isAuthenticate,
    };
}

export default connect(
    mapStateToProps, null
)(App);

getSessionData(store);
