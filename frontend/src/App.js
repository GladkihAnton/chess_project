import React from 'react';
import './App.module.css';
import Board from "./components/board/board";
import style from './App.module.css';

import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import store from "./redux/store";
import {connect} from "react-redux";
import Cell from "./components/cell/cell";


function App(props) {
    console.log(props);
    return (
            <BrowserRouter >
                <div className={style.main}>
                    <Route path='/' component={() => <Board board={props.board} dispatch={store.dispatch}/>}/>
                </div>
            </BrowserRouter>
    );
}


const mapStateToProps = state => ({
    'board': state.board,
    'moves': state.moves
});

export default connect(mapStateToProps)(App);

