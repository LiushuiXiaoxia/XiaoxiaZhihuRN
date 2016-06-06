'use strict';

import React, {Component} from "react";
import {AppRegistry} from "react-native";
import App from "./React/App";

class XiaoxiaZhihuRN extends React.Component {

  render() {
    return App.newNaviagtor();
  }
}

AppRegistry.registerComponent('XiaoxiaZhihuRN', () => XiaoxiaZhihuRN);