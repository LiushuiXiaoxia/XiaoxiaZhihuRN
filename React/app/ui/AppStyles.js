'use strict';

import React from "react";
import {StyleSheet} from "react-native";
import AppUtil from "../util/AppUtil";

var AppStyles = {
    SplashStyle: StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center'
        },
        text1: {
            color: 'white',
            fontSize: 20,
            marginBottom: 10
        },
        text2: {
            color: 'white',
            fontSize: 13,
            marginBottom: 10
        }
    }),
    ThemeListStyle: StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center'
        },
        listview: {
            flex: 1,
            width: AppUtil.WINDOW_WIDTH
        }
    }),
    StoryListStyle: StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center'
        },
        listview: {
            flex: 1,
            width: AppUtil.WINDOW_WIDTH
        },
        header_image: {
            width: AppUtil.WINDOW_WIDTH,
            height: 220,
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
        },
        header_text: {
            color: 'white',
            marginBottom: 10,
            marginRight: 10
        }
    }),
    StoryHomeListStyle: StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center'
        },
        header_image: {
            width: AppUtil.WINDOW_WIDTH,
            height: 220,
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
        },
        header_text: {
            color: 'white',
            marginBottom: 10,
            marginRight: 10
        },
        listview: {
            flex: 1,
            width: AppUtil.WINDOW_WIDTH
        }
    }),
    StoryDetail: StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center'
        },
        header_image: {
            width: AppUtil.WINDOW_WIDTH,
            height: 220,
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
        },
        header_text1: {
            color: 'white',
            marginLeft: 10,
            marginBottom: 5,
            alignSelf: 'flex-start'
        },
        header_text2: {
            color: 'white',
            marginBottom: 10,
            marginRight: 10
        }
    })
};

export default AppStyles;