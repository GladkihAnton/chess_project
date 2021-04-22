import React from 'react';
import './App.module.css';
import Board from "./components/board/board";
import style from './App.module.css';

import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import {Provider} from "react-redux/lib/alternate-renderers";
import store from "./redux/store";


function App() {
    return (
        <Provider store={store}>
            <BrowserRouter >
                <div className={style.main}>
                    <Route path='/' component={() => <Board/>}/>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
