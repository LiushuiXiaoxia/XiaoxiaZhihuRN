/**
 * Created by xiaqiulei on 16/6/8.
 */

'use strict';

import React, {Component} from "react";
import {AppRegistry} from "react-native";
import {Provider} from "react-redux";
import {newNaviagtor} from "./App";
import configStore from "./store/configure-store";

const store = configStore();

class Root extends React.Component {

    render() {
        return (
            <Provider store={store}>
                {newNaviagtor()}
            </Provider>
        );
    }
}

export default Root;