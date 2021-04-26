import React from 'react';
import './App.module.css';
import Board from "./components/game/board/board";
import style from './App.module.css';

import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import {Provider} from "react-redux/lib/alternate-renderers";
import store from "./redux/store";
import Login from "./components/profile/login/login";
import Register from "./components/profile/register/register";



function App() {
    return (
        <Provider store={store}>
            <BrowserRouter >
                <div className={style.main}>
                    <Route path='/game' component={() => <Board/>}/>
                    <Route exact path='/' component={() => <Login/>}/>
                    <Route path='/signup' component={() => <Register/>}/>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
