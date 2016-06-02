/**
 * Created by xiaqiulei on 16/4/29.
 */
'use strict';

var {NativeModules} = require('react-native');

var Toast = {
    // SHORT: NativeModules.NativeToast.SHORT,
    // LONG: NativeModules.NativeToast.LONG,

    show: function (message:string, duration:number):void {
        // NativeModules.NativeToast.show(message, duration);
    },
    showLong: function (message:string) {
        // NativeModules.NativeToast.show(message, NativeModules.NativeToast.LONG);
    },
    showShort: function (message:string) {
        // NativeModules.NativeToast.show(message, NativeModules.NativeToast.SHORT);
    }
};

module.exports = Toast;