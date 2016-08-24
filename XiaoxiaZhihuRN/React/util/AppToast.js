/**
 * Created by xiaqiulei on 16/4/29.
 */
'use strict';

var {NativeModules} = require('react-native');

var Toast = {
    // SHORT: NativeModules.AppToast.SHORT,
    // LONG: NativeModules.AppToast.LONG,

    show: function (message: string, duration: number): void {
        // NativeModules.AppToast.show(message, duration);
    },
    showLong: function (message: string) {
        // NativeModules.AppToast.show(message, NativeModules.AppToast.LONG);
    },
    showShort: function (message: string) {
        // NativeModules.AppToast.show(message, NativeModules.AppToast.SHORT);
    }
};

module.exports = Toast;