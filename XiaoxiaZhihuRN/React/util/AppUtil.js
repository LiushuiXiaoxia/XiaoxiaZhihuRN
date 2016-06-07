'use strict';

import React from "react";
import {Dimensions} from "react-native";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var AppUtil = {
    WINDOW_WIDTH: width,
    WINDOW_HEIGHT: height
};

export default AppUtil;