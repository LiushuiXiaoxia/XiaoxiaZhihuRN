/**
 * Created by xiaqiulei on 16/6/8.
 */
'use strict';

import {createStore, applyMiddleware} from "redux";
import thunkMIddleware from "redux-thunk";
import rootReduce from "../reducers/index";

const createStoreWithMiddleWare = applyMiddleware(thunkMIddleware)(createStore);

export default function configureStore(initState) {
    return createStoreWithMiddleWare(rootReduce, initState);
}