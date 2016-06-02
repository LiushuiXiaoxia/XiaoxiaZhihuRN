'use strict';
import React, {Component} from "react";
import {Navigator} from "react-native";
import BackAndroid from "BackAndroid";
import buildStyleInterpolator from "buildStyleInterpolator";
import NativeLog from "./native/NativeLog";
import NativeToast from "./native/NativeToast";
import SplashPage from "./ui/SplashPage";
import ThemeListPage from "./ui/ThemeListPage";
// import StoryListHomePage from "./ui/StoryListHomePage";
// import StoryListNormalPage from "./ui/StoryListNormalPage";
// import StoryDetailPage from "./ui/StoryDetailPage";
// import StoryCommentPage from "./ui/StoryCommentPage";

const PAGE_SPLASH = 'splash';
const PAGE_THEME_LIST = 'theme_list';
const PAGE_HOME_LIST = 'home_list';
const PAGE_NORMAL_LIST = 'normal_list';
const PAGE_DETAIL = 'detail';
const PAGE_COMMENT = 'comment';

// 页面配置
var pageConfig = {};
pageConfig[PAGE_SPLASH] = SplashPage;
pageConfig[PAGE_THEME_LIST] = ThemeListPage;
// pageConfig[PAGE_HOME_LIST] = StoryListHomePage;
// pageConfig[PAGE_NORMAL_LIST] = StoryListNormalPage;
// pageConfig[PAGE_DETAIL] = StoryDetailPage;
// pageConfig[PAGE_COMMENT] = StoryCommentPage;

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', function () {
    if (_navigator == null) {
        return false;
    }
    if (_navigator.getCurrentRoutes().length === 1) {
        return false;
    }
    _navigator.pop();
    return true;
});

var NoTransition = {
    opacity: {
        from: 1,
        to: 1,
        min: 1,
        max: 1,
        type: 'linear',
        extrapolate: false,
        round: 100
    }
};

var Transitions = {
    ...Navigator.SceneConfigs.FloatFromBottomAndroid,
    gestures: null,
    defaultTransitionVelocity: 1000,
    animationInterpolators: {
        into: buildStyleInterpolator(NoTransition),
        out: buildStyleInterpolator(NoTransition)
    }
};


var renderScene = function (route, navigator) {
    NativeLog.i("newRenderScene: name = " + route.name);
    if (!_navigator) {
        _navigator = navigator;
    }

    NativeLog.obj(route);
    NativeLog.obj(pageConfig);

    let Component = pageConfig[route.name];

    if (Component) {
        return (<Component {...route.params} navigator={navigator}/>);
    }
    NativeToast.showLong("navigator error!!!");
};

var App = {

    PAGE_SPLASH,
    PAGE_THEME_LIST,
    PAGE_HOME_LIST,
    PAGE_NORMAL_LIST,
    PAGE_DETAIL,
    PAGE_COMMENT,

    newNaviagtor: function () {
        return (
            <Navigator
                initialRoute={{name: PAGE_SPLASH}}
                configureScene={() => ({...Navigator.SceneConfigs.HorizontalSwipeJump, gestures:null})}
                renderScene={renderScene}/>
        );
    }
};

export default App;