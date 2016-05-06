'use strict';

import React, {View, Text, Image, Dimensions, Navigator, AsyncStorage} from "react-native";
import TimerMixin from "react-timer-mixin";
import Animated from "Animated";
import Domain from "./../data/Domain";
import NativeLog from "./../native/NativeLog";
import AppUtil from "./../util/AppUtil";
import AppStyles from "./AppStyles";

var ANIMATION_TIME = 3000;
var styles = AppStyles.SplashStyle;

class SplashPage extends React.Component {

    mixins = [TimerMixin];

    constructor(props:any) {
        super(props);
        this.state = {
            info: null,
            bounceValue: new Animated.Value(1),
            isSplashed: false
        };
    }

    componentDidMount() {
        var domain = new Domain();
        // 获取本地的数据
        domain.getStartInfoFromLocal()
            .then((info)=> {
                NativeLog.obj(info, "SplashPage.getStartInfoFromLocal info")
                this.setState({info: info})
            })
            .catch(()=> {
            })
            .done();

        // 抓取远程的
        domain.fetchStartInfoFromRemote();

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
        var image, text;
        if (this.state.info) {
            image = {uri: this.state.info.img};
            text = this.state.info.text;
        } else {
            image = require('image!splash');
            text = '';
        }
        return (
            <View style={styles.container}>
                <Animated.Image source={image}
                                style={{
                                flex:1,
                                width: AppUtil.WINDOW_WIDTH,
                                height: AppUtil.WINDOW_HEIGHT,
                                transform: [
                                  {scale: this.state.bounceValue}
                                ],
                                position: 'absolute'
                                }}/>
                <View style={{flex:1}}/>
                <Text style={styles.text1}>小夏知乎日报RN版</Text>
                <Text style={styles.text2}>{text}</Text>
            </View>
        )
    }

    gotoNext() {
        this.props.navigator.replace({
            name: 'theme_list'
        });
    }
}

export default SplashPage;