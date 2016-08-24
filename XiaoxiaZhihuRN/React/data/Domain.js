/**
 * Created by xiaqiulei on 16/4/29.
 */

'use strict';

import {AsyncStorage} from "react-native";
import Api from "./HttpApi";
import AppLog from "../util/AppLog";

const KEY_START_INFO = 'start_info';

class Domain {

    getStartInfoFromLocal() {
        var key = KEY_START_INFO;
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(
                key,
                (error, result)=> {
                    AppLog.i("Domain.getStartInfoFromLocal:key = " + key + ", result = " + result);
                    var resultJson = JSON.parse(result);
                    if (error) {
                        AppLog.e("Domain.getStartInfoFromLocal:key = " + key + ", error = " + error);
                        reject(error);
                    } else {
                        AppLog.i("Domain.getStartInfoFromLocal:key = " + key + ", resultJson = " + resultJson);
                        resolve(resultJson);
                    }
                }
            );
        });
    }

    fetchStartInfoFromRemote() {
        var key = KEY_START_INFO;
        new Api()
            .getStartInfo()
            .then((responseJson)=> {
                AppLog.i("Domain.fetchStartInfoFromRemote: responseJson = " + responseJson);
                AsyncStorage.setItem(key, JSON.stringify(responseJson));
            })
            .catch((error)=> {
                AppLog.e("Domain.fetchStartInfoFromRemote: error = " + error);
            });
    }
}

export default Domain;