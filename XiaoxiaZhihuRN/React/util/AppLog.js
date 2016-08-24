/**
 * Created by xiaqiulei on 16/4/29.
 */
'use strict';

var {NativeModules} = require('react-native');

var Log = {
    i: function (message: string): void {
        // NativeModules.AppLog.i(message);
        console.log(message)
    },
    e: function (message: string): void {
        // NativeModules.AppLog.e(message);
        console.error(message)
    },
    obj: function (obj: Object, desc: String = ''): void {
        this.i(desc);
        if (obj) {
            var i = 0;
            for (var key in obj) {
                if (i == 0) {
                    this.i('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                }
                var value = obj[key];
                if (typeof (value) == 'function') {
                    this.i('obj[' + key + '] = funcation(){}');
                } else {
                    this.i('obj[' + key + '] = ' + value);
                }
                i++;
            }
            if (i == 0) {
                this.i('obj is empty.');
            } else {
                this.i('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            }
        } else {
            this.i('obj is null.');
        }
    }
};

module.exports = Log;