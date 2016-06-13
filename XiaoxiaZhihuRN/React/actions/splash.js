/**
 * Created by xiaqiulei on 16/6/8.
 */

import * as actions from "./action_types";
import AppLog from "../util/AppLog";
import {AsyncStorage} from "react-native";
import Domain from "./../data/Domain";

function _fetch(splash_info) {
    return {
        type: actions.FETCH_SPLASH,
        splash_info
    };
}
function _receive(splash_info) {
    return {
        type: actions.RECEIVER_SPLASH,
        splash_info
    };
}

export function doLoadLocalSplash() {
    return dispatch=> {

        // start
        dispatch(_fetch());

        var domain = new Domain();
        domain.getStartInfoFromLocal()
            .then((info)=> {
                // success
                AppLog.i("actions.doLoadLocalSplash success.");
                dispatch(_receive(info));
            })
            .catch(()=> {
                // fail
                AppLog.e("actions.doLoadLocalSplash fail.");
                dispatch(_receive(null));
            })
            .done();

        // 抓取远程的
        domain.fetchStartInfoFromRemote();
    };
}