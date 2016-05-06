'use strict';

import React from "react-native";
import App from "./app/App";

class XiaoxiaZhihuRN extends React.Component {

    render() {
        return App.newNaviagtor();
    }
}

React.AppRegistry.registerComponent('XiaoxiaZhihuRN', () => XiaoxiaZhihuRN);