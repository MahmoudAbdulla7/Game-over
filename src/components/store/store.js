import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gamesSlice';

let store=configureStore({
    reducer:{
        gtgms:gameReducer
    }
})

export default store;