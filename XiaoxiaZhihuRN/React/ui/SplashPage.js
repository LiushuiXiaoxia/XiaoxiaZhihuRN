'use strict';

import React, {Component} from "react";
import {View, Text, Image, Dimensions, Navigator, AsyncStorage} from "react-native";
import TimerMixin from "react-timer-mixin";
import Animated from "Animated";
import AppUtil from "./../util/AppUtil";
import AppStyles from "./AppStyles";
import {doLoadLocalSplash} from "./../actions/splash";
import {connect} from "react-redux";

var ANIMATION_TIME = 1000;
var styles = AppStyles.SplashStyle;

class SplashPage extends React.Component {

    mixins = [TimerMixin];

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1),
        };
    }

    componentDidMount() {
        this.props.dispatch(doLoadLocalSplash());

        this.state.bounceValue.setValue(1);
        Animated.timing(
            this.state.bounceValue,
            {
                toValue: 1.1,
                duration: ANIMATION_TIME
            }
        ).start();

        setTimeout(()=> {
            this.gotoNext();
        }, ANIMATION_TIME);
    }

    render() {
        var info = this.props.splash_info;
        var image, text;
        if (info) {
            image = {uri: info.img};
            text = info.text;
        } else {
            image = require('image!splash');
            text = '';
        }
        return (
            <View style={styles.container}>
                <Animated.Image source={image}
                                style={{
                                    flex: 1,
                                    width: AppUtil.WINDOW_WIDTH,
                                    height: AppUtil.WINDOW_HEIGHT,
                                    transform: [
                                        {scale: this.state.bounceValue}
                                    ],
                                    position: 'absolute'
                                }}/>
                <View style={{flex: 1}}/>
                <Text style={styles.text1}>小夏知乎日报RN版</Text>
                <Text style={styles.text2}>{text}</Text>
            </View>
        );
    }

    gotoNext() {
        this.props.navigator.replace({
            name: 'theme_list'
        });
    }
}

function mapStateToProps(state) {
    return {
        splash_info: state.splash.splash_info
    };
}

export default connect(mapStateToProps)(SplashPage);