'use strict';

import React, {PropTypes, StyleSheet, View} from "react-native";
import createReactNativeComponentClass from "createReactNativeComponentClass";
import ReactNativeViewAttributes from "ReactNativeViewAttributes";
import {UIManager as RCTUIManager} from "NativeModules";
import NativeMethodsMixin from "NativeMethodsMixin";


var AndroidSwipeRefreshLayout = createReactNativeComponentClass({
    validAttributes: ReactNativeViewAttributes.UIView,
    uiViewClassName: 'AndroidSwipeRefreshLayout'
});


var RK_SWIPE_REF = 'swiperefreshlayout';
var INNERVIEW_REF = 'innerView';

class NativeRefreshLayout extends React.Component {

    static propTypes = {
        onRefresh: PropTypes.func
    };

    mixins = [NativeMethodsMixin];

    getInnerViewNode() {
        return this.refs[INNERVIEW_REF].getInnerViewNode();
    }

    render() {
        var childrenWrapper = (
            <View ref={INNERVIEW_REF} style={styles.mainSubview} collapsable={false}>
                {this.props.children}
            </View>
        );
        return (
            <AndroidSwipeRefreshLayout
                {...this.props}
                ref={RK_SWIPE_REF}
                style={styles.base}
                onSwipeRefresh={this._onRefresh.bind(this)}>
                {childrenWrapper}
            </AndroidSwipeRefreshLayout>
        );
    }

    // android -> react
    _onRefresh() {
        if (this.props.onRefresh) {
            this.props.onRefresh();
        }
    }

    // react -> android
    startRefresh() {
        RCTUIManager.dispatchViewManagerCommand(
            this._getSwipeRefreshLayoutHandle(),
            RCTUIManager.AndroidSwipeRefreshLayout.Commands.startRefresh,
            null
        );
    }

    // react -> android
    finishRefresh() {
        RCTUIManager.dispatchViewManagerCommand(
            this._getSwipeRefreshLayoutHandle(),
            RCTUIManager.AndroidSwipeRefreshLayout.Commands.finishRefresh,
            null
        );
    }

    _getSwipeRefreshLayoutHandle() {
        return React.findNodeHandle(this.refs[RK_SWIPE_REF]);
    }
}

var styles = StyleSheet.create({
    base: {
        flex: 1
    },
    mainSubview: {
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});

module.exports = NativeRefreshLayout;
