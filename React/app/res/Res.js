'use strict';
import React, {Dimensions} from "react-native";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var colorTitleColor = '#fff';
var colorTitleBackground = '#303F9F';

var Res = {
    WINDOW_WIDTH: width,
    WINDOW_HEIGHT: height,

    colorTitleColor: colorTitleColor,
    colorTitleBackground: colorTitleBackground,

    styleTitleBar: {width: width, height: 56, backgroundColor: colorTitleBackground}
};

export default Res;